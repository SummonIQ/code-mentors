import Link from "next/link";

import { LiveRoom } from "@/components/live-room";

const roomChecklist = [
  {
    title: "Confirm video + audio",
    detail: "Ask learners to do a 10-second mic check before starting.",
  },
  {
    title: "Set a focus goal",
    detail: "One sentence: what will learners build by the end of class?",
  },
  {
    title: "Prepare a safety-first prompt",
    detail: "Use examples and constraints so outputs stay appropriate.",
  },
  {
    title: "Leave time to share",
    detail: "Reserve 5 minutes for learners to demo their work.",
  },
];

const sessionToolkit = [
  {
    label: "Start focus block",
    description: "Launch a 10-minute build sprint.",
    href: "/sessions?timer=1",
  },
  {
    label: "Launch quick quiz",
    description: "Send a check-in to the cohort.",
    href: "/sessions?quiz=1",
  },
  {
    label: "Send mentor note",
    description: "Pin a guiding tip for the room.",
    href: "/workspace?note=1",
  },
  {
    label: "Open safety checklist",
    description: "Review guardrails before next prompt.",
    href: "/reports?safety=1",
  },
];

export default function LiveRoomPage({
  params,
}: {
  params: {
    roomId: string;
  };
}) {
  const roomLabel = params.roomId.replace(/[-_]/g, " ");

  return (
    <div className="space-y-8">
      <header className="glass-panel rounded-[32px] border border-[color:var(--cs-stroke)] p-6">
        <p className="text-xs uppercase tracking-[0.32em] text-[color:var(--cs-ink-muted)]">
          Live session
        </p>
        <h1 className="font-display text-3xl font-semibold text-[color:var(--cs-ink)]">
          Room {roomLabel}
        </h1>
        <p className="mt-2 text-sm text-[color:var(--cs-ink-muted)]">
          Webcam, chat, and customizable screen sharing.
        </p>
        <div className="mt-5 flex flex-wrap gap-2">
          <Link
            className="rounded-full border border-[color:var(--cs-stroke)] bg-white/80 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-[color:var(--cs-ink-muted)]"
            href="/sessions"
          >
            Back to sessions
          </Link>
          <Link
            className="rounded-full bg-[color:var(--cs-ink)] px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-white"
            href="/workspace"
          >
            Open workspace
          </Link>
        </div>
      </header>

      <section className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <div className="glass-panel rounded-2xl border border-[color:var(--cs-stroke)] p-4">
          <p className="text-xs uppercase tracking-[0.28em] text-[color:var(--cs-ink-muted)]">
            Status
          </p>
          <p className="mt-2 text-2xl font-semibold text-[color:var(--cs-ink)]">
            Live
          </p>
          <p className="text-xs text-[color:var(--cs-ink-muted)]">
            Room is active
          </p>
        </div>

        <div className="glass-panel rounded-2xl border border-[color:var(--cs-stroke)] p-4">
          <p className="text-xs uppercase tracking-[0.28em] text-[color:var(--cs-ink-muted)]">
            Cohort
          </p>
          <p className="mt-2 text-2xl font-semibold text-[color:var(--cs-ink)]">
            14
          </p>
          <p className="text-xs text-[color:var(--cs-ink-muted)]">
            Learners expected
          </p>
        </div>

        <div className="glass-panel rounded-2xl border border-[color:var(--cs-stroke)] p-4">
          <p className="text-xs uppercase tracking-[0.28em] text-[color:var(--cs-ink-muted)]">
            Mentor tools
          </p>
          <p className="mt-2 text-2xl font-semibold text-[color:var(--cs-ink)]">
            {sessionToolkit.length}
          </p>
          <p className="text-xs text-[color:var(--cs-ink-muted)]">
            Shortcuts ready
          </p>
        </div>

        <div className="glass-panel rounded-2xl border border-[color:var(--cs-stroke)] p-4">
          <p className="text-xs uppercase tracking-[0.28em] text-[color:var(--cs-ink-muted)]">
            Checklist
          </p>
          <p className="mt-2 text-2xl font-semibold text-[color:var(--cs-ink)]">
            {roomChecklist.length}
          </p>
          <p className="text-xs text-[color:var(--cs-ink-muted)]">
            Quick readiness
          </p>
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-[1.3fr_0.7fr]">
        <div className="space-y-6">
          <div className="glass-panel rounded-[28px] border border-[color:var(--cs-stroke)] p-6">
            <h2 className="font-display text-2xl font-semibold text-[color:var(--cs-ink)]">
              Live room
            </h2>
            <p className="text-sm text-[color:var(--cs-ink-muted)]">
              Use the tools below for video, chat, and screen share.
            </p>
            <div className="mt-5">
              <LiveRoom exitHref="/sessions" roomId={params.roomId} />
            </div>
          </div>

          <div className="glass-panel rounded-[28px] border border-[color:var(--cs-stroke)] p-6">
            <h2 className="font-display text-2xl font-semibold text-[color:var(--cs-ink)]">
              Session toolkit
            </h2>
            <p className="text-sm text-[color:var(--cs-ink-muted)]">
              Fast actions to keep class moving.
            </p>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              {sessionToolkit.map((tool) => (
                <Link
                  key={tool.label}
                  className="rounded-2xl border border-[color:var(--cs-stroke)] bg-white/80 px-4 py-3"
                  href={tool.href}
                >
                  <p className="text-sm font-semibold text-[color:var(--cs-ink)]">
                    {tool.label}
                  </p>
                  <p className="mt-1 text-xs text-[color:var(--cs-ink-muted)]">
                    {tool.description}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className="glass-panel rounded-[28px] border border-[color:var(--cs-stroke)] p-6">
          <h2 className="font-display text-2xl font-semibold text-[color:var(--cs-ink)]">
            Room readiness
          </h2>
          <p className="text-sm text-[color:var(--cs-ink-muted)]">
            Keep this open while you host.
          </p>
          <div className="mt-5 space-y-3">
            {roomChecklist.map((item) => (
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
