import { ChallengeLevel, ChallengeStatus } from "@prisma/client";

import { db } from "../lib/db/client";

function toSlug(value: string) {
  return value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

async function main() {
  const challengeSeeds = [
    {
      title: "Build a Smart Homework Helper",
      level: ChallengeLevel.BEGINNER,
      focus: "Prompting, step-by-step reasoning",
      status: ChallengeStatus.LIVE,
    },
    {
      title: "Automation Bot for Chores",
      level: ChallengeLevel.INTERMEDIATE,
      focus: "Workflow triggers, notifications",
      status: ChallengeStatus.DRAFT,
    },
    {
      title: "AI Story Generator",
      level: ChallengeLevel.BEGINNER,
      focus: "Creative prompts, guardrails",
      status: ChallengeStatus.REVIEW,
    },
    {
      title: "Debug the Robot",
      level: ChallengeLevel.ADVANCED,
      focus: "Logic tracing and repair",
      status: ChallengeStatus.UPCOMING,
    },
  ];

  await Promise.all(
    challengeSeeds.map((challenge) =>
      db.challenge.upsert({
        where: {
          slug: toSlug(challenge.title),
        },
        create: {
          title: challenge.title,
          level: challenge.level,
          focus: challenge.focus,
          slug: toSlug(challenge.title),
          status: challenge.status,
        },
        update: {
          title: challenge.title,
          level: challenge.level,
          focus: challenge.focus,
          slug: toSlug(challenge.title),
          status: challenge.status,
        },
      }),
    ),
  );
}

main()
  .then(async () => {
    await db.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await db.$disconnect();
    process.exit(1);
  });
