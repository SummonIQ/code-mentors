const metrics = [
  { label: "Active learners", value: "84", trend: "+12 this month" },
  { label: "Live sessions", value: "6", trend: "3 today" },
  { label: "Projects shipped", value: "128", trend: "+18 this week" },
  { label: "Mentor hours", value: "42h", trend: "Next goal 50h" },
];

const upcomingSessions = [
  {
    title: "AI Helper Build",
    time: "Today · 3:30 PM",
    cohort: "All levels",
  },
  {
    title: "Automation for Homework",
    time: "Tomorrow · 4:00 PM",
    cohort: "All levels",
  },
  {
    title: "Creative Coding Lab",
    time: "Saturday · 10:00 AM",
    cohort: "All levels",
  },
];

const focusAreas = [
  {
    title: "Prompt building",
    detail: "Learners can explain how inputs shape outputs.",
    progress: 72,
  },
  {
    title: "Automation logic",
    detail: "Students can diagram workflow steps.",
    progress: 58,
  },
  {
    title: "Ethical AI",
    detail: "Learners can spot biased outputs.",
    progress: 41,
  },
];

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <header className="glass-panel rounded-[32px] border border-[color:var(--cs-stroke)] p-6">
        <p className="text-xs uppercase tracking-[0.32em] text-[color:var(--cs-ink-muted)]">
          Dashboard
        </p>
        <h1 className="font-display text-3xl font-semibold text-[color:var(--cs-ink)]">
          Mentorship pulse
        </h1>
        <p className="mt-2 text-sm text-[color:var(--cs-ink-muted)]">
          Track cohort momentum, progress, and what learners are building this
          week.
        </p>
      </header>

      <section className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {metrics.map((metric) => (
          <div
            key={metric.label}
            className="glass-panel rounded-2xl border border-[color:var(--cs-stroke)] p-4"
          >
            <p className="text-xs uppercase tracking-[0.28em] text-[color:var(--cs-ink-muted)]">
              {metric.label}
            </p>
            <p className="mt-2 text-2xl font-semibold text-[color:var(--cs-ink)]">
              {metric.value}
            </p>
            <p className="text-xs text-[color:var(--cs-ink-muted)]">
              {metric.trend}
            </p>
          </div>
        ))}
      </section>

      <section className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="glass-panel rounded-[28px] border border-[color:var(--cs-stroke)] p-6">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-2xl font-semibold text-[color:var(--cs-ink)]">
              Upcoming live sessions
            </h2>
            <span className="rounded-full border border-[color:var(--cs-stroke)] bg-white/80 px-3 py-1 text-xs uppercase tracking-[0.2em] text-[color:var(--cs-ink-muted)]">
              Schedule
            </span>
          </div>
          <div className="mt-5 divide-y divide-[color:var(--cs-stroke)]">
            {upcomingSessions.map((session) => (
              <div key={session.title} className="py-4 first:pt-0 last:pb-0">
                <p className="text-base font-semibold text-[color:var(--cs-ink)]">
                  {session.title}
                </p>
                <p className="text-sm text-[color:var(--cs-ink-muted)]">
                  {session.time}
                </p>
                <p className="text-xs uppercase tracking-[0.2em] text-[color:var(--cs-ink-muted)]">
                  {session.cohort}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="glass-panel rounded-[28px] border border-[color:var(--cs-stroke)] p-6">
          <h2 className="font-display text-2xl font-semibold text-[color:var(--cs-ink)]">
            Learning focus map
          </h2>
          <p className="text-sm text-[color:var(--cs-ink-muted)]">
            Where the cohort is growing this week.
          </p>
          <div className="mt-5 space-y-4">
            {focusAreas.map((area) => (
              <div key={area.title}>
                <div className="flex items-center justify-between">
                  <p className="text-sm font-semibold text-[color:var(--cs-ink)]">
                    {area.title}
                  </p>
                  <span className="text-xs text-[color:var(--cs-ink-muted)]">
                    {area.progress}%
                  </span>
                </div>
                <p className="text-xs text-[color:var(--cs-ink-muted)]">
                  {area.detail}
                </p>
                <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-[rgba(31,58,95,0.08)]">
                  <div
                    className="h-full rounded-full bg-[color:var(--cs-accent)]"
                    style={{ width: `${area.progress}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
