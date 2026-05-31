import Link from "next/link";

import { db } from "@/lib/db/client";

const levelLabels: Record<string, string> = {
  BEGINNER: "Beginner",
  INTERMEDIATE: "Intermediate",
  ADVANCED: "Advanced",
};

export default async function LearnerChallengeDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const challenge = await db.challenge.findFirst({
    where: {
      slug: params.slug,
      status: {
        in: ["LIVE", "UPCOMING"],
      },
    },
    select: {
      description: true,
      focus: true,
      hints: true,
      level: true,
      prompt: true,
      publishedAt: true,
      slug: true,
      status: true,
      title: true,
    },
  });

  if (!challenge) {
    return (
      <div className="space-y-8">
        <header className="glass-panel rounded-[32px] border border-[color:var(--cs-stroke)] p-6">
          <p className="text-xs uppercase tracking-[0.32em] text-[color:var(--cs-ink-muted)]">
            Challenge
          </p>
          <h1 className="font-display text-3xl font-semibold text-[color:var(--cs-ink)]">
            Challenge not found
          </h1>
          <p className="mt-2 text-sm text-[color:var(--cs-ink-muted)]">
            This build might be a draft or archived.
          </p>
          <div className="mt-5 flex flex-wrap gap-2">
            <Link
              className="rounded-full bg-[color:var(--cs-ink)] px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-white"
              href="/learn/challenges"
            >
              Back to challenges
            </Link>
          </div>
        </header>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <header className="glass-panel rounded-[32px] border border-[color:var(--cs-stroke)] p-6">
        <p className="text-xs uppercase tracking-[0.32em] text-[color:var(--cs-ink-muted)]">
          Challenge
        </p>
        <h1 className="font-display text-3xl font-semibold text-[color:var(--cs-ink)]">
          {challenge.title}
        </h1>
        <p className="mt-2 text-sm text-[color:var(--cs-ink-muted)]">
          {challenge.focus}
        </p>
        <div className="mt-5 flex flex-wrap gap-2">
          <Link
            className="rounded-full border border-[color:var(--cs-stroke)] bg-white/80 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-[color:var(--cs-ink-muted)]"
            href="/learn/challenges"
          >
            Back
          </Link>
          <Link
            className="rounded-full bg-[color:var(--cs-ink)] px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-white"
            href="/learn/progress"
          >
            Track progress
          </Link>
        </div>
      </header>

      <section className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="glass-panel rounded-[28px] border border-[color:var(--cs-stroke)] p-6">
          <h2 className="font-display text-2xl font-semibold text-[color:var(--cs-ink)]">
            What you will build
          </h2>
          <p className="mt-2 text-sm text-[color:var(--cs-ink-muted)]">
            {challenge.description ?? ""}
          </p>

          <div className="mt-6 rounded-2xl border border-[color:var(--cs-stroke)] bg-[color:var(--cs-paper-strong)] p-4">
            <p className="text-xs uppercase tracking-[0.26em] text-[color:var(--cs-ink-muted)]">
              Difficulty
            </p>
            <p className="mt-2 text-sm font-semibold text-[color:var(--cs-ink)]">
              {levelLabels[challenge.level] ?? challenge.level}
            </p>
            <p className="mt-1 text-xs text-[color:var(--cs-ink-muted)]">
              {challenge.status}
            </p>
          </div>
        </div>

        <div className="glass-panel rounded-[28px] border border-[color:var(--cs-stroke)] p-6">
          <h2 className="font-display text-2xl font-semibold text-[color:var(--cs-ink)]">
            Starter prompt
          </h2>
          <p className="text-sm text-[color:var(--cs-ink-muted)]">
            Use this to get unstuck. Ask a mentor if you want to change it.
          </p>
          <div className="mt-5 whitespace-pre-wrap rounded-2xl border border-[color:var(--cs-stroke)] bg-white/80 p-4 text-sm text-[color:var(--cs-ink)]">
            {challenge.prompt ??
              "Write a prompt that describes what your helper should do. Include an example input and the kind of output you want."}
          </div>
        </div>
      </section>

      <section className="glass-panel rounded-[28px] border border-[color:var(--cs-stroke)] p-6">
        <h2 className="font-display text-2xl font-semibold text-[color:var(--cs-ink)]">
          How to finish
        </h2>
        <p className="text-sm text-[color:var(--cs-ink-muted)]">
          When you are done, you should be able to explain what your prompt or
          workflow is doing.
        </p>
        <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {[
            {
              title: "Explain it",
              detail: "Say what you built in one sentence.",
            },
            {
              title: "Show an example",
              detail: "Test it with one input and one output.",
            },
            {
              title: "Improve it",
              detail: "Add a rule that makes results better.",
            },
            {
              title: "Share it",
              detail: "Show your mentor what you changed.",
            },
          ].map((item) => (
            <div
              key={item.title}
              className="rounded-2xl border border-[color:var(--cs-stroke)] bg-[color:var(--cs-paper-strong)] p-4"
            >
              <p className="text-xs uppercase tracking-[0.26em] text-[color:var(--cs-ink-muted)]">
                {item.title}
              </p>
              <p className="mt-2 text-sm font-semibold text-[color:var(--cs-ink)]">
                {item.detail}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
