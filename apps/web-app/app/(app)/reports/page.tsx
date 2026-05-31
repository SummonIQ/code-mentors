import Link from "next/link";

const reportHighlights = [
  {
    title: "AI confidence scores",
    metric: "82%",
    note: "Up 6% since last cohort",
  },
  {
    title: "Project completion",
    metric: "91%",
    note: "Most learners finish by Week 6",
  },
  {
    title: "Mentor feedback",
    metric: "4.8/5",
    note: "Parents love the clarity",
  },
];

const insightNotes = [
  "Learners ask for more automation demos in Week 3.",
  "Storytelling sessions have the highest engagement.",
  "Add extra practice for prompt evaluation.",
];

const weeklySummarySections = [
  {
    title: "What we built",
    detail: "One sentence describing the project outcome from the session.",
  },
  {
    title: "New skills",
    detail: "Concepts learners can explain or demonstrate now.",
  },
  {
    title: "Big wins",
    detail: "Shout-outs and moments of confidence or creativity.",
  },
  {
    title: "Next step",
    detail: "The best follow-up task families can try at home.",
  },
];

const reportNextActions = [
  {
    label: "Share weekly summary",
    description: "Send a family-friendly recap with highlights.",
    href: "/reports?share=1",
  },
  {
    label: "Export mentor notes",
    description: "Download a PDF summary for archival.",
    href: "/reports?export=1",
  },
  {
    label: "Save to cohort archive",
    description: "Store this recap for future cohorts.",
    href: "/reports?save=1",
  },
  {
    label: "Update focus maps",
    description: "Capture skill connections from this week.",
    href: "/focus-maps",
  },
];

export default function ReportsPage({
  searchParams,
}: {
  searchParams?: {
    share?: string;
    export?: string;
    save?: string;
    safety?: string;
  };
}) {
  const modal = searchParams?.share
    ? {
        title: "Share report",
        description: "Send the weekly progress summary to families.",
        primary: "Share now",
      }
    : searchParams?.export
      ? {
          title: "Export notes",
          description: "Download mentor notes as a PDF summary.",
          primary: "Export",
        }
      : searchParams?.save
        ? {
            title: "Save summary",
            description: "Store this session recap in the cohort archive.",
            primary: "Save",
          }
        : searchParams?.safety
          ? {
              title: "Safety checklist",
              description:
                "Review the AI safety checklist before next session.",
              primary: "Open checklist",
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
                href="/reports"
              >
                Close
              </Link>
              <Link
                className="rounded-full bg-[color:var(--cs-ink)] px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-white"
                href="/reports"
              >
                {modal.primary}
              </Link>
            </div>
          </div>
        </div>
      ) : null}
      <header className="glass-panel rounded-[32px] border border-[color:var(--cs-stroke)] p-6">
        <p className="text-xs uppercase tracking-[0.32em] text-[color:var(--cs-ink-muted)]">
          Reports
        </p>
        <h1 className="font-display text-3xl font-semibold text-[color:var(--cs-ink)]">
          Learning insights
        </h1>
        <p className="mt-2 text-sm text-[color:var(--cs-ink-muted)]">
          Track outcomes and share progress with families.
        </p>
      </header>

      <section className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <div className="glass-panel rounded-2xl border border-[color:var(--cs-stroke)] p-4">
          <p className="text-xs uppercase tracking-[0.28em] text-[color:var(--cs-ink-muted)]">
            Highlights
          </p>
          <p className="mt-2 text-2xl font-semibold text-[color:var(--cs-ink)]">
            {reportHighlights.length}
          </p>
          <p className="text-xs text-[color:var(--cs-ink-muted)]">
            Key signals
          </p>
        </div>

        <div className="glass-panel rounded-2xl border border-[color:var(--cs-stroke)] p-4">
          <p className="text-xs uppercase tracking-[0.28em] text-[color:var(--cs-ink-muted)]">
            Insight notes
          </p>
          <p className="mt-2 text-2xl font-semibold text-[color:var(--cs-ink)]">
            {insightNotes.length}
          </p>
          <p className="text-xs text-[color:var(--cs-ink-muted)]">
            From reflections
          </p>
        </div>

        <div className="glass-panel rounded-2xl border border-[color:var(--cs-stroke)] p-4">
          <p className="text-xs uppercase tracking-[0.28em] text-[color:var(--cs-ink-muted)]">
            Summary blocks
          </p>
          <p className="mt-2 text-2xl font-semibold text-[color:var(--cs-ink)]">
            {weeklySummarySections.length}
          </p>
          <p className="text-xs text-[color:var(--cs-ink-muted)]">
            Family-friendly
          </p>
        </div>

        <div className="glass-panel rounded-2xl border border-[color:var(--cs-stroke)] p-4">
          <p className="text-xs uppercase tracking-[0.28em] text-[color:var(--cs-ink-muted)]">
            Next actions
          </p>
          <p className="mt-2 text-2xl font-semibold text-[color:var(--cs-ink)]">
            {reportNextActions.length}
          </p>
          <p className="text-xs text-[color:var(--cs-ink-muted)]">
            Ready to send
          </p>
        </div>
      </section>

      <section className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {reportHighlights.map((report) => (
          <div
            key={report.title}
            className="glass-panel rounded-2xl border border-[color:var(--cs-stroke)] p-4"
          >
            <p className="text-xs uppercase tracking-[0.28em] text-[color:var(--cs-ink-muted)]">
              {report.title}
            </p>
            <p className="mt-2 text-2xl font-semibold text-[color:var(--cs-ink)]">
              {report.metric}
            </p>
            <p className="text-xs text-[color:var(--cs-ink-muted)]">
              {report.note}
            </p>
          </div>
        ))}
      </section>

      <section className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="glass-panel rounded-[28px] border border-[color:var(--cs-stroke)] p-6">
          <h2 className="font-display text-2xl font-semibold text-[color:var(--cs-ink)]">
            Weekly summary structure
          </h2>
          <p className="text-sm text-[color:var(--cs-ink-muted)]">
            Use these blocks to write a recap that families can understand.
          </p>
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            {weeklySummarySections.map((section) => (
              <div
                key={section.title}
                className="rounded-2xl border border-[color:var(--cs-stroke)] bg-[color:var(--cs-paper-strong)] p-4"
              >
                <p className="text-xs uppercase tracking-[0.26em] text-[color:var(--cs-ink-muted)]">
                  {section.title}
                </p>
                <p className="mt-2 text-sm font-semibold text-[color:var(--cs-ink)]">
                  {section.detail}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="glass-panel rounded-[28px] border border-[color:var(--cs-stroke)] p-6">
          <div className="flex items-center justify-between gap-3">
            <div>
              <h2 className="font-display text-2xl font-semibold text-[color:var(--cs-ink)]">
                Next actions
              </h2>
              <p className="text-sm text-[color:var(--cs-ink-muted)]">
                Share, export, or save the recap in one click.
              </p>
            </div>
            <Link
              className="rounded-full bg-[color:var(--cs-ink)] px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-white"
              href="/reports?share=1"
            >
              Share
            </Link>
          </div>
          <div className="mt-5 space-y-3">
            {reportNextActions.map((action) => (
              <Link
                key={action.label}
                className="block rounded-2xl border border-[color:var(--cs-stroke)] bg-white/80 px-4 py-3"
                href={action.href}
              >
                <p className="text-sm font-semibold text-[color:var(--cs-ink)]">
                  {action.label}
                </p>
                <p className="mt-1 text-xs text-[color:var(--cs-ink-muted)]">
                  {action.description}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="glass-panel rounded-[28px] border border-[color:var(--cs-stroke)] p-6">
        <h2 className="font-display text-2xl font-semibold text-[color:var(--cs-ink)]">
          Mentor insights
        </h2>
        <p className="text-sm text-[color:var(--cs-ink-muted)]">
          Notes pulled from session reflections.
        </p>
        <div className="mt-5 space-y-3">
          {insightNotes.map((note) => (
            <div
              key={note}
              className="rounded-2xl border border-[color:var(--cs-stroke)] bg-[color:var(--cs-paper-strong)] px-4 py-3"
            >
              <p className="text-sm font-semibold text-[color:var(--cs-ink)]">
                {note}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
