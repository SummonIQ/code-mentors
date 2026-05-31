import { NextResponse } from "next/server";

import { db } from "@/lib/db/client";

export const runtime = "nodejs";

export async function GET() {
  const challenges = await db.challenge.findMany({
    where: {
      status: {
        in: ["LIVE", "UPCOMING"],
      },
    },
    orderBy: [{ publishedAt: "desc" }, { createdAt: "desc" }],
    select: {
      createdAt: true,
      description: true,
      focus: true,
      id: true,
      level: true,
      publishedAt: true,
      slug: true,
      status: true,
      title: true,
      updatedAt: true,
    },
  });

  return NextResponse.json({ challenges });
}
