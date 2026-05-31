import { NextRequest, NextResponse } from "next/server";
import { pusherServer } from "@/lib/pusher-server";
import { auth } from "@/lib/auth/server";

export const runtime = "nodejs";

function isAllowedChannelName(channelName: string): boolean {
  return channelName.startsWith("presence-live-");
}

function createMessageId(): string {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }
  return Math.random().toString(36).slice(2);
}

interface ChatMessage {
  id: string;
  name: string;
  message: string;
  timestamp: number;
}

export async function POST(request: NextRequest) {
  const session = await auth.api.getSession({
    headers: request.headers,
  });

  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = (await request.json().catch(() => null)) as {
    channel?: string;
    message?: string;
  } | null;

  const channel = body?.channel;
  const message = body?.message;

  if (typeof channel !== "string" || typeof message !== "string") {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  if (!isAllowedChannelName(channel)) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const trimmedMessage = message.trim();
  if (!trimmedMessage) {
    return NextResponse.json({ error: "Message is required" }, { status: 400 });
  }

  if (trimmedMessage.length > 1200) {
    return NextResponse.json({ error: "Message is too long" }, { status: 400 });
  }

  const userName = session.user.name ?? session.user.email ?? "Member";

  const chatMessage: ChatMessage = {
    id: createMessageId(),
    name: userName,
    message: trimmedMessage,
    timestamp: Date.now(),
  };

  await pusherServer.trigger(channel, "chat-message", chatMessage);

  return NextResponse.json({ success: true, message: chatMessage });
}
