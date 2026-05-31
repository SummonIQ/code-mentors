import { NextRequest, NextResponse } from "next/server";

import { auth } from "@/lib/auth/server";
import { db } from "@/lib/db/client";

export const runtime = "nodejs";

function toSlug(value: string) {
  return value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

async function requireSession(request: NextRequest) {
  const session = await auth.api.getSession({
    headers: request.headers,
  });

  if (!session?.user) {
    return null;
  }

  return session;
}

export async function GET(request: NextRequest) {
  const session = await requireSession(request);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const challenges = await db.challenge.findMany({
    orderBy: [{ updatedAt: "desc" }],
  });

  return NextResponse.json({ challenges });
}

export async function POST(request: NextRequest) {
  const session = await requireSession(request);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = (await request.json().catch(() => null)) as {
    title?: string;
    description?: string;
    focus?: string;
    level?: "BEGINNER" | "INTERMEDIATE" | "ADVANCED";
    slug?: string;
  } | null;

  if (!body?.title || !body.focus || !body.level) {
    return NextResponse.json(
      { error: "Missing required fields: title, focus, level" },
      { status: 400 },
    );
  }

  const slug = body.slug ? toSlug(body.slug) : toSlug(body.title);
  if (!slug) {
    return NextResponse.json({ error: "Invalid slug" }, { status: 400 });
  }

  try {
    const challenge = await db.challenge.create({
      data: {
        createdById: session.user.id,
        description: body.description ?? null,
        focus: body.focus,
        level: body.level,
        slug,
        title: body.title,
        updatedById: session.user.id,
      },
    });

    return NextResponse.json({ challenge }, { status: 201 });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";

    return NextResponse.json(
      { error: "Unable to create challenge", details: message },
      { status: 500 },
    );
  }
}
