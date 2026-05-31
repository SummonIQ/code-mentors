import { NextRequest, NextResponse } from "next/server";

import type { Prisma } from "@prisma/client";

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

export async function PATCH(
  request: NextRequest,
  context: { params: { id: string } },
) {
  const session = await requireSession(request);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = context.params;
  const body = (await request.json().catch(() => null)) as {
    title?: string;
    description?: string | null;
    focus?: string;
    level?: "BEGINNER" | "INTERMEDIATE" | "ADVANCED";
    status?: "DRAFT" | "REVIEW" | "LIVE" | "UPCOMING" | "ARCHIVED";
    prompt?: string | null;
    hints?: Prisma.InputJsonValue;
    rubric?: Prisma.InputJsonValue;
  } | null;

  if (!body) {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  try {
    const challenge = await db.challenge.update({
      where: { id },
      data: {
        title: body.title ?? undefined,
        description: body.description ?? undefined,
        focus: body.focus ?? undefined,
        level: body.level ?? undefined,
        status: body.status ?? undefined,
        prompt: body.prompt ?? undefined,
        hints: body.hints ?? undefined,
        rubric: body.rubric ?? undefined,
        updatedById: session.user.id,
      },
    });

    return NextResponse.json({ challenge });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";

    return NextResponse.json(
      { error: "Unable to update challenge", details: message },
      { status: 500 },
    );
  }
}
