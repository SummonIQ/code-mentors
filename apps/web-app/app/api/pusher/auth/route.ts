import { NextRequest, NextResponse } from "next/server";
import { pusherServer } from "@/lib/pusher-server";
import { auth } from "@/lib/auth/server";

export const runtime = "nodejs";

function isAllowedChannelName(channelName: string): boolean {
  return channelName.startsWith("presence-live-");
}

export async function POST(request: NextRequest) {
  const session = await auth.api.getSession({
    headers: request.headers,
  });

  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const formData = await request.formData();
  const socketId = formData.get("socket_id");
  const channel = formData.get("channel_name");

  if (typeof socketId !== "string" || typeof channel !== "string") {
    return NextResponse.json(
      { error: "Missing required form fields" },
      { status: 400 },
    );
  }

  if (!isAllowedChannelName(channel)) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const userId = session.user.id;
  const userName = session.user.name ?? session.user.email ?? "Member";

  const presenceData = {
    user_id: userId,
    user_info: {
      name: userName,
    },
  };

  const authResponse = pusherServer.authorizeChannel(
    socketId,
    channel,
    presenceData,
  );

  return NextResponse.json(authResponse);
}
