import Link from "next/link";

const students = [
  {
    name: "Zoey M.",
    level: "Beginner",
    focus: "Prompting basics",
  },
  {
    name: "Liam S.",
    level: "Intermediate",
    focus: "Automation logic",
  },
  {
    name: "Tara L.",
    level: "Beginner",
    focus: "Creative coding",
  },
  {
    name: "Aiden R.",
    level: "Advanced",
    focus: "AI ethics",
  },
];

const studentActions = [
  "Send encouragement",
  "Assign challenge",
  "Share progress report",
];

const learnerSupportPlaybook = [
  {
    title: "Name the next step",
    detail: "Turn confusion into one concrete action the learner can try now.",
  },
  {
    title: "Ask for an explanation",
    detail:
      "Have learners explain what they expected to happen vs. what happened.",
  },
  {
    title: "Use tiny examples",
    detail:
      "Shrink the problem until it fits into a single prompt or workflow step.",
  },
  {
    title: "Celebrate the process",
    detail: "Reward debugging and iteration, not just the final output.",
  },
];

export default function StudentsPage({
  searchParams,
}: {
  searchParams?: { new?: string; action?: string; cheer?: string };
}) {
  const modal = searchParams?.new
    ? {
        title: "Add student",
        description: "Create a new learner profile and assign a cohort.",
        primary: "Add learner",
      }
    : searchParams?.cheer
      ? {
          title: "Send encouragement",
          description: "Deliver a supportive message to the learner.",
          primary: "Send note",
        }
      : searchParams?.action
        ? {
            title: "Student action",
            description: searchParams.action,
            primary: "Continue",
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
                href="/students"
              >
                Close
              </Link>
              <Link
                className="rounded-full bg-[color:var(--cs-ink)] px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-white"
                href="/students"
              >
                {modal.primary}
              </Link>
            </div>
          </div>
        </div>
      ) : null}
      <header className="glass-panel rounded-[32px] border border-[color:var(--cs-stroke)] p-6">
        <p className="text-xs uppercase tracking-[0.32em] text-[color:var(--cs-ink-muted)]">
          Students
        </p>
        <h1 className="font-display text-3xl font-semibold text-[color:var(--cs-ink)]">
          Learner roster
        </h1>
        <p className="mt-2 text-sm text-[color:var(--cs-ink-muted)]">
          Support every learner with the right guidance.
        </p>
      </header>

      <section className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <div className="glass-panel rounded-2xl border border-[color:var(--cs-stroke)] p-4">
          <p className="text-xs uppercase tracking-[0.28em] text-[color:var(--cs-ink-muted)]">
            Learners
          </p>
          <p className="mt-2 text-2xl font-semibold text-[color:var(--cs-ink)]">
            {students.length}
          </p>
          <p className="text-xs text-[color:var(--cs-ink-muted)]">In roster</p>
        </div>

        <div className="glass-panel rounded-2xl border border-[color:var(--cs-stroke)] p-4">
          <p className="text-xs uppercase tracking-[0.28em] text-[color:var(--cs-ink-muted)]">
            Beginners
          </p>
          <p className="mt-2 text-2xl font-semibold text-[color:var(--cs-ink)]">
            {students.filter((student) => student.level === "Beginner").length}
          </p>
          <p className="text-xs text-[color:var(--cs-ink-muted)]">
            Need scaffolds
          </p>
        </div>

        <div className="glass-panel rounded-2xl border border-[color:var(--cs-stroke)] p-4">
          <p className="text-xs uppercase tracking-[0.28em] text-[color:var(--cs-ink-muted)]">
            Advanced
          </p>
          <p className="mt-2 text-2xl font-semibold text-[color:var(--cs-ink)]">
            {students.filter((student) => student.level === "Advanced").length}
          </p>
          <p className="text-xs text-[color:var(--cs-ink-muted)]">
            Ready to stretch
          </p>
        </div>

        <div className="glass-panel rounded-2xl border border-[color:var(--cs-stroke)] p-4">
          <p className="text-xs uppercase tracking-[0.28em] text-[color:var(--cs-ink-muted)]">
            Actions
          </p>
          <p className="mt-2 text-2xl font-semibold text-[color:var(--cs-ink)]">
            {studentActions.length}
          </p>
          <p className="text-xs text-[color:var(--cs-ink-muted)]">
            Mentor tools
          </p>
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="glass-panel rounded-[28px] border border-[color:var(--cs-stroke)] p-6">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-2xl font-semibold text-[color:var(--cs-ink)]">
              Student list
            </h2>
            <Link
              className="rounded-full bg-[color:var(--cs-ink)] px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-white"
              href="/students?new=1"
            >
              Add student
            </Link>
          </div>
          <div className="mt-5 divide-y divide-[color:var(--cs-stroke)]">
            {students.map((student) => (
              <div key={student.name} className="py-4 first:pt-0 last:pb-0">
                <p className="text-base font-semibold text-[color:var(--cs-ink)]">
                  {student.name}
                </p>
                <p className="text-sm text-[color:var(--cs-ink-muted)]">
                  {student.focus}
                </p>
                <p className="text-xs uppercase tracking-[0.2em] text-[color:var(--cs-ink-muted)]">
                  {student.level}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="glass-panel rounded-[28px] border border-[color:var(--cs-stroke)] p-6">
          <h2 className="font-display text-2xl font-semibold text-[color:var(--cs-ink)]">
            Student actions
          </h2>
          <p className="text-sm text-[color:var(--cs-ink-muted)]">
            Encourage progress and guide the next step.
          </p>
          <div className="mt-5 space-y-3">
            {studentActions.map((action) => (
              <Link
                key={action}
                className="w-full rounded-2xl border border-[color:var(--cs-stroke)] bg-white/80 px-4 py-3 text-left text-sm font-semibold text-[color:var(--cs-ink)]"
                href={`/students?action=${encodeURIComponent(action)}`}
              >
                {action}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="glass-panel rounded-[28px] border border-[color:var(--cs-stroke)] p-6">
        <h2 className="font-display text-2xl font-semibold text-[color:var(--cs-ink)]">
          Learner support playbook
        </h2>
        <p className="text-sm text-[color:var(--cs-ink-muted)]">
          Small moves that keep learners confident.
        </p>
        <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {learnerSupportPlaybook.map((item) => (
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
