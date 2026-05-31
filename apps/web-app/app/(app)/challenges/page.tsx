import Link from "next/link";

import { NewChallengeModal } from "@/components/new-challenge-modal";
import { db } from "@/lib/db/client";

const challengeTemplates = [
  "Prompt-building worksheet",
  "Automation flow canvas",
  "Safety checklist for AI",
  "Peer feedback guide",
];

const LEVEL_LABELS: Record<string, string> = {
  BEGINNER: "Beginner",
  INTERMEDIATE: "Intermediate",
  ADVANCED: "Advanced",
};

const STATUS_LABELS: Record<string, string> = {
  DRAFT: "Draft",
  REVIEW: "Review",
  LIVE: "Live",
  UPCOMING: "Upcoming",
  ARCHIVED: "Archived",
};

export default async function ChallengesPage({
  searchParams,
}: {
  searchParams?: { new?: string; publish?: string; auto?: string };
}) {
  const challengeQueue = await db.challenge.findMany({
    orderBy: [{ updatedAt: "desc" }],
    select: {
      id: true,
      title: true,
      focus: true,
      level: true,
      status: true,
    },
  });

  const showNewModal = searchParams?.new === "1";

  const modal = searchParams?.publish
    ? {
        title: "Publish challenge",
        description:
          "Push the latest challenge to the active cohort and notify mentors.",
        primary: "Publish now",
      }
    : searchParams?.auto
      ? {
          title: "Assign automation challenge",
          description: "Drop an automation build into the current session.",
          primary: "Assign",
        }
      : null;

  return (
    <div className="space-y-8">
      {showNewModal ? <NewChallengeModal /> : null}
      {modal ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[rgba(11,15,20,0.35)] px-6 py-10">
          <div className="glass-panel animate-pop w-full max-w-lg rounded-[28px] border border-[color:var(--cs-stroke)] p-6">
            <p className="text-xs uppercase tracking-[0.32em] text-[color:var(--cs-ink-muted)]">
              Action dialog
            </p>
            <h2 className="mt-2 font-display text-2xl font-semibold text-[color:var(--cs-ink)]">
              {modal.title}
            </h2>
            <p className="mt-2 text-sm text-[color:var(--cs-ink-muted)]">
              {modal.description}
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              <Link
                className="rounded-full border border-[color:var(--cs-stroke)] bg-white/80 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-[color:var(--cs-ink-muted)]"
                href="/challenges"
              >
                Close
              </Link>
              <Link
                className="rounded-full bg-[color:var(--cs-ink)] px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-white"
                href="/challenges"
              >
                {modal.primary}
              </Link>
            </div>
          </div>
        </div>
      ) : null}
      <header className="glass-panel rounded-[32px] border border-[color:var(--cs-stroke)] p-6">
        <p className="text-xs uppercase tracking-[0.32em] text-[color:var(--cs-ink-muted)]">
          Challenges
        </p>
        <h1 className="font-display text-3xl font-semibold text-[color:var(--cs-ink)]">
          Curated builds for learners
        </h1>
        <p className="mt-2 text-sm text-[color:var(--cs-ink-muted)]">
          Design, publish, and track beginner-friendly AI and automation
          challenges.
        </p>
      </header>

      <section className="grid gap-6 lg:grid-cols-[1.3fr_0.7fr]">
        <div className="glass-panel rounded-[28px] border border-[color:var(--cs-stroke)] p-6">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-2xl font-semibold text-[color:var(--cs-ink)]">
              Challenge queue
            </h2>
            <Link
              className="rounded-full bg-[color:var(--cs-ink)] px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-white"
              href="/challenges?new=1"
            >
              New challenge
            </Link>
          </div>
          <div className="mt-5 divide-y divide-[color:var(--cs-stroke)]">
            {challengeQueue.map((challenge) => (
              <div key={challenge.id} className="py-4 first:pt-0 last:pb-0">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <p className="text-base font-semibold text-[color:var(--cs-ink)]">
                      {challenge.title}
                    </p>
                    <p className="text-sm text-[color:var(--cs-ink-muted)]">
                      {challenge.focus}
                    </p>
                  </div>
                  <span className="rounded-full bg-[rgba(43,215,255,0.16)] px-3 py-1 text-xs font-semibold text-[color:var(--cs-ink)]">
                    {STATUS_LABELS[challenge.status] ?? challenge.status}
                  </span>
                </div>
                <p className="mt-2 text-xs uppercase tracking-[0.2em] text-[color:var(--cs-ink-muted)]">
                  {LEVEL_LABELS[challenge.level] ?? challenge.level}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="glass-panel rounded-[28px] border border-[color:var(--cs-stroke)] p-6">
          <h2 className="font-display text-2xl font-semibold text-[color:var(--cs-ink)]">
            Templates
          </h2>
          <p className="text-sm text-[color:var(--cs-ink-muted)]">
            Reusable assets to speed up lesson design.
          </p>
          <div className="mt-5 space-y-3">
            {challengeTemplates.map((template) => (
              <div
                key={template}
                className="rounded-2xl border border-[color:var(--cs-stroke)] bg-[color:var(--cs-paper-strong)] px-4 py-3"
              >
                <p className="text-sm font-semibold text-[color:var(--cs-ink)]">
                  {template}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
