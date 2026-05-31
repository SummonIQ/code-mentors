import { NextRequest, NextResponse } from "next/server";

import { auth } from "@/lib/auth/server";
import { db } from "@/lib/db/client";

export const runtime = "nodejs";

async function requireSession(request: NextRequest) {
  const session = await auth.api.getSession({
    headers: request.headers,
  });

  if (!session?.user) {
    return null;
  }

  return session;
}

export async function POST(
  request: NextRequest,
  context: { params: { id: string } },
) {
  const session = await requireSession(request);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = context.params;

  try {
    const now = new Date();
    const challenge = await db.challenge.update({
      where: { id },
      data: {
        publishedAt: now,
        status: "LIVE",
        updatedById: session.user.id,
      },
    });

    return NextResponse.json({ challenge });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";

    return NextResponse.json(
      { error: "Unable to publish challenge", details: message },
      { status: 500 },
    );
  }
}
