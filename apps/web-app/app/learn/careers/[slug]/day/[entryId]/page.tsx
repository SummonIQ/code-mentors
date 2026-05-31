import Link from "next/link";

import { buildMockWorkspace, getDayInLifeEntry } from "../../../career-details";

export default function CareerDayWorkspacePage({
  params,
}: {
  params: { slug: string; entryId: string };
}) {
  const result = getDayInLifeEntry({
    slug: params.slug,
    entryId: params.entryId,
  });

  if (!result) {
    return (
      <div className="space-y-8">
        <header className="glass-panel rounded-[32px] border border-[color:var(--cs-stroke)] p-6">
          <p className="text-xs uppercase tracking-[0.32em] text-[color:var(--cs-ink-muted)]">
            Mock workspace
          </p>
          <h1 className="font-display text-3xl font-semibold text-[color:var(--cs-ink)]">
            Activity not found
          </h1>
          <p className="mt-2 text-sm text-[color:var(--cs-ink-muted)]">
            Choose a role and an activity from the Career Explorer.
          </p>
          <div className="mt-5 flex flex-wrap gap-2">
            <Link
              className="rounded-full bg-[color:var(--cs-ink)] px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-white"
              href="/learn/careers"
            >
              Back to careers
            </Link>
          </div>
        </header>
      </div>
    );
  }

  const { career, entry } = result;
  const workspace = buildMockWorkspace({ careerSlug: params.slug, entry });

  return (
    <div className="space-y-8">
      <header className="glass-panel rounded-[32px] border border-[color:var(--cs-stroke)] p-6">
        <p className="text-xs uppercase tracking-[0.32em] text-[color:var(--cs-ink-muted)]">
          Mock workspace
        </p>
        <h1 className="font-display text-3xl font-semibold text-[color:var(--cs-ink)]">
          {career.title}: {entry.title}
        </h1>
        <p className="mt-2 max-w-2xl text-sm text-[color:var(--cs-ink-muted)]">
          {entry.time} — {entry.detail}
        </p>
        <div className="mt-5 flex flex-wrap gap-2">
          <Link
            className="rounded-full border border-[color:var(--cs-stroke)] bg-white/80 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-[color:var(--cs-ink-muted)]"
            href={`/learn/careers/${params.slug}`}
          >
            Back
          </Link>
          <Link
            className="rounded-full border border-[color:var(--cs-stroke)] bg-white/80 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-[color:var(--cs-ink-muted)]"
            href="/learn/careers"
          >
            Career Explorer
          </Link>
          <Link
            className="rounded-full bg-[color:var(--cs-ink)] px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-white"
            href="/learn"
          >
            Dashboard
          </Link>
        </div>
      </header>

      <section className="grid gap-6 lg:grid-cols-2">
        <div className="glass-panel rounded-[28px] border border-[color:var(--cs-stroke)] p-6">
          <h2 className="font-display text-2xl font-semibold text-[color:var(--cs-ink)]">
            Scenario
          </h2>
          <p className="mt-3 text-sm text-[color:var(--cs-ink-muted)]">
            {workspace.scenario}
          </p>
          <div className="mt-5 space-y-3">
            {workspace.inputs.map((item) => (
              <div
                key={item.label}
                className="rounded-2xl border border-[color:var(--cs-stroke)] bg-[color:var(--cs-paper-strong)] px-4 py-3"
              >
                <p className="text-xs font-semibold uppercase tracking-[0.26em] text-[color:var(--cs-ink-muted)]">
                  {item.label}
                </p>
                <p className="mt-2 text-sm font-semibold text-[color:var(--cs-ink)]">
                  {item.value}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="glass-panel rounded-[28px] border border-[color:var(--cs-stroke)] p-6">
          <h2 className="font-display text-2xl font-semibold text-[color:var(--cs-ink)]">
            Checklist
          </h2>
          <p className="text-sm text-[color:var(--cs-ink-muted)]">
            Follow the steps, then write a short artifact.
          </p>
          <ol className="mt-5 space-y-2">
            {workspace.checklist.map((item) => (
              <li
                key={item}
                className="rounded-2xl border border-[color:var(--cs-stroke)] bg-white/80 px-4 py-3 text-sm font-semibold text-[color:var(--cs-ink)]"
              >
                {item}
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-[1fr_1fr]">
        <div className="glass-panel rounded-[28px] border border-[color:var(--cs-stroke)] p-6">
          <h2 className="font-display text-2xl font-semibold text-[color:var(--cs-ink)]">
            Prompt template
          </h2>
          <p className="text-sm text-[color:var(--cs-ink-muted)]">
            Paste this into an AI tool or use it as a writing scaffold.
          </p>
          <pre className="mt-5 whitespace-pre-wrap rounded-2xl border border-[color:var(--cs-stroke)] bg-[color:var(--cs-paper-strong)] p-4 text-xs text-[color:var(--cs-ink)]">
            {workspace.promptTemplate}
          </pre>
        </div>

        <div className="glass-panel rounded-[28px] border border-[color:var(--cs-stroke)] p-6">
          <h2 className="font-display text-2xl font-semibold text-[color:var(--cs-ink)]">
            Your output
          </h2>
          <p className="text-sm text-[color:var(--cs-ink-muted)]">
            Write what you’d produce during this hour.
          </p>
          <textarea
            className="mt-5 min-h-[240px] w-full resize-y rounded-2xl border border-[color:var(--cs-stroke)] bg-white/80 p-4 text-sm text-[color:var(--cs-ink)]"
            defaultValue={""}
            placeholder={workspace.outputPlaceholder}
          />
        </div>
      </section>
    </div>
  );
}
