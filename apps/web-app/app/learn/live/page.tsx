import Link from "next/link";

const rooms = [
  {
    roomId: "ai-helper-build",
    title: "AI Helper Build",
    time: "Saturday · 10:00 AM",
    status: "Upcoming",
  },
  {
    roomId: "automation-sprint",
    title: "Automation Sprint",
    time: "Tuesday · 4:00 PM",
    status: "Upcoming",
  },
];

export default function LearnerLivePage() {
  return (
    <div className="space-y-8">
      <header className="glass-panel rounded-[32px] border border-[color:var(--cs-stroke)] p-6">
        <p className="text-xs uppercase tracking-[0.32em] text-[color:var(--cs-ink-muted)]">
          Live
        </p>
        <h1 className="font-display text-3xl font-semibold text-[color:var(--cs-ink)]">
          Join your cohort
        </h1>
        <p className="mt-2 text-sm text-[color:var(--cs-ink-muted)]">
          When class starts, open the room your mentor shares.
        </p>
      </header>

      <section className="glass-panel rounded-[28px] border border-[color:var(--cs-stroke)] p-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2 className="font-display text-2xl font-semibold text-[color:var(--cs-ink)]">
            Rooms
          </h2>
          <Link
            className="rounded-full border border-[color:var(--cs-stroke)] bg-white/80 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-[color:var(--cs-ink-muted)]"
            href="/learn"
          >
            Back to dashboard
          </Link>
        </div>

        <div className="mt-5 divide-y divide-[color:var(--cs-stroke)]">
          {rooms.map((room) => (
            <div key={room.roomId} className="py-4 first:pt-0 last:pb-0">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="text-base font-semibold text-[color:var(--cs-ink)]">
                    {room.title}
                  </p>
                  <p className="text-sm text-[color:var(--cs-ink-muted)]">
                    {room.time}
                  </p>
                </div>
                <span className="rounded-full bg-[rgba(255,179,71,0.16)] px-3 py-1 text-xs font-semibold text-[color:var(--cs-ink)]">
                  {room.status}
                </span>
              </div>
              <div className="mt-3 flex flex-wrap gap-2">
                <Link
                  className="rounded-full bg-[color:var(--cs-ink)] px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-white"
                  href={`/learn/live/${room.roomId}`}
                >
                  Join room
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="glass-panel rounded-[28px] border border-[color:var(--cs-stroke)] p-6">
        <h2 className="font-display text-2xl font-semibold text-[color:var(--cs-ink)]">
          What to do if you get stuck
        </h2>
        <p className="text-sm text-[color:var(--cs-ink-muted)]">
          Ask a question in chat, then explain what you tried.
        </p>
        <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {[
            {
              title: "Show your input",
              detail: "What did you type or click?",
            },
            {
              title: "Show the output",
              detail: "What happened instead?",
            },
            {
              title: "Say your goal",
              detail: "What were you trying to make?",
            },
            {
              title: "Ask for one step",
              detail: "What should you try next?",
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
