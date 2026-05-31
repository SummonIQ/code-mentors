import Link from "next/link";

import { db } from "@/lib/db/client";

const starterCards = [
  {
    title: "Pick a challenge",
    description:
      "Choose a build from the challenge library and start exploring.",
    href: "/learn/challenges",
    cta: "Browse challenges",
  },
  {
    title: "Browse tracks",
    description: "Pick a learning track, then practice for a week.",
    href: "/learn/tracks",
    cta: "Explore tracks",
  },
  {
    title: "Explore careers",
    description: "Learn what different roles do and try a starter project.",
    href: "/learn/careers",
    cta: "Explore careers",
  },
  {
    title: "Track your progress",
    description: "See what you’ve practiced and what’s next to try.",
    href: "/learn/progress",
    cta: "View progress",
  },
  {
    title: "Join live",
    description: "Hop into a live room when your group is meeting.",
    href: "/learn/live",
    cta: "See live rooms",
  },
];

export default async function LearnerDashboardPage() {
  const publishedChallenges = await db.challenge.count({
    where: {
      status: {
        in: ["LIVE", "UPCOMING"],
      },
    },
  });

  return (
    <div className="space-y-8">
      <header className="glass-panel rounded-[32px] border border-[color:var(--cs-stroke)] p-6">
        <p className="text-xs uppercase tracking-[0.32em] text-[color:var(--cs-ink-muted)]">
          Learner dashboard
        </p>
        <h1 className="font-display text-3xl font-semibold text-[color:var(--cs-ink)]">
          Build with AI, one small win at a time.
        </h1>
        <p className="mt-2 text-sm text-[color:var(--cs-ink-muted)]">
          Choose a challenge, learn the idea, and show what you made.
        </p>
      </header>

      <section className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <div className="glass-panel rounded-2xl border border-[color:var(--cs-stroke)] p-4">
          <p className="text-xs uppercase tracking-[0.28em] text-[color:var(--cs-ink-muted)]">
            Challenges
          </p>
          <p className="mt-2 text-2xl font-semibold text-[color:var(--cs-ink)]">
            {publishedChallenges}
          </p>
          <p className="text-xs text-[color:var(--cs-ink-muted)]">
            Live + upcoming
          </p>
        </div>

        <div className="glass-panel rounded-2xl border border-[color:var(--cs-stroke)] p-4">
          <p className="text-xs uppercase tracking-[0.28em] text-[color:var(--cs-ink-muted)]">
            Next session
          </p>
          <p className="mt-2 text-2xl font-semibold text-[color:var(--cs-ink)]">
            Sat
          </p>
          <p className="text-xs text-[color:var(--cs-ink-muted)]">10:00 AM</p>
        </div>

        <div className="glass-panel rounded-2xl border border-[color:var(--cs-stroke)] p-4">
          <p className="text-xs uppercase tracking-[0.28em] text-[color:var(--cs-ink-muted)]">
            Skill focus
          </p>
          <p className="mt-2 text-2xl font-semibold text-[color:var(--cs-ink)]">
            Prompts
          </p>
          <p className="text-xs text-[color:var(--cs-ink-muted)]">
            Inputs → outputs
          </p>
        </div>

        <div className="glass-panel rounded-2xl border border-[color:var(--cs-stroke)] p-4">
          <p className="text-xs uppercase tracking-[0.28em] text-[color:var(--cs-ink-muted)]">
            Get started
          </p>
          <p className="mt-2 text-2xl font-semibold text-[color:var(--cs-ink)]">
            3
          </p>
          <p className="text-xs text-[color:var(--cs-ink-muted)]">Easy steps</p>
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-3">
        {starterCards.map((card) => (
          <div
            key={card.title}
            className="glass-panel rounded-[28px] border border-[color:var(--cs-stroke)] p-6"
          >
            <h2 className="font-display text-2xl font-semibold text-[color:var(--cs-ink)]">
              {card.title}
            </h2>
            <p className="mt-2 text-sm text-[color:var(--cs-ink-muted)]">
              {card.description}
            </p>
            <Link
              className="mt-5 inline-flex rounded-full bg-[color:var(--cs-ink)] px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-white"
              href={card.href}
            >
              {card.cta}
            </Link>
          </div>
        ))}
      </section>

      <section className="glass-panel rounded-[28px] border border-[color:var(--cs-stroke)] p-6">
        <h2 className="font-display text-2xl font-semibold text-[color:var(--cs-ink)]">
          Want to browse without a dashboard?
        </h2>
        <p className="text-sm text-[color:var(--cs-ink-muted)]">
          The public library is available for anyone.
        </p>
        <div className="mt-5 flex flex-wrap gap-2">
          <Link
            className="rounded-full border border-[color:var(--cs-stroke)] bg-white/80 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-[color:var(--cs-ink-muted)]"
            href="/challenge-library"
          >
            Open public challenge library
          </Link>
        </div>
      </section>
    </div>
  );
}
