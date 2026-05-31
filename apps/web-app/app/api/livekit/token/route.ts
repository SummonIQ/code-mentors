import { NextRequest, NextResponse } from "next/server";

import { AccessToken } from "livekit-server-sdk";

import { auth } from "@/lib/auth/server";

export const runtime = "nodejs";

function getLiveKitCredentials() {
  const apiKey = process.env.LIVEKIT_API_KEY;
  const apiSecret = process.env.LIVEKIT_API_SECRET;

  if (!apiKey) {
    throw new Error("LIVEKIT_API_KEY is not set");
  }

  if (!apiSecret) {
    throw new Error("LIVEKIT_API_SECRET is not set");
  }

  return { apiKey, apiSecret };
}

export async function POST(request: NextRequest) {
  const session = await auth.api.getSession({
    headers: request.headers,
  });

  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = (await request.json().catch(() => null)) as {
    roomId?: string;
  } | null;

  const roomId = body?.roomId?.trim();
  if (!roomId) {
    return NextResponse.json(
      { error: "Missing required field: roomId" },
      { status: 400 },
    );
  }

  try {
    const { apiKey, apiSecret } = getLiveKitCredentials();

    const identity = session.user.id;
    const name = session.user.name ?? session.user.email ?? "Learner";

    const token = new AccessToken(apiKey, apiSecret, {
      identity,
      name,
    });

    token.addGrant({
      room: roomId,
      roomJoin: true,
      canPublish: true,
      canSubscribe: true,
    });

    return NextResponse.json({ token: token.toJwt(), identity, name });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json(
      { error: "Unable to create LiveKit token", details: message },
      { status: 500 },
    );
  }
}
