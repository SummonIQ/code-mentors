import Link from "next/link";

const mentors = [
  {
    name: "Coach Maya",
    specialty: "AI fundamentals",
    status: "Live now",
  },
  {
    name: "Ravi K.",
    specialty: "Automation workflows",
    status: "Available",
  },
  {
    name: "Lena K.",
    specialty: "Curriculum design",
    status: "Planning",
  },
  {
    name: "Sam P.",
    specialty: "Creative coding",
    status: "Reviewing",
  },
];

const mentorActions = [
  "Assign mentor to cohort",
  "Request lesson feedback",
  "Schedule training",
];

const mentorOpsPlaybook = [
  {
    title: "Before the session",
    detail:
      "Confirm agenda, tools, and safety guardrails with the lead mentor.",
  },
  {
    title: "During the build",
    detail: "Model the thinking out loud and nudge learners to explain steps.",
  },
  {
    title: "After class",
    detail: "Capture what was confusing and propose one curriculum adjustment.",
  },
  {
    title: "Weekly sync",
    detail: "Share wins, recurring misconceptions, and updated focus maps.",
  },
];

export default function MentorsPage({
  searchParams,
}: {
  searchParams?: { invite?: string; new?: string; task?: string };
}) {
  const modal = searchParams?.invite
    ? {
        title: "Invite mentor",
        description:
          "Send a live-session invite to a mentor with AI or automation expertise.",
        primary: "Send invite",
      }
    : searchParams?.new
      ? {
          title: "Add mentor",
          description:
            "Create a new mentor profile and assign them to a cohort.",
          primary: "Create mentor",
        }
      : searchParams?.task
        ? {
            title: "Mentor action",
            description: searchParams.task,
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
                href="/mentors"
              >
                Close
              </Link>
              <Link
                className="rounded-full bg-[color:var(--cs-ink)] px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-white"
                href="/mentors"
              >
                {modal.primary}
              </Link>
            </div>
          </div>
        </div>
      ) : null}
      <header className="glass-panel rounded-[32px] border border-[color:var(--cs-stroke)] p-6">
        <p className="text-xs uppercase tracking-[0.32em] text-[color:var(--cs-ink-muted)]">
          Mentors
        </p>
        <h1 className="font-display text-3xl font-semibold text-[color:var(--cs-ink)]">
          Coach network
        </h1>
        <p className="mt-2 text-sm text-[color:var(--cs-ink-muted)]">
          Track availability, expertise, and mentor assignments.
        </p>
      </header>

      <section className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <div className="glass-panel rounded-2xl border border-[color:var(--cs-stroke)] p-4">
          <p className="text-xs uppercase tracking-[0.28em] text-[color:var(--cs-ink-muted)]">
            Total mentors
          </p>
          <p className="mt-2 text-2xl font-semibold text-[color:var(--cs-ink)]">
            {mentors.length}
          </p>
          <p className="text-xs text-[color:var(--cs-ink-muted)]">In roster</p>
        </div>

        <div className="glass-panel rounded-2xl border border-[color:var(--cs-stroke)] p-4">
          <p className="text-xs uppercase tracking-[0.28em] text-[color:var(--cs-ink-muted)]">
            Available
          </p>
          <p className="mt-2 text-2xl font-semibold text-[color:var(--cs-ink)]">
            {mentors.filter((mentor) => mentor.status === "Available").length}
          </p>
          <p className="text-xs text-[color:var(--cs-ink-muted)]">
            Ready to join
          </p>
        </div>

        <div className="glass-panel rounded-2xl border border-[color:var(--cs-stroke)] p-4">
          <p className="text-xs uppercase tracking-[0.28em] text-[color:var(--cs-ink-muted)]">
            Live now
          </p>
          <p className="mt-2 text-2xl font-semibold text-[color:var(--cs-ink)]">
            {mentors.filter((mentor) => mentor.status === "Live now").length}
          </p>
          <p className="text-xs text-[color:var(--cs-ink-muted)]">
            Active session
          </p>
        </div>

        <div className="glass-panel rounded-2xl border border-[color:var(--cs-stroke)] p-4">
          <p className="text-xs uppercase tracking-[0.28em] text-[color:var(--cs-ink-muted)]">
            Actions
          </p>
          <p className="mt-2 text-2xl font-semibold text-[color:var(--cs-ink)]">
            {mentorActions.length}
          </p>
          <p className="text-xs text-[color:var(--cs-ink-muted)]">
            Fast workflows
          </p>
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="glass-panel rounded-[28px] border border-[color:var(--cs-stroke)] p-6">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-2xl font-semibold text-[color:var(--cs-ink)]">
              Mentor roster
            </h2>
            <Link
              className="rounded-full bg-[color:var(--cs-ink)] px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-white"
              href="/mentors?new=1"
            >
              Add mentor
            </Link>
          </div>
          <div className="mt-5 divide-y divide-[color:var(--cs-stroke)]">
            {mentors.map((mentor) => (
              <div key={mentor.name} className="py-4 first:pt-0 last:pb-0">
                <div className="flex items-center justify-between">
                  <p className="text-base font-semibold text-[color:var(--cs-ink)]">
                    {mentor.name}
                  </p>
                  <span className="rounded-full bg-[rgba(43,215,255,0.16)] px-3 py-1 text-xs font-semibold text-[color:var(--cs-ink)]">
                    {mentor.status}
                  </span>
                </div>
                <p className="text-sm text-[color:var(--cs-ink-muted)]">
                  {mentor.specialty}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="glass-panel rounded-[28px] border border-[color:var(--cs-stroke)] p-6">
          <h2 className="font-display text-2xl font-semibold text-[color:var(--cs-ink)]">
            Mentor actions
          </h2>
          <p className="text-sm text-[color:var(--cs-ink-muted)]">
            Keep your coaching team aligned.
          </p>
          <div className="mt-5 space-y-3">
            {mentorActions.map((action) => (
              <Link
                key={action}
                className="w-full rounded-2xl border border-[color:var(--cs-stroke)] bg-white/80 px-4 py-3 text-left text-sm font-semibold text-[color:var(--cs-ink)]"
                href={`/mentors?task=${encodeURIComponent(action)}`}
              >
                {action}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="glass-panel rounded-[28px] border border-[color:var(--cs-stroke)] p-6">
        <h2 className="font-display text-2xl font-semibold text-[color:var(--cs-ink)]">
          Mentor operations playbook
        </h2>
        <p className="text-sm text-[color:var(--cs-ink-muted)]">
          A lightweight rhythm that keeps the team consistent.
        </p>
        <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {mentorOpsPlaybook.map((item) => (
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
