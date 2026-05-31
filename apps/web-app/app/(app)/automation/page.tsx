import Link from "next/link";

const automationFlows = [
  {
    title: "Homework reminder bot",
    description: "Send gentle nudges when homework is due.",
    status: "Active",
  },
  {
    title: "Study playlist generator",
    description: "Create focus playlists based on tasks.",
    status: "Draft",
  },
  {
    title: "Project showcase notifier",
    description: "Celebrate when learners publish a project.",
    status: "Live",
  },
];

const automationGuides = [
  "Trigger + action glossary",
  "Safe automation patterns",
  "Beginner-friendly workflows",
];

const automationPatterns = [
  {
    title: "Trigger → draft → mentor review",
    detail: "Let learners propose, mentors approve before sending or posting.",
  },
  {
    title: "Small steps, visible logs",
    detail: "Show each step so learners can explain what happened and why.",
  },
  {
    title: "Fallback prompts",
    detail: "If AI output is unclear, provide a safe, simpler alternative.",
  },
  {
    title: "Celebration loops",
    detail: "Automate praise when learners ship something meaningful.",
  },
];

const guardrails = [
  {
    title: "Age-appropriate content",
    detail: "Avoid personal data, mature topics, and unmoderated sharing.",
  },
  {
    title: "No silent actions",
    detail: "Make every automation visible to the learner (what it did, when).",
  },
  {
    title: "Human in the loop",
    detail:
      "Mentors approve anything that messages others or publishes content.",
  },
  {
    title: "Explainability first",
    detail:
      "Learners should describe the trigger and the action in plain language.",
  },
];

export default function AutomationPage({
  searchParams,
}: {
  searchParams?: { new?: string };
}) {
  const modal = searchParams?.new
    ? {
        title: "New automation flow",
        description: "Sketch a beginner-friendly automation workflow.",
        primary: "Create flow",
      }
    : null;

  return (
    <div className="space-y-8">
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
                href="/automation"
              >
                Close
              </Link>
              <Link
                className="rounded-full bg-[color:var(--cs-ink)] px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-white"
                href="/automation"
              >
                {modal.primary}
              </Link>
            </div>
          </div>
        </div>
      ) : null}
      <header className="glass-panel rounded-[32px] border border-[color:var(--cs-stroke)] p-6">
        <p className="text-xs uppercase tracking-[0.32em] text-[color:var(--cs-ink-muted)]">
          Automation lab
        </p>
        <h1 className="font-display text-3xl font-semibold text-[color:var(--cs-ink)]">
          Build playful automations
        </h1>
        <p className="mt-2 text-sm text-[color:var(--cs-ink-muted)]">
          Prototype bots and workflows learners can understand and explain.
        </p>
      </header>

      <section className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <div className="glass-panel rounded-2xl border border-[color:var(--cs-stroke)] p-4">
          <p className="text-xs uppercase tracking-[0.28em] text-[color:var(--cs-ink-muted)]">
            Flows
          </p>
          <p className="mt-2 text-2xl font-semibold text-[color:var(--cs-ink)]">
            {automationFlows.length}
          </p>
          <p className="text-xs text-[color:var(--cs-ink-muted)]">
            Examples in the lab
          </p>
        </div>

        <div className="glass-panel rounded-2xl border border-[color:var(--cs-stroke)] p-4">
          <p className="text-xs uppercase tracking-[0.28em] text-[color:var(--cs-ink-muted)]">
            Guides
          </p>
          <p className="mt-2 text-2xl font-semibold text-[color:var(--cs-ink)]">
            {automationGuides.length}
          </p>
          <p className="text-xs text-[color:var(--cs-ink-muted)]">
            Mentor references
          </p>
        </div>

        <div className="glass-panel rounded-2xl border border-[color:var(--cs-stroke)] p-4">
          <p className="text-xs uppercase tracking-[0.28em] text-[color:var(--cs-ink-muted)]">
            Patterns
          </p>
          <p className="mt-2 text-2xl font-semibold text-[color:var(--cs-ink)]">
            {automationPatterns.length}
          </p>
          <p className="text-xs text-[color:var(--cs-ink-muted)]">
            Beginner-friendly building blocks
          </p>
        </div>

        <div className="glass-panel rounded-2xl border border-[color:var(--cs-stroke)] p-4">
          <p className="text-xs uppercase tracking-[0.28em] text-[color:var(--cs-ink-muted)]">
            Guardrails
          </p>
          <p className="mt-2 text-2xl font-semibold text-[color:var(--cs-ink)]">
            {guardrails.length}
          </p>
          <p className="text-xs text-[color:var(--cs-ink-muted)]">
            Safety defaults
          </p>
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="glass-panel rounded-[28px] border border-[color:var(--cs-stroke)] p-6">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-2xl font-semibold text-[color:var(--cs-ink)]">
              Automation flows
            </h2>
            <Link
              className="rounded-full bg-[color:var(--cs-ink)] px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-white"
              href="/automation?new=1"
            >
              New flow
            </Link>
          </div>
          <div className="mt-5 divide-y divide-[color:var(--cs-stroke)]">
            {automationFlows.map((flow) => (
              <div key={flow.title} className="py-4 first:pt-0 last:pb-0">
                <div className="flex items-center justify-between">
                  <p className="text-base font-semibold text-[color:var(--cs-ink)]">
                    {flow.title}
                  </p>
                  <span className="rounded-full bg-[rgba(43,215,255,0.16)] px-3 py-1 text-xs font-semibold text-[color:var(--cs-ink)]">
                    {flow.status}
                  </span>
                </div>
                <p className="text-sm text-[color:var(--cs-ink-muted)]">
                  {flow.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="glass-panel rounded-[28px] border border-[color:var(--cs-stroke)] p-6">
          <h2 className="font-display text-2xl font-semibold text-[color:var(--cs-ink)]">
            Automation guides
          </h2>
          <p className="text-sm text-[color:var(--cs-ink-muted)]">
            References to help mentors explain workflows.
          </p>
          <div className="mt-5 space-y-3">
            {automationGuides.map((guide) => (
              <div
                key={guide}
                className="rounded-2xl border border-[color:var(--cs-stroke)] bg-[color:var(--cs-paper-strong)] px-4 py-3"
              >
                <p className="text-sm font-semibold text-[color:var(--cs-ink)]">
                  {guide}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-2">
        <div className="glass-panel rounded-[28px] border border-[color:var(--cs-stroke)] p-6">
          <h2 className="font-display text-2xl font-semibold text-[color:var(--cs-ink)]">
            Workflow patterns
          </h2>
          <p className="text-sm text-[color:var(--cs-ink-muted)]">
            Structures that help learners understand cause and effect.
          </p>
          <div className="mt-5 space-y-3">
            {automationPatterns.map((pattern) => (
              <div
                key={pattern.title}
                className="rounded-2xl border border-[color:var(--cs-stroke)] bg-white/80 px-4 py-3"
              >
                <p className="text-sm font-semibold text-[color:var(--cs-ink)]">
                  {pattern.title}
                </p>
                <p className="mt-1 text-xs text-[color:var(--cs-ink-muted)]">
                  {pattern.detail}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="glass-panel rounded-[28px] border border-[color:var(--cs-stroke)] p-6">
          <h2 className="font-display text-2xl font-semibold text-[color:var(--cs-ink)]">
            Guardrails
          </h2>
          <p className="text-sm text-[color:var(--cs-ink-muted)]">
            Defaults that keep automation safe and explainable.
          </p>
          <div className="mt-5 space-y-3">
            {guardrails.map((item) => (
              <div
                key={item.title}
                className="rounded-2xl border border-[color:var(--cs-stroke)] bg-[color:var(--cs-paper-strong)] px-4 py-3"
              >
                <p className="text-sm font-semibold text-[color:var(--cs-ink)]">
                  {item.title}
                </p>
                <p className="mt-1 text-xs text-[color:var(--cs-ink-muted)]">
                  {item.detail}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
