import Link from "next/link";
import { LiveRoom } from "@/components/live-room";

const liveSessions = [
  {
    title: "AI Helper Build",
    mentor: "Coach Maya",
    status: "Live",
    time: "Now",
  },
  {
    title: "Automation Sprint",
    mentor: "Ravi K.",
    status: "Starting soon",
    time: "2:00 PM",
  },
];

const sessionHistory = [
  {
    title: "Creative Coding Lab",
    mentor: "Sam P.",
    status: "Completed",
    time: "Yesterday",
  },
  {
    title: "AI Storytelling",
    mentor: "Lena K.",
    status: "Completed",
    time: "Monday",
  },
];

const runOfShowChecklist = [
  {
    title: "Welcome + goal",
    detail:
      "Set a one-sentence goal and show the finished example first, making sure to include all learners and provide accommodations as needed.",
  },
  {
    title: "Mini demo",
    detail: "Model the workflow and narrate the steps out loud.",
  },
  {
    title: "Build sprint",
    detail: "10 minutes of focused building with a visible timer.",
  },
  {
    title: "Share + reflect",
    detail: "Learners demo their work and explain what they changed.",
  },
];

const sessionNextActions = [
  {
    label: "Assign automation challenge",
    description: "Drop a workflow build into the cohort queue.",
    href: "/challenges?auto=1",
  },
  {
    label: "Open focus maps",
    description: "Update skill connections based on today’s session.",
    href: "/focus-maps",
  },
  {
    label: "Share weekly update",
    description: "Send a progress summary to families.",
    href: "/reports?share=1",
  },
  {
    label: "Browse teaching resources",
    description: "Grab checklists and slide decks for next class.",
    href: "/library",
  },
];

export default function SessionsPage({
  searchParams,
}: {
  searchParams?: {
    start?: string;
    timer?: string;
    quiz?: string;
    focus?: string;
    launch?: string;
  };
}) {
  const showLaunchRoom = Boolean(searchParams?.launch);
  const modal = searchParams?.start
    ? {
        title: "Start live session",
        description:
          "Launch the AI Helper build room with video, chat, and screen share.",
        primary: "Launch room",
      }
    : searchParams?.timer
      ? {
          title: "Open session timer",
          description: "Set a 10-minute focus block for the cohort.",
          primary: "Start timer",
        }
      : searchParams?.quiz
        ? {
            title: "Launch quick quiz",
            description: "Send a three-question check-in to the cohort.",
            primary: "Send quiz",
          }
        : searchParams?.focus
          ? {
              title: "Start focus block",
              description: "Notify learners that a quiet build sprint is live.",
              primary: "Start focus",
            }
          : null;

  return (
    <div className="space-y-8">
      {modal ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[rgba(11,15,20,0.35)] px-6 py-10">
          <div className="glass-panel animate-pop w-full max-w-lg rounded-[28px] border border-[color:var(--cs-stroke)] p-6">
            <p className="text-xs uppercase tracking-[0.32em] text-[color:var(--cs-ink-muted)]">
              Session dialog
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
                href="/sessions"
              >
                Cancel
              </Link>
              <Link
                className="rounded-full bg-[color:var(--cs-ink)] px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-white"
                href="/sessions?launch=1"
              >
                {modal.primary}
              </Link>
            </div>
          </div>
        </div>
      ) : null}

      {showLaunchRoom ? <LiveRoom /> : null}
      <header className="glass-panel rounded-[32px] border border-[color:var(--cs-stroke)] p-6">
        <p className="text-xs uppercase tracking-[0.32em] text-[color:var(--cs-ink-muted)]">
          Sessions
        </p>
        <h1 className="font-display text-3xl font-semibold text-[color:var(--cs-ink)]">
          Live mentoring room
        </h1>
        <p className="mt-2 text-sm text-[color:var(--cs-ink-muted)]">
          Join live cohorts, preview content, and follow up after class.
        </p>
      </header>

      <section className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <div className="glass-panel rounded-2xl border border-[color:var(--cs-stroke)] p-4">
          <p className="text-xs uppercase tracking-[0.28em] text-[color:var(--cs-ink-muted)]">
            Live now
          </p>
          <p className="mt-2 text-2xl font-semibold text-[color:var(--cs-ink)]">
            {liveSessions.length}
          </p>
          <p className="text-xs text-[color:var(--cs-ink-muted)]">
            Rooms in progress
          </p>
        </div>

        <div className="glass-panel rounded-2xl border border-[color:var(--cs-stroke)] p-4">
          <p className="text-xs uppercase tracking-[0.28em] text-[color:var(--cs-ink-muted)]">
            Recent sessions
          </p>
          <p className="mt-2 text-2xl font-semibold text-[color:var(--cs-ink)]">
            {sessionHistory.length}
          </p>
          <p className="text-xs text-[color:var(--cs-ink-muted)]">
            In the archive
          </p>
        </div>

        <div className="glass-panel rounded-2xl border border-[color:var(--cs-stroke)] p-4">
          <p className="text-xs uppercase tracking-[0.28em] text-[color:var(--cs-ink-muted)]">
            Run of show
          </p>
          <p className="mt-2 text-2xl font-semibold text-[color:var(--cs-ink)]">
            {runOfShowChecklist.length}
          </p>
          <p className="text-xs text-[color:var(--cs-ink-muted)]">Core steps</p>
        </div>

        <div className="glass-panel rounded-2xl border border-[color:var(--cs-stroke)] p-4">
          <p className="text-xs uppercase tracking-[0.28em] text-[color:var(--cs-ink-muted)]">
            Next actions
          </p>
          <p className="mt-2 text-2xl font-semibold text-[color:var(--cs-ink)]">
            {sessionNextActions.length}
          </p>
          <p className="text-xs text-[color:var(--cs-ink-muted)]">
            After class
          </p>
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="glass-panel rounded-[28px] border border-[color:var(--cs-stroke)] p-6">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-2xl font-semibold text-[color:var(--cs-ink)]">
              Live sessions
            </h2>
            <Link
              className="rounded-full bg-[color:var(--cs-ink)] px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-white"
              href="/sessions?start=1"
            >
              Start session
            </Link>
          </div>
          <div className="mt-5 divide-y divide-[color:var(--cs-stroke)]">
            {liveSessions.map((session) => (
              <div key={session.title} className="py-4 first:pt-0 last:pb-0">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <p className="text-base font-semibold text-[color:var(--cs-ink)]">
                      {session.title}
                    </p>
                    <p className="text-sm text-[color:var(--cs-ink-muted)]">
                      {session.mentor}
                    </p>
                  </div>
                  <span className="rounded-full bg-[rgba(43,215,255,0.16)] px-3 py-1 text-xs font-semibold text-[color:var(--cs-ink)]">
                    {session.status}
                  </span>
                </div>
                <p className="mt-2 text-xs uppercase tracking-[0.2em] text-[color:var(--cs-ink-muted)]">
                  {session.time}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="glass-panel rounded-[28px] border border-[color:var(--cs-stroke)] p-6">
          <h2 className="font-display text-2xl font-semibold text-[color:var(--cs-ink)]">
            Session history
          </h2>
          <p className="text-sm text-[color:var(--cs-ink-muted)]">
            Review recaps and notes from recent classes.
          </p>
          <div className="mt-5 divide-y divide-[color:var(--cs-stroke)]">
            {sessionHistory.map((session) => (
              <div key={session.title} className="py-4 first:pt-0 last:pb-0">
                <p className="text-base font-semibold text-[color:var(--cs-ink)]">
                  {session.title}
                </p>
                <p className="text-sm text-[color:var(--cs-ink-muted)]">
                  {session.mentor}
                </p>
                <p className="text-xs uppercase tracking-[0.2em] text-[color:var(--cs-ink-muted)]">
                  {session.time}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="glass-panel rounded-[28px] border border-[color:var(--cs-stroke)] p-6">
          <h2 className="font-display text-2xl font-semibold text-[color:var(--cs-ink)]">
            Run of show
          </h2>
          <p className="text-sm text-[color:var(--cs-ink-muted)]">
            A consistent rhythm keeps cohorts calm and confident.
          </p>
          <div className="mt-5 space-y-3">
            {runOfShowChecklist.map((item) => (
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

        <div className="glass-panel rounded-[28px] border border-[color:var(--cs-stroke)] p-6">
          <h2 className="font-display text-2xl font-semibold text-[color:var(--cs-ink)]">
            Suggested next actions
          </h2>
          <p className="text-sm text-[color:var(--cs-ink-muted)]">
            Turn today’s momentum into next week’s plan.
          </p>
          <div className="mt-5 space-y-3">
            {sessionNextActions.map((action) => (
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
    </div>
  );
}
