import Link from "next/link";

const practiceBlocks = [
  {
    title: "Start with a goal",
    detail:
      "Pick a language, then pick a real goal (introduce yourself, order coffee, write an email).",
  },
  {
    title: "Practice small, daily",
    detail:
      "Ten minutes a day beats one hour once a week. Keep sessions short and repeatable.",
  },
  {
    title: "Use spaced repetition",
    detail: "Review vocabulary on a schedule so you remember it long term.",
  },
  {
    title: "Speak early",
    detail:
      "Even if it’s imperfect, speaking builds confidence and highlights what to learn next.",
  },
];

const learningTracks = [
  {
    title: "Conversation basics",
    focus: "Introductions, questions, common phrases",
  },
  {
    title: "Vocabulary builder",
    focus: "Topics like travel, work, hobbies",
  },
  {
    title: "Reading + writing",
    focus: "Short texts, summaries, simple messages",
  },
  {
    title: "Pronunciation",
    focus: "Sounds, rhythm, and listening practice",
  },
];

export default function LanguageLearningPage() {
  return (
    <div className="space-y-8">
      <header className="glass-panel rounded-[32px] border border-[color:var(--cs-stroke)] p-6">
        <p className="text-xs uppercase tracking-[0.32em] text-[color:var(--cs-ink-muted)]">
          Track
        </p>
        <h1 className="font-display text-3xl font-semibold text-[color:var(--cs-ink)]">
          Language learning
        </h1>
        <p className="mt-2 max-w-2xl text-sm text-[color:var(--cs-ink-muted)]">
          This space is designed for anyone learning a new language. Keep your
          practice small, consistent, and connected to real situations.
        </p>
        <div className="mt-5 flex flex-wrap gap-2">
          <Link
            className="rounded-full bg-[color:var(--cs-ink)] px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-white"
            href="/learn/tracks"
          >
            Back to tracks
          </Link>
          <Link
            className="rounded-full border border-[color:var(--cs-stroke)] bg-white/80 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-[color:var(--cs-ink-muted)]"
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

      <section className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="glass-panel rounded-[28px] border border-[color:var(--cs-stroke)] p-6">
          <h2 className="font-display text-2xl font-semibold text-[color:var(--cs-ink)]">
            A practice plan that works
          </h2>
          <p className="text-sm text-[color:var(--cs-ink-muted)]">
            Use these blocks to create a routine you can repeat.
          </p>
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            {practiceBlocks.map((block) => (
              <div
                key={block.title}
                className="rounded-2xl border border-[color:var(--cs-stroke)] bg-[color:var(--cs-paper-strong)] p-4"
              >
                <p className="text-xs uppercase tracking-[0.26em] text-[color:var(--cs-ink-muted)]">
                  {block.title}
                </p>
                <p className="mt-2 text-sm font-semibold text-[color:var(--cs-ink)]">
                  {block.detail}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="glass-panel rounded-[28px] border border-[color:var(--cs-stroke)] p-6">
          <h2 className="font-display text-2xl font-semibold text-[color:var(--cs-ink)]">
            Pick a track
          </h2>
          <p className="text-sm text-[color:var(--cs-ink-muted)]">
            Choose one track for the week, then rotate.
          </p>
          <div className="mt-5 space-y-3">
            {learningTracks.map((track) => (
              <div
                key={track.title}
                className="rounded-2xl border border-[color:var(--cs-stroke)] bg-white/80 px-4 py-3"
              >
                <p className="text-sm font-semibold text-[color:var(--cs-ink)]">
                  {track.title}
                </p>
                <p className="mt-1 text-xs text-[color:var(--cs-ink-muted)]">
                  {track.focus}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="glass-panel rounded-[28px] border border-[color:var(--cs-stroke)] p-6">
        <h2 className="font-display text-2xl font-semibold text-[color:var(--cs-ink)]">
          Try this 10-minute session
        </h2>
        <p className="text-sm text-[color:var(--cs-ink-muted)]">
          Keep it simple: listen, repeat, write, and use it.
        </p>
        <ol className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {[
            {
              title: "2 min",
              detail: "Listen to a short clip and note 3 phrases.",
            },
            {
              title: "2 min",
              detail: "Repeat the phrases out loud.",
            },
            {
              title: "3 min",
              detail: "Write 3 sentences using the phrases.",
            },
            {
              title: "3 min",
              detail: "Say them naturally (or record yourself).",
            },
          ].map((step) => (
            <li
              key={step.title + step.detail}
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
