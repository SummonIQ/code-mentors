import Link from "next/link";

const challenges = [
  {
    title: "Build a Smart Homework Helper",
    track: "AI + automation basics",
    due: "Live this week",
    progress: 62,
  },
  {
    title: "Design a Bot That Cleans Data",
    track: "Automation workflows",
    due: "Review Friday",
    progress: 38,
  },
  {
    title: "Explain Your Model to a Friend",
    track: "Beginner-friendly storytelling",
    due: "Next week",
    progress: 14,
  },
];

const mentorNotes = [
  {
    author: "Coach Maya",
    role: "Lead mentor",
    note: "Keep the lessons playful. Show learners how AI helps with everyday tasks.",
    time: "10:20 AM",
  },
  {
    author: "Andre T.",
    role: "Teaching assistant",
    note: "Model the steps aloud. Learners learn the process, not just the answer.",
    time: "Yesterday",
  },
  {
    author: "Lena K.",
    role: "Curriculum mentor",
    note: "Capture what confused the group so we can refine next session.",
    time: "Mon",
  },
];

const workItems = [
  {
    title: "Lesson plan for AI basics (beginner group)",
    status: "In progress",
    tag: "Week 2",
  },
  {
    title: "Automation demo script",
    status: "Needs review",
    tag: "Mentor sync",
  },
  {
    title: "Safety-first coding glossary",
    status: "Queued",
    tag: "Library",
  },
];

const resources = [
  {
    title: "Teach AI with stories",
    type: "Guide",
    detail: "12 min read",
  },
  {
    title: "Automation cards for learners",
    type: "Practice",
    detail: "18 prompts",
  },
  {
    title: "Mentor feedback rubric",
    type: "Template",
    detail: "Reusable rubric",
  },
  {
    title: "Weekly mentor circle",
    type: "Calendar",
    detail: "Updated weekly",
  },
];

const collaborators = [
  {
    name: "Jules",
    role: "Mentor",
    status: "Pairing",
  },
  {
    name: "Ravi",
    role: "AI coach",
    status: "Live class",
  },
  {
    name: "Kira",
    role: "Curriculum",
    status: "Reviewing",
  },
  {
    name: "Sam",
    role: "Automation",
    status: "Building",
  },
];

const quickStats = [
  {
    label: "Live cohort",
    value: "14 learners",
    hint: "session active",
  },
  {
    label: "Mentor check-in",
    value: "3:30 PM",
    hint: "next group",
  },
  {
    label: "Challenges",
    value: "3 active",
    hint: "beginner-friendly",
  },
  {
    label: "Resources",
    value: "24 ready",
    hint: "lesson-ready",
  },
];

const chatMessages = [
  {
    author: "Coach Maya",
    role: "Mentor",
    message: "We are building a homework helper. What should it do first?",
    time: "10:32",
  },
  {
    author: "Zoey",
    role: "Student",
    message: "It should read the question and suggest steps.",
    time: "10:33",
  },
  {
    author: "Liam",
    role: "Student",
    message: "Can it show examples when it gets stuck?",
    time: "10:34",
  },
  {
    author: "Coach Maya",
    role: "Mentor",
    message: "Yes. Let us build the prompt template together.",
    time: "10:35",
  },
];

const sessionParticipants = [
  { name: "Coach Maya", status: "Hosting" },
  { name: "Zoey", status: "Asking questions" },
  { name: "Liam", status: "Screen sharing" },
  { name: "Tara", status: "Note taking" },
];

export default function WorkspacePage({
  searchParams,
}: {
  searchParams?: {
    note?: string;
    preview?: string;
    broadcast?: string;
    pin?: string;
  };
}) {
  const modal = searchParams?.note
    ? {
        title: "Mentor note",
        description:
          "Capture a guiding note for the cohort. This will appear in the live session feed.",
        primaryLabel: "Save note",
      }
    : searchParams?.preview
      ? {
          title: "Broadcast preview",
          description:
            "This is how the message will look to learners and families.",
          primaryLabel: "Confirm send",
        }
      : searchParams?.broadcast
        ? {
            title: "Broadcast sent",
            description:
              "Your encouragement has been delivered to the full cohort.",
            primaryLabel: "View recap",
          }
        : searchParams?.pin
          ? {
              title: "Pin student question",
              description:
                "Keep a question visible during the session to guide discussion.",
              primaryLabel: "Pin now",
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
                href="/workspace"
              >
                Close
              </Link>
              <Link
                className="rounded-full bg-[color:var(--cs-ink)] px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-white"
                href="/workspace"
              >
                {modal.primaryLabel}
              </Link>
            </div>
          </div>
        </div>
      ) : null}
      <header className="glass-panel flex flex-wrap items-center justify-between gap-4 rounded-[32px] border border-[color:var(--cs-stroke)] p-6">
        <div>
          <p className="text-xs uppercase tracking-[0.32em] text-[color:var(--cs-ink-muted)]">
            Workspace overview
          </p>
          <h1 className="font-display text-3xl font-semibold text-[color:var(--cs-ink)]">
            Mentor learners with clarity and momentum.
          </h1>
        </div>
        <div className="flex flex-wrap gap-2">
          <Link
            className="rounded-full border border-[color:var(--cs-stroke)] bg-white/80 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-[color:var(--cs-ink-muted)]"
            href="/reports"
          >
            Share update
          </Link>
          <Link
            className="rounded-full bg-[color:var(--cs-ink)] px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-white"
            href="/sessions?focus=1"
          >
            Start focus block
          </Link>
        </div>
      </header>

      <section className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {quickStats.map((stat) => (
          <div
            key={stat.label}
            className="glass-panel rounded-2xl border border-[color:var(--cs-stroke)] p-4"
          >
            <p className="text-xs uppercase tracking-[0.28em] text-[color:var(--cs-ink-muted)]">
              {stat.label}
            </p>
            <p className="mt-2 text-2xl font-semibold text-[color:var(--cs-ink)]">
              {stat.value}
            </p>
            <p className="text-xs text-[color:var(--cs-ink-muted)]">
              {stat.hint}
            </p>
          </div>
        ))}
      </section>

      <section className="glass-panel rounded-[28px] border border-[color:var(--cs-stroke)] p-8">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="font-display text-2xl font-semibold text-[color:var(--cs-ink)]">
              Live mentor workspace
            </h2>
            <p className="text-sm text-[color:var(--cs-ink-muted)]">
              Coach Maya is walking the cohort through an AI helper build.
            </p>
          </div>
          <span className="rounded-full bg-[rgba(43,215,255,0.16)] px-3 py-1 text-xs font-semibold text-[color:var(--cs-ink)]">
            Live now
          </span>
        </div>

        <div className="mt-5 grid gap-6 lg:grid-cols-[1.7fr_0.9fr]">
          <div className="space-y-4">
            <div className="relative overflow-hidden rounded-2xl border border-[color:var(--cs-stroke)] bg-[linear-gradient(135deg,rgba(12,18,28,0.92),rgba(10,20,32,0.7))] text-white">
              <div className="relative min-h-[320px] pt-[56.25%] sm:min-h-[360px]">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(43,215,255,0.2),transparent_55%)]" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_70%,rgba(255,179,71,0.2),transparent_60%)]" />
                <div className="absolute inset-0 flex flex-col justify-between p-4">
                  <div className="flex items-center justify-between text-xs uppercase tracking-[0.3em] text-white/70">
                    <span className="flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-[color:var(--cs-accent)] animate-pulse" />
                      Live · 16:9
                    </span>
                    <span className="rounded-full border border-white/30 px-2 py-1 text-[10px]">
                      Coach Maya
                    </span>
                  </div>
                  <div className="flex items-end justify-between">
                    <div>
                      <p className="text-2xl font-semibold">AI Helper Demo</p>
                      <p className="text-xs text-white/70">
                        HD feed · 1280×720
                      </p>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <span className="rounded-full bg-white/10 px-3 py-1 text-[10px] uppercase tracking-[0.2em]">
                        Screen share on
                      </span>
                      <span className="rounded-full bg-white/10 px-3 py-1 text-[10px] uppercase tracking-[0.2em]">
                        Mic live
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex gap-2">
                      {["Zoey", "Liam", "Tara"].map((name) => (
                        <div
                          key={name}
                          className="flex h-12 w-16 items-end justify-start rounded-lg border border-white/20 bg-white/10 px-2 pb-1 text-[10px] uppercase tracking-[0.2em]"
                        >
                          {name}
                        </div>
                      ))}
                    </div>
                    <div className="text-[10px] uppercase tracking-[0.22em] text-white/70">
                      14 learners · 1 mentor
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              <div className="rounded-2xl border border-[color:var(--cs-stroke)] bg-[color:var(--cs-paper-strong)] p-4">
                <p className="text-xs uppercase tracking-[0.26em] text-[color:var(--cs-ink-muted)]">
                  Shared screen
                </p>
                <p className="mt-2 text-base font-semibold text-[color:var(--cs-ink)]">
                  Prompt builder live
                </p>
                <p className="text-xs text-[color:var(--cs-ink-muted)]">
                  Live preview · automation flow
                </p>
              </div>
              <div className="rounded-2xl border border-[color:var(--cs-stroke)] bg-[color:var(--cs-paper-strong)] p-4">
                <p className="text-xs uppercase tracking-[0.26em] text-[color:var(--cs-ink-muted)]">
                  Learners in session
                </p>
                <p className="mt-2 text-base font-semibold text-[color:var(--cs-ink)]">
                  14 learners active
                </p>
                <p className="text-xs text-[color:var(--cs-ink-muted)]">
                  Chat + reactions on
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-4 rounded-2xl border border-[color:var(--cs-stroke)] bg-white/90 p-4">
            <div className="flex items-center justify-between">
              <p className="text-xs uppercase tracking-[0.26em] text-[color:var(--cs-ink-muted)]">
                Live chat
              </p>
              <span className="rounded-full border border-[color:var(--cs-stroke)] bg-[color:var(--cs-paper)] px-2 py-1 text-[10px] uppercase tracking-[0.22em] text-[color:var(--cs-ink-muted)]">
                Mentors only
              </span>
            </div>

            <div className="space-y-3">
              {chatMessages.map((message) => (
                <div
                  key={message.time}
                  className="rounded-xl border border-[color:var(--cs-stroke)] bg-[color:var(--cs-paper-strong)] p-3"
                >
                  <div className="flex items-center justify-between text-[10px] uppercase tracking-[0.24em] text-[color:var(--cs-ink-muted)]">
                    <span>{message.author}</span>
                    <span>{message.time}</span>
                  </div>
                  <p className="mt-2 text-xs text-[color:var(--cs-ink)]">
                    {message.message}
                  </p>
                  <p className="mt-2 text-[10px] text-[color:var(--cs-ink-muted)]">
                    {message.role}
                  </p>
                </div>
              ))}
            </div>

            <Link
              className="mt-auto rounded-full bg-[color:var(--cs-ink)] px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-white"
              href="/workspace?note=1"
            >
              Send mentor note
            </Link>
          </div>
        </div>

        <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {sessionParticipants.map((participant) => (
            <div
              key={participant.name}
              className="flex items-center justify-between rounded-2xl border border-[color:var(--cs-stroke)] bg-[color:var(--cs-paper-strong)] px-4 py-3"
            >
              <div>
                <p className="text-sm font-semibold text-[color:var(--cs-ink)]">
                  {participant.name}
                </p>
                <p className="text-xs text-[color:var(--cs-ink-muted)]">
                  {participant.status}
                </p>
              </div>
              <span className="h-2 w-2 rounded-full bg-[color:var(--cs-accent)]" />
            </div>
          ))}
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="glass-panel rounded-[28px] border border-[color:var(--cs-stroke)] p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-display text-2xl font-semibold text-[color:var(--cs-ink)]">
                Interaction layer
              </h2>
              <p className="text-sm text-[color:var(--cs-ink-muted)]">
                Action dialogs, overlays, and real-time prompts.
              </p>
            </div>
            <span className="rounded-full border border-[color:var(--cs-stroke)] bg-[color:var(--cs-paper)] px-3 py-1 text-xs uppercase tracking-[0.25em] text-[color:var(--cs-ink-muted)]">
              Live UI
            </span>
          </div>

          <div className="mt-5 grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
            <div className="relative overflow-hidden rounded-2xl border border-[color:var(--cs-stroke)] bg-[color:var(--cs-paper-strong)] p-5">
              <div className="absolute inset-0 bg-[rgba(11,15,20,0.08)]" />
              <div className="relative z-10 space-y-4">
                <div className="glass-panel animate-pop rounded-2xl border border-[color:var(--cs-stroke)] p-4">
                  <p className="text-xs uppercase tracking-[0.24em] text-[color:var(--cs-ink-muted)]">
                    Invite mentor
                  </p>
                  <p className="mt-2 text-base font-semibold text-[color:var(--cs-ink)]">
                    Add a coach to the live session
                  </p>
                  <div className="mt-3 grid gap-2 text-xs text-[color:var(--cs-ink-muted)]">
                    <div className="rounded-full border border-[color:var(--cs-stroke)] bg-white/80 px-3 py-1">
                      maya@summon-skill.com
                    </div>
                    <div className="rounded-full border border-[color:var(--cs-stroke)] bg-white/80 px-3 py-1">
                      Role · Lead mentor
                    </div>
                  </div>
                  <div className="mt-4 flex gap-2">
                    <Link
                      className="rounded-full border border-[color:var(--cs-stroke)] bg-white/80 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-[color:var(--cs-ink-muted)]"
                      href="/workspace"
                    >
                      Cancel
                    </Link>
                    <Link
                      className="rounded-full bg-[color:var(--cs-ink)] px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-white"
                      href="/mentors?invite=1"
                    >
                      Send invite
                    </Link>
                  </div>
                </div>

                <div
                  className="glass-panel animate-pop rounded-2xl border border-[color:var(--cs-stroke)] p-4"
                  style={{ animationDelay: "120ms" }}
                >
                  <p className="text-xs uppercase tracking-[0.24em] text-[color:var(--cs-ink-muted)]">
                    Session recap
                  </p>
                  <p className="mt-2 text-base font-semibold text-[color:var(--cs-ink)]">
                    AI Helper Build · Week 2
                  </p>
                  <p className="mt-2 text-xs text-[color:var(--cs-ink-muted)]">
                    14 learners · 3 highlights · 2 follow-ups
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {[
                      {
                        label: "Share with families",
                        href: "/reports?share=1",
                      },
                      { label: "Export notes", href: "/reports?export=1" },
                      { label: "Save summary", href: "/reports?save=1" },
                    ].map((action) => (
                      <Link
                        key={action.label}
                        className="rounded-full border border-[color:var(--cs-stroke)] bg-white/80 px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-[color:var(--cs-ink-muted)]"
                        href={action.href}
                      >
                        {action.label}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="glass-panel animate-slide rounded-2xl border border-[color:var(--cs-stroke)] p-4">
                <p className="text-xs uppercase tracking-[0.24em] text-[color:var(--cs-ink-muted)]">
                  Command palette
                </p>
                <div className="mt-3 rounded-full border border-[color:var(--cs-stroke)] bg-white/80 px-3 py-2 text-xs text-[color:var(--cs-ink-muted)]">
                  Search mentors, lessons, or prompts
                </div>
                <div className="mt-3 space-y-2">
                  {[
                    { label: "Launch live session", href: "/sessions?start=1" },
                    {
                      label: "Assign automation challenge",
                      href: "/challenges?auto=1",
                    },
                    {
                      label: "Open safety checklist",
                      href: "/reports?safety=1",
                    },
                  ].map((item) => (
                    <Link
                      key={item.label}
                      className="flex items-center justify-between rounded-2xl border border-[color:var(--cs-stroke)] bg-[color:var(--cs-paper-strong)] px-3 py-2 text-xs font-semibold text-[color:var(--cs-ink)]"
                      href={item.href}
                    >
                      {item.label}
                      <span className="text-[10px] uppercase tracking-[0.2em] text-[color:var(--cs-ink-muted)]">
                        Enter
                      </span>
                    </Link>
                  ))}
                </div>
              </div>

              <div className="glass-panel rounded-2xl border border-[color:var(--cs-stroke)] p-4">
                <div className="flex items-center justify-between">
                  <p className="text-xs uppercase tracking-[0.24em] text-[color:var(--cs-ink-muted)]">
                    Live toasts
                  </p>
                  <span className="animate-glow rounded-full bg-[color:var(--cs-accent)] px-2 py-1 text-[10px] uppercase tracking-[0.2em] text-white">
                    Active
                  </span>
                </div>
                <div className="mt-4 space-y-2">
                  {[
                    "Zoey submitted a prompt",
                    "Coach Maya started screen share",
                    "Reminder sent to parents",
                  ].map((toast, index) => (
                    <div
                      key={toast}
                      className="animate-slide rounded-2xl border border-[color:var(--cs-stroke)] bg-[color:var(--cs-paper-strong)] px-3 py-2 text-xs font-semibold text-[color:var(--cs-ink)]"
                      style={{ animationDelay: `${index * 120}ms` }}
                    >
                      {toast}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="glass-panel rounded-[28px] border border-[color:var(--cs-stroke)] p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-display text-2xl font-semibold text-[color:var(--cs-ink)]">
                Floating controls
              </h2>
              <p className="text-sm text-[color:var(--cs-ink-muted)]">
                Quick access tools for mentors mid-session.
              </p>
            </div>
            <span className="rounded-full bg-[rgba(255,179,71,0.2)] px-3 py-1 text-xs font-semibold text-[color:var(--cs-ink)]">
              Ready
            </span>
          </div>

          <div className="mt-5 grid gap-3">
            {[
              { label: "Open timer", href: "/sessions?timer=1" },
              { label: "Launch quiz", href: "/sessions?quiz=1" },
              { label: "Send encouragement", href: "/students?cheer=1" },
              { label: "Pin student question", href: "/workspace?pin=1" },
            ].map((tool) => (
              <Link
                key={tool.label}
                className="flex items-center justify-between rounded-2xl border border-[color:var(--cs-stroke)] bg-[color:var(--cs-paper-strong)] px-4 py-3"
                href={tool.href}
              >
                <p className="text-sm font-semibold text-[color:var(--cs-ink)]">
                  {tool.label}
                </p>
                <span className="text-[10px] uppercase tracking-[0.2em] text-[color:var(--cs-ink-muted)]">
                  Tap
                </span>
              </Link>
            ))}
          </div>

          <div className="mt-6 rounded-2xl border border-[color:var(--cs-stroke)] bg-[color:var(--cs-paper-strong)] p-4">
            <p className="text-xs uppercase tracking-[0.24em] text-[color:var(--cs-ink-muted)]">
              Quick modal preview
            </p>
            <div className="mt-3 rounded-2xl border border-[color:var(--cs-stroke)] bg-white/80 p-3">
              <p className="text-sm font-semibold text-[color:var(--cs-ink)]">
                Broadcast message
              </p>
              <p className="text-xs text-[color:var(--cs-ink-muted)]">
                Send a supportive note to the full cohort.
              </p>
              <div className="mt-3 flex gap-2">
                <Link
                  className="rounded-full border border-[color:var(--cs-stroke)] bg-white/80 px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-[color:var(--cs-ink-muted)]"
                  href="/workspace?preview=1"
                >
                  Preview
                </Link>
                <Link
                  className="rounded-full bg-[color:var(--cs-ink)] px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-white"
                  href="/workspace?broadcast=1"
                >
                  Send
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="grid gap-8 xl:grid-cols-[1.1fr_0.9fr]">
        <section className="glass-panel rounded-[28px] border border-[color:var(--cs-stroke)] p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-display text-2xl font-semibold text-[color:var(--cs-ink)]">
                Challenges for learners
              </h2>
              <p className="text-sm text-[color:var(--cs-ink-muted)]">
                Short, playful builds that teach the core ideas.
              </p>
            </div>
            <span className="rounded-full border border-[color:var(--cs-stroke)] bg-[color:var(--cs-paper)] px-3 py-1 text-xs uppercase tracking-[0.25em] text-[color:var(--cs-ink-muted)]">
              Mentor lab
            </span>
          </div>

          <div className="mt-5 divide-y divide-[color:var(--cs-stroke)]">
            {challenges.map((challenge) => (
              <div key={challenge.title} className="py-4 first:pt-0 last:pb-0">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <h3 className="text-lg font-semibold text-[color:var(--cs-ink)]">
                      {challenge.title}
                    </h3>
                    <p className="text-sm text-[color:var(--cs-ink-muted)]">
                      {challenge.track}
                    </p>
                  </div>
                  <span className="rounded-full bg-[rgba(43,215,255,0.16)] px-3 py-1 text-xs font-semibold text-[color:var(--cs-ink)]">
                    {challenge.due}
                  </span>
                </div>
                <div className="mt-3 flex items-center gap-3">
                  <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-[rgba(31,58,95,0.08)]">
                    <div
                      className="h-full rounded-full bg-[color:var(--cs-accent)]"
                      style={{ width: `${challenge.progress}%` }}
                    />
                  </div>
                  <span className="text-xs text-[color:var(--cs-ink-muted)]">
                    {challenge.progress}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="glass-panel rounded-[28px] border border-[color:var(--cs-stroke)] p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-display text-2xl font-semibold text-[color:var(--cs-ink)]">
                Mentor focus
              </h2>
              <p className="text-sm text-[color:var(--cs-ink-muted)]">
                What you are building for the next cohort.
              </p>
            </div>
            <span className="text-xs uppercase tracking-[0.24em] text-[color:var(--cs-ink-muted)]">
              Today
            </span>
          </div>

          <div className="mt-5 divide-y divide-[color:var(--cs-stroke)]">
            {workItems.map((item) => (
              <div
                key={item.title}
                className="flex flex-wrap items-center justify-between gap-3 py-4 first:pt-0 last:pb-0"
              >
                <div>
                  <p className="text-base font-semibold text-[color:var(--cs-ink)]">
                    {item.title}
                  </p>
                  <p className="text-sm text-[color:var(--cs-ink-muted)]">
                    {item.status}
                  </p>
                </div>
                <span className="rounded-full border border-[color:var(--cs-stroke)] bg-white/80 px-3 py-1 text-xs uppercase tracking-[0.2em] text-[color:var(--cs-ink-muted)]">
                  {item.tag}
                </span>
              </div>
            ))}
          </div>
        </section>
      </div>

      <section className="grid gap-8 xl:grid-cols-[1fr_1fr]">
        <div className="glass-panel rounded-[28px] border border-[color:var(--cs-stroke)] p-6">
          <h2 className="font-display text-2xl font-semibold text-[color:var(--cs-ink)]">
            Mentor notes
          </h2>
          <p className="text-sm text-[color:var(--cs-ink-muted)]">
            Keep guidance visible for every learning moment.
          </p>

          <div className="mt-5 divide-y divide-[color:var(--cs-stroke)]">
            {mentorNotes.map((note) => (
              <div key={note.author} className="py-4 first:pt-0 last:pb-0">
                <div className="flex items-center justify-between text-xs uppercase tracking-[0.2em] text-[color:var(--cs-ink-muted)]">
                  <span>{note.author}</span>
                  <span>{note.time}</span>
                </div>
                <p className="mt-2 text-sm text-[color:var(--cs-ink)]">
                  {note.note}
                </p>
                <p className="mt-3 text-xs text-[color:var(--cs-ink-muted)]">
                  {note.role}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-8">
          <div className="glass-panel rounded-[28px] border border-[color:var(--cs-stroke)] p-6">
            <h2 className="font-display text-2xl font-semibold text-[color:var(--cs-ink)]">
              Teaching kit
            </h2>
            <p className="text-sm text-[color:var(--cs-ink-muted)]">
              Grab a guide, lesson, or beginner-friendly prompt pack.
            </p>

            <div className="mt-5 divide-y divide-[color:var(--cs-stroke)]">
              {resources.map((resource) => (
                <div
                  key={resource.title}
                  className="flex flex-wrap items-center justify-between gap-3 py-3 first:pt-0 last:pb-0"
                >
                  <div>
                    <p className="text-sm font-semibold text-[color:var(--cs-ink)]">
                      {resource.title}
                    </p>
                    <p className="text-xs text-[color:var(--cs-ink-muted)]">
                      {resource.detail}
                    </p>
                  </div>
                  <span className="rounded-full bg-[rgba(255,179,71,0.16)] px-3 py-1 text-xs font-semibold text-[color:var(--cs-ink)]">
                    {resource.type}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="glass-panel rounded-[28px] border border-[color:var(--cs-stroke)] p-6">
            <h2 className="font-display text-2xl font-semibold text-[color:var(--cs-ink)]">
              Live mentorship
            </h2>
            <p className="text-sm text-[color:var(--cs-ink-muted)]">
              See who is teaching, learning, and pairing right now.
            </p>

            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              {collaborators.map((collaborator, index) => (
                <div
                  key={collaborator.name}
                  className="flex items-center gap-3 rounded-2xl border border-[color:var(--cs-stroke)] bg-[color:var(--cs-paper-strong)] p-3"
                >
                  <div
                    className="flex h-10 w-10 items-center justify-center rounded-full text-sm font-semibold text-[color:var(--cs-ink)]"
                    style={{
                      backgroundColor:
                        index % 2 === 0
                          ? "rgba(43, 215, 255, 0.22)"
                          : "rgba(255, 179, 71, 0.22)",
                    }}
                  >
                    {collaborator.name.slice(0, 1)}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-[color:var(--cs-ink)]">
                      {collaborator.name}
                    </p>
                    <p className="text-xs text-[color:var(--cs-ink-muted)]">
                      {collaborator.role} · {collaborator.status}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
