import Link from "next/link";

import { NewFocusMapModal } from "@/components/new-focus-map-modal";
import { db } from "@/lib/db/client";

const focusMapTemplates = [
  {
    title: "Prompt building",
    description: "Inputs, constraints, examples, and evaluation checks.",
  },
  {
    title: "Automation logic",
    description: "Triggers, actions, branches, and human review checkpoints.",
  },
  {
    title: "Ethical AI",
    description: "Bias, safety, privacy, and responsible usage scenarios.",
  },
  {
    title: "Creative coding",
    description: "Ideas, assets, loops, and iteration milestones.",
  },
];

const focusMapPrompts = [
  "What should a learner be able to explain in one sentence?",
  "What is the simplest example that proves understanding?",
  "Where do learners usually get stuck?",
  "What can we reuse next session to save time?",
];

export default async function FocusMapsPage({
  searchParams,
}: {
  searchParams?: { new?: string };
}) {
  const focusMaps = await db.focusMap.findMany({
    orderBy: [{ updatedAt: "desc" }],
    select: {
      id: true,
      title: true,
      description: true,
      updatedAt: true,
    },
  });

  const lastSevenDays = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
  const mapsUpdatedThisWeek = focusMaps.filter(
    (map) => map.updatedAt >= lastSevenDays,
  ).length;
  const mostRecentlyUpdated = focusMaps.at(0)?.updatedAt;

  const showNewModal = searchParams?.new === "1";

  return (
    <div className="space-y-8">
      {showNewModal ? <NewFocusMapModal /> : null}
      <header className="glass-panel rounded-[32px] border border-[color:var(--cs-stroke)] p-6">
        <p className="text-xs uppercase tracking-[0.32em] text-[color:var(--cs-ink-muted)]">
          Focus maps
        </p>
        <h1 className="font-display text-3xl font-semibold text-[color:var(--cs-ink)]">
          Map skills and connections
        </h1>
        <p className="mt-2 text-sm text-[color:var(--cs-ink-muted)]">
          Turn fuzzy learning goals into clear, connected concepts.
        </p>
      </header>

      <section className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <div className="glass-panel rounded-2xl border border-[color:var(--cs-stroke)] p-4">
          <p className="text-xs uppercase tracking-[0.28em] text-[color:var(--cs-ink-muted)]">
            Total maps
          </p>
          <p className="mt-2 text-2xl font-semibold text-[color:var(--cs-ink)]">
            {focusMaps.length}
          </p>
          <p className="text-xs text-[color:var(--cs-ink-muted)]">
            Saved learning structures
          </p>
        </div>

        <div className="glass-panel rounded-2xl border border-[color:var(--cs-stroke)] p-4">
          <p className="text-xs uppercase tracking-[0.28em] text-[color:var(--cs-ink-muted)]">
            Updated this week
          </p>
          <p className="mt-2 text-2xl font-semibold text-[color:var(--cs-ink)]">
            {mapsUpdatedThisWeek}
          </p>
          <p className="text-xs text-[color:var(--cs-ink-muted)]">
            Keep momentum visible
          </p>
        </div>

        <div className="glass-panel rounded-2xl border border-[color:var(--cs-stroke)] p-4">
          <p className="text-xs uppercase tracking-[0.28em] text-[color:var(--cs-ink-muted)]">
            Last activity
          </p>
          <p className="mt-2 text-2xl font-semibold text-[color:var(--cs-ink)]">
            {mostRecentlyUpdated
              ? mostRecentlyUpdated.toLocaleDateString()
              : "—"}
          </p>
          <p className="text-xs text-[color:var(--cs-ink-muted)]">
            Most recent edit
          </p>
        </div>

        <div className="glass-panel rounded-2xl border border-[color:var(--cs-stroke)] p-4">
          <p className="text-xs uppercase tracking-[0.28em] text-[color:var(--cs-ink-muted)]">
            Suggested templates
          </p>
          <p className="mt-2 text-2xl font-semibold text-[color:var(--cs-ink)]">
            {focusMapTemplates.length}
          </p>
          <p className="text-xs text-[color:var(--cs-ink-muted)]">
            Starting points
          </p>
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="glass-panel rounded-[28px] border border-[color:var(--cs-stroke)] p-6">
          <div className="flex items-center justify-between gap-3">
            <h2 className="font-display text-2xl font-semibold text-[color:var(--cs-ink)]">
              Your focus maps
            </h2>
            <Link
              className="rounded-full bg-[color:var(--cs-ink)] px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-white"
              href="/focus-maps?new=1"
            >
              New map
            </Link>
          </div>

          {focusMaps.length ? (
            <div className="mt-5 divide-y divide-[color:var(--cs-stroke)]">
              {focusMaps.map((map) => (
                <div key={map.id} className="py-4 first:pt-0 last:pb-0">
                  <p className="text-base font-semibold text-[color:var(--cs-ink)]">
                    {map.title}
                  </p>
                  {map.description ? (
                    <p className="text-sm text-[color:var(--cs-ink-muted)]">
                      {map.description}
                    </p>
                  ) : null}
                  <p className="mt-2 text-xs uppercase tracking-[0.2em] text-[color:var(--cs-ink-muted)]">
                    Updated {map.updatedAt.toLocaleDateString()}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <div className="mt-5 space-y-4">
              <p className="text-sm text-[color:var(--cs-ink-muted)]">
                No focus maps yet.
              </p>
              <div className="rounded-2xl border border-[color:var(--cs-stroke)] bg-[color:var(--cs-paper-strong)] p-4">
                <p className="text-sm font-semibold text-[color:var(--cs-ink)]">
                  Start with a single skill
                </p>
                <p className="mt-2 text-xs text-[color:var(--cs-ink-muted)]">
                  Focus maps work best when they document one learning goal,
                  examples, and the next challenge to assign.
                </p>
              </div>
            </div>
          )}
        </div>

        <div className="space-y-6">
          <div className="glass-panel rounded-[28px] border border-[color:var(--cs-stroke)] p-6">
            <h2 className="font-display text-2xl font-semibold text-[color:var(--cs-ink)]">
              Templates
            </h2>
            <p className="text-sm text-[color:var(--cs-ink-muted)]">
              Reusable scaffolds for common cohort skill tracks.
            </p>
            <div className="mt-5 space-y-3">
              {focusMapTemplates.map((template) => (
                <div
                  key={template.title}
                  className="rounded-2xl border border-[color:var(--cs-stroke)] bg-[color:var(--cs-paper-strong)] px-4 py-3"
                >
                  <p className="text-sm font-semibold text-[color:var(--cs-ink)]">
                    {template.title}
                  </p>
                  <p className="mt-1 text-xs text-[color:var(--cs-ink-muted)]">
                    {template.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="glass-panel rounded-[28px] border border-[color:var(--cs-stroke)] p-6">
            <h2 className="font-display text-2xl font-semibold text-[color:var(--cs-ink)]">
              Mentor prompts
            </h2>
            <p className="text-sm text-[color:var(--cs-ink-muted)]">
              Questions to keep maps actionable and inclusive.
            </p>
            <div className="mt-5 space-y-3">
              {focusMapPrompts.map((prompt) => (
                <div
                  key={prompt}
                  className="rounded-2xl border border-[color:var(--cs-stroke)] bg-white/80 px-4 py-3"
                >
                  <p className="text-sm font-semibold text-[color:var(--cs-ink)]">
                    {prompt}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="glass-panel rounded-[28px] border border-[color:var(--cs-stroke)] p-6">
        <h2 className="font-display text-2xl font-semibold text-[color:var(--cs-ink)]">
          What to capture in a focus map
        </h2>
        <p className="text-sm text-[color:var(--cs-ink-muted)]">
          Use this structure to turn a lesson into next week’s plan.
        </p>
        <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {[
            {
              title: "Core concept",
              detail: "One sentence learners should be able to explain.",
            },
            {
              title: "Example",
              detail: "A tiny build or prompt that proves understanding.",
            },
            {
              title: "Misconceptions",
              detail: "Where learners often confuse terms or steps.",
            },
            {
              title: "Next challenge",
              detail: "A follow-up task that increases complexity safely.",
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
