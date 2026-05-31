import Link from "next/link";

const progressHighlights = [
  {
    title: "Prompts",
    value: "2 skills",
    detail: "Inputs, examples",
  },
  {
    title: "Automation",
    value: "1 workflow",
    detail: "Trigger → action",
  },
  {
    title: "Creative builds",
    value: "1 prototype",
    detail: "A small app",
  },
];

const nextSteps = [
  {
    title: "Try a beginner challenge",
    detail: "Pick a small build and complete it in one session.",
    href: "/learn/challenges",
  },
  {
    title: "Join a live room",
    detail: "Work with a mentor and ask questions.",
    href: "/learn/live",
  },
  {
    title: "Browse the public library",
    detail: "See what other learners are building.",
    href: "/challenge-library",
  },
];

export default function LearnerProgressPage() {
  return (
    <div className="space-y-8">
      <header className="glass-panel rounded-[32px] border border-[color:var(--cs-stroke)] p-6">
        <p className="text-xs uppercase tracking-[0.32em] text-[color:var(--cs-ink-muted)]">
          Progress
        </p>
        <h1 className="font-display text-3xl font-semibold text-[color:var(--cs-ink)]">
          Your learning map
        </h1>
        <p className="mt-2 text-sm text-[color:var(--cs-ink-muted)]">
          This is a learner-friendly view. Mentors use focus maps for the full
          skill graph.
        </p>
      </header>

      <section className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {progressHighlights.map((item) => (
          <div
            key={item.title}
            className="glass-panel rounded-2xl border border-[color:var(--cs-stroke)] p-4"
          >
            <p className="text-xs uppercase tracking-[0.28em] text-[color:var(--cs-ink-muted)]">
              {item.title}
            </p>
            <p className="mt-2 text-2xl font-semibold text-[color:var(--cs-ink)]">
              {item.value}
            </p>
            <p className="text-xs text-[color:var(--cs-ink-muted)]">
              {item.detail}
            </p>
          </div>
        ))}
      </section>

      <section className="glass-panel rounded-[28px] border border-[color:var(--cs-stroke)] p-6">
        <h2 className="font-display text-2xl font-semibold text-[color:var(--cs-ink)]">
          Next steps
        </h2>
        <p className="text-sm text-[color:var(--cs-ink-muted)]">
          Pick one small goal and finish it.
        </p>
        <div className="mt-5 space-y-3">
          {nextSteps.map((step) => (
            <Link
              key={step.title}
              className="block rounded-2xl border border-[color:var(--cs-stroke)] bg-white/80 px-4 py-3"
              href={step.href}
            >
              <p className="text-sm font-semibold text-[color:var(--cs-ink)]">
                {step.title}
              </p>
              <p className="mt-1 text-xs text-[color:var(--cs-ink-muted)]">
                {step.detail}
              </p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
