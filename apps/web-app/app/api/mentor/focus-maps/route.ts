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

export async function GET(request: NextRequest) {
  const session = await requireSession(request);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const focusMaps = await db.focusMap.findMany({
    orderBy: [{ updatedAt: "desc" }],
  });

  return NextResponse.json({ focusMaps });
}

export async function POST(request: NextRequest) {
  const session = await requireSession(request);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = (await request.json().catch(() => null)) as {
    title?: string;
    description?: string;
  } | null;

  if (!body?.title) {
    return NextResponse.json(
      { error: "Missing required field: title" },
      { status: 400 },
    );
  }

  try {
    const focusMap = await db.focusMap.create({
      data: {
        createdById: session.user.id,
        description: body.description ?? null,
        title: body.title,
        updatedById: session.user.id,
      },
    });

    return NextResponse.json({ focusMap }, { status: 201 });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";

    return NextResponse.json(
      { error: "Unable to create focus map", details: message },
      { status: 500 },
    );
  }
}
