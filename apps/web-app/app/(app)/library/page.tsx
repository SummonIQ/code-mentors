import Link from "next/link";

const libraryItems = [
  {
    title: "AI Storytelling Slides",
    type: "Deck",
    detail: "12 slides",
  },
  {
    title: "Automation Flow Cards",
    type: "Cards",
    detail: "20 cards",
  },
  {
    title: "Safety-first Prompt Checklist",
    type: "Checklist",
    detail: "Printable",
  },
  {
    title: "Mentor Reflection Prompts",
    type: "Guide",
    detail: "8 prompts",
  },
];

const collections = [
  "AI basics",
  "Automation lab",
  "Creative coding",
  "Parent updates",
];

const recentActivity = [
  {
    title: "Prompt checklist used in live session",
    detail: "Week 2 · 14 learners",
    time: "Today",
  },
  {
    title: "Automation cards shared with mentors",
    detail: "Mentor circle · 6 coaches",
    time: "Yesterday",
  },
  {
    title: "Storytelling slides updated",
    detail: "Added 2 new examples",
    time: "Mon",
  },
];

const libraryShortcuts = [
  {
    label: "Open challenge library",
    description: "See published challenges learners can browse.",
    href: "/challenge-library",
  },
  {
    label: "Draft a new challenge",
    description: "Start a build and attach supporting resources.",
    href: "/challenges?new=1",
  },
  {
    label: "Plan a curriculum unit",
    description: "Turn resources into a weekly lesson arc.",
    href: "/curriculum?new=1",
  },
  {
    label: "Review reports",
    description: "Use insights to decide what to build next.",
    href: "/reports",
  },
];

export default function LibraryPage({
  searchParams,
}: {
  searchParams?: { upload?: string };
}) {
  const modal = searchParams?.upload
    ? {
        title: "Upload asset",
        description: "Add a new teaching resource to the library.",
        primary: "Upload",
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
                href="/library"
              >
                Close
              </Link>
              <Link
                className="rounded-full bg-[color:var(--cs-ink)] px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-white"
                href="/library"
              >
                {modal.primary}
              </Link>
            </div>
          </div>
        </div>
      ) : null}
      <header className="glass-panel rounded-[32px] border border-[color:var(--cs-stroke)] p-6">
        <p className="text-xs uppercase tracking-[0.32em] text-[color:var(--cs-ink-muted)]">
          Resource library
        </p>
        <h1 className="font-display text-3xl font-semibold text-[color:var(--cs-ink)]">
          Teaching resources
        </h1>
        <p className="mt-2 text-sm text-[color:var(--cs-ink-muted)]">
          Reusable assets that make every lesson smoother.
        </p>
      </header>

      <section className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <div className="glass-panel rounded-2xl border border-[color:var(--cs-stroke)] p-4">
          <p className="text-xs uppercase tracking-[0.28em] text-[color:var(--cs-ink-muted)]">
            Assets
          </p>
          <p className="mt-2 text-2xl font-semibold text-[color:var(--cs-ink)]">
            {libraryItems.length}
          </p>
          <p className="text-xs text-[color:var(--cs-ink-muted)]">
            Featured items
          </p>
        </div>

        <div className="glass-panel rounded-2xl border border-[color:var(--cs-stroke)] p-4">
          <p className="text-xs uppercase tracking-[0.28em] text-[color:var(--cs-ink-muted)]">
            Collections
          </p>
          <p className="mt-2 text-2xl font-semibold text-[color:var(--cs-ink)]">
            {collections.length}
          </p>
          <p className="text-xs text-[color:var(--cs-ink-muted)]">
            Organized tracks
          </p>
        </div>

        <div className="glass-panel rounded-2xl border border-[color:var(--cs-stroke)] p-4">
          <p className="text-xs uppercase tracking-[0.28em] text-[color:var(--cs-ink-muted)]">
            Recent activity
          </p>
          <p className="mt-2 text-2xl font-semibold text-[color:var(--cs-ink)]">
            {recentActivity.length}
          </p>
          <p className="text-xs text-[color:var(--cs-ink-muted)]">
            Last 3 updates
          </p>
        </div>

        <div className="glass-panel rounded-2xl border border-[color:var(--cs-stroke)] p-4">
          <p className="text-xs uppercase tracking-[0.28em] text-[color:var(--cs-ink-muted)]">
            Suggested next
          </p>
          <p className="mt-2 text-2xl font-semibold text-[color:var(--cs-ink)]">
            {libraryShortcuts.length}
          </p>
          <p className="text-xs text-[color:var(--cs-ink-muted)]">
            Mentor actions
          </p>
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="glass-panel rounded-[28px] border border-[color:var(--cs-stroke)] p-6">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-2xl font-semibold text-[color:var(--cs-ink)]">
              Featured assets
            </h2>
            <Link
              className="rounded-full bg-[color:var(--cs-ink)] px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-white"
              href="/library?upload=1"
            >
              Upload asset
            </Link>
          </div>
          <div className="mt-5 divide-y divide-[color:var(--cs-stroke)]">
            {libraryItems.map((item) => (
              <div key={item.title} className="py-4 first:pt-0 last:pb-0">
                <div className="flex items-center justify-between">
                  <p className="text-base font-semibold text-[color:var(--cs-ink)]">
                    {item.title}
                  </p>
                  <span className="rounded-full bg-[rgba(255,179,71,0.16)] px-3 py-1 text-xs font-semibold text-[color:var(--cs-ink)]">
                    {item.type}
                  </span>
                </div>
                <p className="text-sm text-[color:var(--cs-ink-muted)]">
                  {item.detail}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="glass-panel rounded-[28px] border border-[color:var(--cs-stroke)] p-6">
          <h2 className="font-display text-2xl font-semibold text-[color:var(--cs-ink)]">
            Collections
          </h2>
          <p className="text-sm text-[color:var(--cs-ink-muted)]">
            Organize assets by learning track.
          </p>
          <div className="mt-5 space-y-3">
            {collections.map((collection) => (
              <div
                key={collection}
                className="rounded-2xl border border-[color:var(--cs-stroke)] bg-[color:var(--cs-paper-strong)] px-4 py-3"
              >
                <p className="text-sm font-semibold text-[color:var(--cs-ink)]">
                  {collection}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="glass-panel rounded-[28px] border border-[color:var(--cs-stroke)] p-6">
          <h2 className="font-display text-2xl font-semibold text-[color:var(--cs-ink)]">
            Recent activity
          </h2>
          <p className="text-sm text-[color:var(--cs-ink-muted)]">
            What mentors are using most often.
          </p>
          <div className="mt-5 divide-y divide-[color:var(--cs-stroke)]">
            {recentActivity.map((item) => (
              <div key={item.title} className="py-4 first:pt-0 last:pb-0">
                <div className="flex items-center justify-between gap-3">
                  <p className="text-base font-semibold text-[color:var(--cs-ink)]">
                    {item.title}
                  </p>
                  <span className="rounded-full border border-[color:var(--cs-stroke)] bg-white/80 px-3 py-1 text-xs uppercase tracking-[0.2em] text-[color:var(--cs-ink-muted)]">
                    {item.time}
                  </span>
                </div>
                <p className="mt-2 text-sm text-[color:var(--cs-ink-muted)]">
                  {item.detail}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="glass-panel rounded-[28px] border border-[color:var(--cs-stroke)] p-6">
          <h2 className="font-display text-2xl font-semibold text-[color:var(--cs-ink)]">
            Suggested next
          </h2>
          <p className="text-sm text-[color:var(--cs-ink-muted)]">
            Connect resources to challenges and reporting.
          </p>
          <div className="mt-5 space-y-3">
            {libraryShortcuts.map((shortcut) => (
              <Link
                key={shortcut.label}
                className="block rounded-2xl border border-[color:var(--cs-stroke)] bg-white/80 px-4 py-3"
                href={shortcut.href}
              >
                <p className="text-sm font-semibold text-[color:var(--cs-ink)]">
                  {shortcut.label}
                </p>
                <p className="mt-1 text-xs text-[color:var(--cs-ink-muted)]">
                  {shortcut.description}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
