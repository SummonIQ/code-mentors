import Link from "next/link";

import { db } from "@/lib/db/client";

export default async function LearnerChallengesPage() {
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
        <p className="text-xs uppercase tracking-[0.32em] text-[color:var(--cs-ink-muted)]">
          Challenges
        </p>
        <h1 className="font-display text-3xl font-semibold text-[color:var(--cs-ink)]">
          Pick a build
        </h1>
        <p className="mt-2 text-sm text-[color:var(--cs-ink-muted)]">
          Choose something small. You can level up later.
        </p>
      </header>

      <section className="glass-panel rounded-[28px] border border-[color:var(--cs-stroke)] p-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2 className="font-display text-2xl font-semibold text-[color:var(--cs-ink)]">
            Live and upcoming
          </h2>
          <Link
            className="rounded-full border border-[color:var(--cs-stroke)] bg-white/80 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-[color:var(--cs-ink-muted)]"
            href="/challenge-library"
          >
            Public library
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
                {challenge.description ? (
                  <p className="mt-2 text-sm text-[color:var(--cs-ink-muted)]">
                    {challenge.description}
                  </p>
                ) : null}
              </div>
            ))
          ) : (
            <p className="text-sm text-[color:var(--cs-ink-muted)]">
              No challenges yet.
            </p>
          )}
        </div>
      </section>
    </div>
  );
}
