import Link from "next/link";

import { UserMenu } from "@/components/user-menu";
import { db } from "@/lib/db/client";

export default async function ChallengeLibraryPage() {
  const challenges = await db.challenge.findMany({
    where: {
      status: {
        in: ["LIVE", "UPCOMING"],
      },
    },
    orderBy: [{ publishedAt: "desc" }, { createdAt: "desc" }],
    select: {
      description: true,
      focus: true,
      level: true,
      publishedAt: true,
      slug: true,
      status: true,
      title: true,
    },
  });

  return (
    <div className="space-y-8">
      <header className="glass-panel rounded-[32px] border border-[color:var(--cs-stroke)] p-6">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.32em] text-[color:var(--cs-ink-muted)]">
              Challenge library
            </p>
            <h1 className="font-display text-3xl font-semibold text-[color:var(--cs-ink)]">
              Public builds for learners
            </h1>
            <p className="mt-2 text-sm text-[color:var(--cs-ink-muted)]">
              Browse published challenges. Drafts stay private to mentors.
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              <Link
                className="rounded-full bg-[color:var(--cs-ink)] px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-white"
                href="/learn"
              >
                Learner dashboard
              </Link>
              <Link
                className="rounded-full border border-[color:var(--cs-stroke)] bg-white/80 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-[color:var(--cs-ink-muted)]"
                href="/learn/challenges"
              >
                Learner challenges
              </Link>
            </div>
          </div>

          <UserMenu />
        </div>
      </header>

      <section className="glass-panel rounded-[28px] border border-[color:var(--cs-stroke)] p-6">
        <div className="flex items-center justify-between">
          <h2 className="font-display text-2xl font-semibold text-[color:var(--cs-ink)]">
            Published challenges
          </h2>
          <Link
            className="rounded-full border border-[color:var(--cs-stroke)] bg-white/80 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-[color:var(--cs-ink-muted)]"
            href="/"
          >
            Back home
          </Link>
        </div>

        <div className="mt-5 divide-y divide-[color:var(--cs-stroke)]">
          {challenges.length ? (
            challenges.map((challenge) => (
              <div key={challenge.slug} className="py-4 first:pt-0 last:pb-0">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <Link
                      className="text-base font-semibold text-[color:var(--cs-ink)] underline-offset-4 hover:underline"
                      href={`/learn/challenges/${challenge.slug}`}
                    >
                      {challenge.title}
                    </Link>
                    <p className="text-sm text-[color:var(--cs-ink-muted)]">
                      {challenge.focus}
                    </p>
                  </div>
                  <span className="rounded-full bg-[rgba(43,215,255,0.16)] px-3 py-1 text-xs font-semibold text-[color:var(--cs-ink)]">
                    {challenge.status}
                  </span>
                </div>
                <p className="mt-2 text-xs uppercase tracking-[0.2em] text-[color:var(--cs-ink-muted)]">
                  {challenge.level}
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  <Link
                    className="rounded-full bg-[color:var(--cs-ink)] px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-white"
                    href={`/learn/challenges/${challenge.slug}`}
                  >
                    Open in learner view
                  </Link>
                </div>
              </div>
            ))
          ) : (
            <p className="text-sm text-[color:var(--cs-ink-muted)]">
              No published challenges yet.
            </p>
          )}
        </div>
      </section>
    </div>
  );
}
