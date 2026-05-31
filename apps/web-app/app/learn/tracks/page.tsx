import Link from "next/link";

interface TrackCard {
  title: string;
  summary: string;
  href: string;
  tags: string[];
}

const tracks: TrackCard[] = [
  {
    title: "Language learning",
    summary:
      "Build a repeatable routine for any language you want to practice.",
    href: "/learn/language-learning",
    tags: ["Routine", "Speaking", "Vocabulary"],
  },
  {
    title: "Career exploration",
    summary:
      "Use the Career Explorer to understand roles and try starter projects.",
    href: "/learn/careers",
    tags: ["Research", "Skills", "Projects"],
  },
  {
    title: "AI fundamentals",
    summary: "Learn prompts, evaluation, and safety through small experiments.",
    href: "/learn/challenges",
    tags: ["Prompting", "Evaluation", "Safety"],
  },
  {
    title: "Automation basics",
    summary: "Practice turning repeatable tasks into simple workflows.",
    href: "/learn/challenges",
    tags: ["Workflows", "Systems", "Tools"],
  },
  {
    title: "Creative builds",
    summary:
      "Make something expressive (stories, art, games) with structured prompts.",
    href: "/learn/challenges",
    tags: ["Creativity", "Iteration", "Showcase"],
  },
  {
    title: "Live coaching",
    summary: "Join a live room when you want real-time help.",
    href: "/learn/live",
    tags: ["Mentoring", "Feedback", "Community"],
  },
];

export default function TracksPage() {
  return (
    <div className="space-y-8">
      <header className="glass-panel rounded-[32px] border border-[color:var(--cs-stroke)] p-6">
        <p className="text-xs uppercase tracking-[0.32em] text-[color:var(--cs-ink-muted)]">
          Tracks
        </p>
        <h1 className="font-display text-3xl font-semibold text-[color:var(--cs-ink)]">
          Choose what you want to learn next
        </h1>
        <p className="mt-2 max-w-2xl text-sm text-[color:var(--cs-ink-muted)]">
          Tracks are lightweight learning paths. Pick one, practice for a week,
          then switch whenever you want.
        </p>
        <div className="mt-5 flex flex-wrap gap-2">
          <Link
            className="rounded-full bg-[color:var(--cs-ink)] px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-white"
            href="/learn"
          >
            Back to dashboard
          </Link>
          <Link
            className="rounded-full border border-[color:var(--cs-stroke)] bg-white/80 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-[color:var(--cs-ink-muted)]"
            href="/learn/progress"
          >
            Track progress
          </Link>
        </div>
      </header>

      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {tracks.map((track) => (
          <Link
            key={track.title}
            className="glass-panel rounded-[28px] border border-[color:var(--cs-stroke)] p-6 transition hover:-translate-y-0.5"
            href={track.href}
          >
            <h2 className="font-display text-2xl font-semibold text-[color:var(--cs-ink)]">
              {track.title}
            </h2>
            <p className="mt-2 text-sm text-[color:var(--cs-ink-muted)]">
              {track.summary}
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              {track.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-[rgba(43,215,255,0.16)] px-3 py-1 text-xs font-semibold text-[color:var(--cs-ink)]"
                >
                  {tag}
                </span>
              ))}
            </div>
          </Link>
        ))}
      </section>

      <section className="glass-panel rounded-[28px] border border-[color:var(--cs-stroke)] p-6">
        <h2 className="font-display text-2xl font-semibold text-[color:var(--cs-ink)]">
          A simple weekly loop
        </h2>
        <p className="text-sm text-[color:var(--cs-ink-muted)]">
          Tracks work best when you keep the loop short.
        </p>
        <ol className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {[
            {
              title: "Pick",
              detail: "Choose one track and define a small, real goal.",
            },
            {
              title: "Practice",
              detail: "Do 10–20 minutes a day. Keep notes on what’s confusing.",
            },
            {
              title: "Build",
              detail:
                "Make a small artifact: a summary, a demo, or a mini project.",
            },
            {
              title: "Reflect",
              detail: "Decide what to repeat next week or what to switch.",
            },
          ].map((step) => (
            <li
              key={step.title}
              className="rounded-2xl border border-[color:var(--cs-stroke)] bg-[color:var(--cs-paper-strong)] p-4"
            >
              <p className="text-xs uppercase tracking-[0.26em] text-[color:var(--cs-ink-muted)]">
                {step.title}
              </p>
              <p className="mt-2 text-sm font-semibold text-[color:var(--cs-ink)]">
                {step.detail}
              </p>
            </li>
          ))}
        </ol>
      </section>
    </div>
  );
}
