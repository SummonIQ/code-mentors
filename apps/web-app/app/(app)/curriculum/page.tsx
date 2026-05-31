import Link from "next/link";

import { NewCurriculumUnitModal } from "@/components/new-curriculum-unit-modal";
import { db } from "@/lib/db/client";

const lessonIngredients = [
  "Warm-up question",
  "Mini demo",
  "Build together",
  "Reflection + share",
];

const unitTemplates = [
  {
    title: "AI foundations",
    description: "Prompts, examples, evaluation, and basic model behavior.",
  },
  {
    title: "Automation lab",
    description: "Triggers, actions, branching, and safe human-in-the-loop.",
  },
  {
    title: "Creative coding",
    description: "Prototypes, iteration loops, and playful experiments.",
  },
];

const assessmentSignals = [
  "Learner can explain the concept in one sentence.",
  "Learner can show an example (prompt, workflow, or snippet).",
  "Learner can debug a mistake with mentor prompting.",
  "Learner can describe a safe next step to try.",
];

export default async function CurriculumPage({
  searchParams,
}: {
  searchParams?: { new?: string };
}) {
  const curriculumUnits = await db.curriculumUnit.findMany({
    orderBy: [{ order: "asc" }, { updatedAt: "desc" }],
    select: {
      id: true,
      title: true,
      description: true,
      weeksLabel: true,
    },
  });

  const showNewModal = searchParams?.new === "1";

  return (
    <div className="space-y-8">
      {showNewModal ? <NewCurriculumUnitModal /> : null}
      <header className="glass-panel rounded-[32px] border border-[color:var(--cs-stroke)] p-6">
        <p className="text-xs uppercase tracking-[0.32em] text-[color:var(--cs-ink-muted)]">
          Curriculum
        </p>
        <h1 className="font-display text-3xl font-semibold text-[color:var(--cs-ink)]">
          Build the learning journey
        </h1>
        <p className="mt-2 text-sm text-[color:var(--cs-ink-muted)]">
          Map lessons, scaffolds, and outcomes for every cohort.
        </p>
      </header>

      <section className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <div className="glass-panel rounded-2xl border border-[color:var(--cs-stroke)] p-4">
          <p className="text-xs uppercase tracking-[0.28em] text-[color:var(--cs-ink-muted)]">
            Units
          </p>
          <p className="mt-2 text-2xl font-semibold text-[color:var(--cs-ink)]">
            {curriculumUnits.length}
          </p>
          <p className="text-xs text-[color:var(--cs-ink-muted)]">In the map</p>
        </div>

        <div className="glass-panel rounded-2xl border border-[color:var(--cs-stroke)] p-4">
          <p className="text-xs uppercase tracking-[0.28em] text-[color:var(--cs-ink-muted)]">
            Lesson ingredients
          </p>
          <p className="mt-2 text-2xl font-semibold text-[color:var(--cs-ink)]">
            {lessonIngredients.length}
          </p>
          <p className="text-xs text-[color:var(--cs-ink-muted)]">
            Consistent rhythm
          </p>
        </div>

        <div className="glass-panel rounded-2xl border border-[color:var(--cs-stroke)] p-4">
          <p className="text-xs uppercase tracking-[0.28em] text-[color:var(--cs-ink-muted)]">
            Templates
          </p>
          <p className="mt-2 text-2xl font-semibold text-[color:var(--cs-ink)]">
            {unitTemplates.length}
          </p>
          <p className="text-xs text-[color:var(--cs-ink-muted)]">
            Starting points
          </p>
        </div>

        <div className="glass-panel rounded-2xl border border-[color:var(--cs-stroke)] p-4">
          <p className="text-xs uppercase tracking-[0.28em] text-[color:var(--cs-ink-muted)]">
            Assessment signals
          </p>
          <p className="mt-2 text-2xl font-semibold text-[color:var(--cs-ink)]">
            {assessmentSignals.length}
          </p>
          <p className="text-xs text-[color:var(--cs-ink-muted)]">
            Evidence of learning
          </p>
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="glass-panel rounded-[28px] border border-[color:var(--cs-stroke)] p-6">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-2xl font-semibold text-[color:var(--cs-ink)]">
              Curriculum map
            </h2>
            <Link
              className="rounded-full bg-[color:var(--cs-ink)] px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-white"
              href="/curriculum?new=1"
            >
              Add unit
            </Link>
          </div>
          <div className="mt-5 divide-y divide-[color:var(--cs-stroke)]">
            {curriculumUnits.map((unit) => (
              <div key={unit.id} className="py-4 first:pt-0 last:pb-0">
                <p className="text-base font-semibold text-[color:var(--cs-ink)]">
                  {unit.title}
                </p>
                <p className="text-sm text-[color:var(--cs-ink-muted)]">
                  {unit.description ?? ""}
                </p>
                {unit.weeksLabel ? (
                  <p className="text-xs uppercase tracking-[0.2em] text-[color:var(--cs-ink-muted)]">
                    {unit.weeksLabel}
                  </p>
                ) : null}
              </div>
            ))}
          </div>
        </div>

        <div className="glass-panel rounded-[28px] border border-[color:var(--cs-stroke)] p-6">
          <h2 className="font-display text-2xl font-semibold text-[color:var(--cs-ink)]">
            Lesson ingredients
          </h2>
          <p className="text-sm text-[color:var(--cs-ink-muted)]">
            Build consistent sessions that learners remember.
          </p>
          <div className="mt-5 space-y-3">
            {lessonIngredients.map((item) => (
              <div
                key={item}
                className="rounded-2xl border border-[color:var(--cs-stroke)] bg-[color:var(--cs-paper-strong)] px-4 py-3"
              >
                <p className="text-sm font-semibold text-[color:var(--cs-ink)]">
                  {item}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-2">
        <div className="glass-panel rounded-[28px] border border-[color:var(--cs-stroke)] p-6">
          <h2 className="font-display text-2xl font-semibold text-[color:var(--cs-ink)]">
            Unit templates
          </h2>
          <p className="text-sm text-[color:var(--cs-ink-muted)]">
            Use these structures to keep lesson planning fast.
          </p>
          <div className="mt-5 space-y-3">
            {unitTemplates.map((template) => (
              <div
                key={template.title}
                className="rounded-2xl border border-[color:var(--cs-stroke)] bg-white/80 px-4 py-3"
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
            Assessment signals
          </h2>
          <p className="text-sm text-[color:var(--cs-ink-muted)]">
            Look for these during the build so progress stays measurable.
          </p>
          <div className="mt-5 space-y-3">
            {assessmentSignals.map((signal) => (
              <div
                key={signal}
                className="rounded-2xl border border-[color:var(--cs-stroke)] bg-[color:var(--cs-paper-strong)] px-4 py-3"
              >
                <p className="text-sm font-semibold text-[color:var(--cs-ink)]">
                  {signal}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
