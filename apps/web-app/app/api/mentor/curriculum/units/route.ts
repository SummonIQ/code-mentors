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

  const units = await db.curriculumUnit.findMany({
    orderBy: [{ order: "asc" }, { updatedAt: "desc" }],
  });

  return NextResponse.json({ units });
}

export async function POST(request: NextRequest) {
  const session = await requireSession(request);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = (await request.json().catch(() => null)) as {
    title?: string;
    description?: string;
    weeksLabel?: string;
  } | null;

  if (!body?.title) {
    return NextResponse.json(
      { error: "Missing required field: title" },
      { status: 400 },
    );
  }

  try {
    const aggregate = await db.curriculumUnit.aggregate({
      _max: {
        order: true,
      },
    });

    const nextOrder = (aggregate._max.order ?? -1) + 1;

    const unit = await db.curriculumUnit.create({
      data: {
        createdById: session.user.id,
        description: body.description ?? null,
        order: nextOrder,
        title: body.title,
        updatedById: session.user.id,
        weeksLabel: body.weeksLabel ?? null,
      },
    });

    return NextResponse.json({ unit }, { status: 201 });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";

    return NextResponse.json(
      { error: "Unable to create curriculum unit", details: message },
      { status: 500 },
    );
  }
}
