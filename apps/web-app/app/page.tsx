import Link from "next/link";
import {
  BookOpen,
  Bot,
  GraduationCap,
  LineChart,
  MessageCircle,
  Rocket,
  ShieldCheck,
  Sparkles,
  Star,
  Users,
  Video,
} from "lucide-react";

const highlights = [
  {
    title: "Mentor-led live sessions",
    description:
      "Learners build in real time with caring mentors guiding each step of the journey.",
    icon: Video,
  },
  {
    title: "AI + automation projects",
    description:
      "Hands-on challenges that explain how AI works and how automation saves time.",
    icon: Bot,
  },
  {
    title: "Safe, structured learning",
    description:
      "Curriculum designed for clear outcomes and supportive pacing.",
    icon: ShieldCheck,
  },
];

const tracks = [
  {
    title: "AI foundations",
    focus: "Understand prompts, models, and ethical AI.",
  },
  {
    title: "Automation builders",
    focus: "Create no-code bots and simple workflows.",
  },
  {
    title: "Creative coding",
    focus: "Build apps, games, and playful prototypes.",
  },
  {
    title: "Launch projects",
    focus: "Ship a capstone with mentor feedback.",
  },
];

const howItWorks = [
  {
    title: "Onboard the cohort",
    description: "Set goals, skill levels, and learning pace in minutes.",
    icon: Users,
  },
  {
    title: "Build together",
    description: "Live mentoring, screen share, and guided prompts.",
    icon: MessageCircle,
  },
  {
    title: "Showcase wins",
    description: "Learners ship projects they can explain with confidence.",
    icon: Rocket,
  },
];

const safetyStack = [
  {
    title: "Safety-first guardrails",
    description:
      "Prompts and outputs are filtered for age-appropriate learning.",
    icon: ShieldCheck,
  },
  {
    title: "Mentor-reviewed content",
    description: "Every lesson is reviewed by experienced educators.",
    icon: GraduationCap,
  },
  {
    title: "Progress transparency",
    description: "Families get weekly summaries and milestones.",
    icon: LineChart,
  },
];

const testimonials = [
  {
    quote:
      "My daughter built her first chatbot and could explain every step to us.",
    name: "Parent, Seattle",
  },
  {
    quote: "Mentors made AI feel fun and safe. Everyone stayed engaged.",
    name: "After-school program lead",
  },
];

const faqs = [
  {
    question: "Is Coder School free?",
    answer:
      "Yes. The workspace is free to use, with no subscription or payment required.",
  },
  {
    question: "What ages are supported?",
    answer:
      "Cohorts are organized by skill level, and the platform is designed to be usable by learners of any age.",
  },
  {
    question: "Do students need coding experience?",
    answer:
      "No. We start with no-code and build toward real code as confidence grows.",
  },
  {
    question: "How are mentors vetted?",
    answer:
      "Mentors are trained educators with experience teaching learners in tech.",
  },
  {
    question: "Can schools use Coder School?",
    answer: "Yes. We offer school and after-school partnerships.",
  },
];

function HeroBackground() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      <div className="absolute inset-0 bg-grid opacity-20" />
      <div className="absolute inset-0 scanlines opacity-30" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.92),transparent_55%)]" />
      <div className="absolute -left-[12%] top-[-22%] h-[520px] w-[520px] rounded-full bg-[conic-gradient(from_180deg,rgba(43,215,255,0.22),rgba(255,179,71,0.18),rgba(31,58,95,0.12),rgba(43,215,255,0.22))] blur-[90px] animate-drift" />
      <div className="absolute left-[28%] top-[-28%] h-[560px] w-[560px] rounded-full bg-[conic-gradient(from_210deg,rgba(255,179,71,0.18),rgba(43,215,255,0.2),rgba(31,58,95,0.12),rgba(255,179,71,0.18))] blur-[100px] animate-drift-slow" />
      <div className="absolute right-[-10%] top-[-8%] h-[620px] w-[620px] rounded-full bg-[conic-gradient(from_140deg,rgba(31,58,95,0.14),rgba(43,215,255,0.2),rgba(255,179,71,0.16),rgba(31,58,95,0.14))] blur-[110px] animate-drift" />
      <div className="absolute left-[6%] bottom-[-30%] h-[640px] w-[640px] rounded-full bg-[conic-gradient(from_90deg,rgba(43,215,255,0.18),rgba(255,179,71,0.12),rgba(31,58,95,0.12),rgba(43,215,255,0.18))] blur-[130px] animate-drift-slow" />
      <div className="absolute right-[18%] bottom-[-34%] h-[520px] w-[520px] rounded-full bg-[conic-gradient(from_40deg,rgba(255,179,71,0.18),rgba(43,215,255,0.16),rgba(31,58,95,0.1),rgba(255,179,71,0.18))] blur-[120px] animate-drift" />
      <div className="absolute left-[10%] top-[36%] h-52 w-52 rounded-full bg-[rgba(43,215,255,0.14)] blur-[70px] motion-safe:animate-pulse [animation-duration:10s]" />
      <div className="absolute right-[12%] top-[46%] h-60 w-60 rounded-full bg-[rgba(255,179,71,0.12)] blur-[80px] motion-safe:animate-pulse [animation-duration:13s]" />
      <div className="absolute left-[52%] top-[22%] h-40 w-40 rounded-full bg-[rgba(31,58,95,0.12)] blur-[60px] animate-float" />
    </div>
  );
}

function LandingConnectors() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-0 overflow-hidden opacity-25 motion-reduce:hidden"
    >
      <svg
        className="h-full w-full"
        viewBox="0 0 100 1000"
        preserveAspectRatio="none"
      >
        <title>Decorative animated connectors</title>
        <defs>
          <linearGradient id="connectorStroke" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#2BD7FF" stopOpacity="0" />
            <stop offset="18%" stopColor="#2BD7FF" stopOpacity="0.55" />
            <stop offset="52%" stopColor="#FFB347" stopOpacity="0.32" />
            <stop offset="82%" stopColor="#2BD7FF" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#2BD7FF" stopOpacity="0" />
          </linearGradient>
          <radialGradient id="connectorNode" cx="30%" cy="30%" r="70%">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.95" />
            <stop offset="30%" stopColor="#2BD7FF" stopOpacity="0.75" />
            <stop offset="100%" stopColor="#2BD7FF" stopOpacity="0" />
          </radialGradient>
        </defs>

        <path
          d="M 50 80 C 50 240, 50 380, 50 520 C 50 660, 50 820, 50 960"
          fill="none"
          stroke="url(#connectorStroke)"
          strokeWidth="0.7"
          strokeDasharray="4 16"
          strokeLinecap="round"
        >
          <animate
            attributeName="stroke-dashoffset"
            from="0"
            to="-260"
            dur="24s"
            repeatCount="indefinite"
          />
        </path>

        <circle cx="50" cy="140" r="3.2" fill="url(#connectorNode)">
          <animate
            attributeName="opacity"
            values="0.35;0.95;0.35"
            dur="7.5s"
            repeatCount="indefinite"
          />
        </circle>
        <circle cx="50" cy="320" r="3.2" fill="url(#connectorNode)">
          <animate
            attributeName="opacity"
            values="0.3;0.9;0.3"
            dur="8.5s"
            repeatCount="indefinite"
          />
        </circle>
        <circle cx="50" cy="520" r="3.2" fill="url(#connectorNode)">
          <animate
            attributeName="opacity"
            values="0.35;0.95;0.35"
            dur="9.5s"
            repeatCount="indefinite"
          />
        </circle>
        <circle cx="50" cy="720" r="3.2" fill="url(#connectorNode)">
          <animate
            attributeName="opacity"
            values="0.3;0.9;0.3"
            dur="10.5s"
            repeatCount="indefinite"
          />
        </circle>
        <circle cx="50" cy="920" r="3.2" fill="url(#connectorNode)">
          <animate
            attributeName="opacity"
            values="0.35;0.95;0.35"
            dur="11.5s"
            repeatCount="indefinite"
          />
        </circle>
      </svg>
    </div>
  );
}

export default function HomePage() {
  return (
    <div className="relative min-h-screen overflow-hidden">
      <HeroBackground />

      <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-col gap-10 px-6 pb-20 pt-10 sm:gap-12 sm:px-10">
        <nav className="flex flex-wrap items-center justify-between gap-4">
          <Link
            aria-label="Go to home"
            className="flex items-center gap-3"
            href="/"
          >
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[color:var(--cs-ink)] text-sm font-semibold text-[color:var(--cs-paper-strong)]">
              CS
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.32em] text-[color:var(--cs-ink-muted)]">
                Coder School
              </p>
              <p className="font-display text-xl font-semibold text-[color:var(--cs-ink)]">
                Learn AI together
              </p>
            </div>
          </Link>

          <div className="flex flex-wrap items-center gap-2">
            <Link
              className="rounded-full border border-[color:var(--cs-stroke)] bg-white/80 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-[color:var(--cs-ink-muted)] transition hover:-translate-y-0.5"
              href="/learn"
            >
              For learners
            </Link>
            <Link
              className="rounded-full bg-[color:var(--cs-ink)] px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-white shadow-[0_14px_40px_rgba(var(--cs-shadow),0.2)] transition hover:-translate-y-0.5"
              href="/sessions"
            >
              For mentors
            </Link>
          </div>
        </nav>

        <header className="py-6 sm:py-10">
          <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-start">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 rounded-full border border-[color:var(--cs-stroke)] bg-white/55 px-4 py-1 text-xs uppercase tracking-[0.3em] text-[color:var(--cs-ink-muted)] backdrop-blur-sm">
                <Sparkles className="h-4 w-4" />
                Free for learners + mentors
              </div>
              <h1 className="font-display text-4xl font-semibold text-[color:var(--cs-ink)] sm:text-6xl">
                The live classroom where people learn to build with AI.
              </h1>
              <p className="max-w-2xl text-base text-[color:var(--cs-ink-muted)] sm:text-lg">
                Coder School is a free workspace where learners build AI and
                automation projects with mentor guidance. Every session ends
                with something you can show off.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link
                  className="rounded-full bg-[color:var(--cs-ink)] px-5 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-white"
                  href="/learn"
                >
                  Start learning
                </Link>
                <Link
                  className="rounded-full border border-[color:var(--cs-stroke)] bg-white/70 px-5 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-[color:var(--cs-ink-muted)] backdrop-blur-sm"
                  href="/challenge-library"
                >
                  Browse challenges
                </Link>
              </div>
              <p className="text-xs text-[color:var(--cs-ink-muted)]">
                Free for learners and mentors. No subscription.
              </p>
            </div>

            <div className="space-y-6 rounded-[24px] border border-[color:var(--cs-stroke)] bg-white/55 p-5 backdrop-blur-sm">
              <div className="border-l-2 border-[rgba(43,215,255,0.55)] pl-4">
                <p className="text-xs uppercase tracking-[0.28em] text-[color:var(--cs-ink-muted)]">
                  Next free cohort
                </p>
                <p className="mt-2 text-2xl font-semibold text-[color:var(--cs-ink)]">
                  Saturday · 10:00 AM
                </p>
                <p className="text-sm text-[color:var(--cs-ink-muted)]">
                  Guided AI helper build for all levels.
                </p>
              </div>
              <div className="border-l-2 border-[rgba(255,179,71,0.55)] pl-4">
                <p className="text-xs uppercase tracking-[0.28em] text-[color:var(--cs-ink-muted)]">
                  Mentors online
                </p>
                <p className="mt-2 text-2xl font-semibold text-[color:var(--cs-ink)]">
                  6 mentors live
                </p>
                <p className="text-sm text-[color:var(--cs-ink-muted)]">
                  Each cohort capped at 14 learners.
                </p>
              </div>
              <div className="border-l-2 border-[rgba(31,58,95,0.35)] pl-4">
                <p className="text-xs uppercase tracking-[0.28em] text-[color:var(--cs-ink-muted)]">
                  Projects shipped
                </p>
                <p className="mt-2 text-2xl font-semibold text-[color:var(--cs-ink)]">
                  128 builds
                </p>
                <p className="text-sm text-[color:var(--cs-ink-muted)]">
                  Bots, apps, and AI experiments.
                </p>
              </div>
            </div>
          </div>
        </header>

        <main className="relative isolate">
          <LandingConnectors />

          <section className="relative z-10 border-t border-[color:var(--cs-stroke)] py-12">
            <div className="max-w-2xl">
              <p className="text-xs uppercase tracking-[0.3em] text-[color:var(--cs-ink-muted)]">
                Built for learners
              </p>
              <h2 className="mt-3 font-display text-3xl font-semibold text-[color:var(--cs-ink)]">
                Live mentoring, real projects.
              </h2>
              <p className="mt-3 text-sm text-[color:var(--cs-ink-muted)]">
                A free service designed for learners—and mentors who want to
                help.
              </p>
            </div>

            <div className="mt-6 grid gap-4 lg:grid-cols-3">
              {highlights.map((item, index) => {
                const Icon = item.icon;
                const glowClass =
                  index === 0
                    ? "corner-glow-cool"
                    : index === 1
                      ? "corner-glow-warm"
                      : "corner-glow-mint";

                return (
                  <div
                    key={item.title}
                    className={`glass-panel ${glowClass} rounded-[24px] border border-[color:var(--cs-stroke)] p-5`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-2xl border border-[color:var(--cs-stroke)] bg-white/70 text-[color:var(--cs-ink)]">
                        <Icon className="h-5 w-5" />
                      </div>
                      <h3 className="font-display text-xl font-semibold text-[color:var(--cs-ink)]">
                        {item.title}
                      </h3>
                    </div>
                    <p className="mt-3 text-sm text-[color:var(--cs-ink-muted)]">
                      {item.description}
                    </p>
                  </div>
                );
              })}
            </div>

            <div className="mt-8 flex flex-wrap gap-2">
              {[
                { label: "Learner dashboard", href: "/learn" },
                { label: "Challenges", href: "/learn/challenges" },
                { label: "Tracks", href: "/learn/tracks" },
                { label: "Explore careers", href: "/learn/careers" },
                { label: "Progress", href: "/learn/progress" },
                { label: "Live rooms", href: "/learn/live" },
                { label: "Public library", href: "/challenge-library" },
              ].map((link) => (
                <Link
                  key={link.href}
                  className="rounded-full border border-[color:var(--cs-stroke)] bg-white/80 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-[color:var(--cs-ink-muted)]"
                  href={link.href}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </section>

          <section className="relative z-10 border-t border-[color:var(--cs-stroke)] py-12">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-[color:var(--cs-ink-muted)]">
                  How it works
                </p>
                <h2 className="mt-3 font-display text-3xl font-semibold text-[color:var(--cs-ink)]">
                  A guided journey from curiosity to creation.
                </h2>
              </div>
              <Link
                className="rounded-full border border-[color:var(--cs-stroke)] bg-white/80 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-[color:var(--cs-ink-muted)]"
                href="/learn"
              >
                Explore learner space
              </Link>
            </div>

            <ol className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {howItWorks.map((item, index) => {
                const Icon = item.icon;
                const glowClass =
                  index === 0
                    ? "corner-glow-cool"
                    : index === 1
                      ? "corner-glow-mint"
                      : "corner-glow-warm";

                return (
                  <li
                    key={item.title}
                    className={`glass-panel ${glowClass} rounded-[22px] border border-[color:var(--cs-stroke)] p-5`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 flex-none items-center justify-center rounded-2xl border border-[color:var(--cs-stroke)] bg-white/70 text-[color:var(--cs-ink)]">
                        <span className="text-sm font-semibold">
                          {index + 1}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Icon className="h-4 w-4 text-[color:var(--cs-ink)]" />
                        <p className="text-sm font-semibold text-[color:var(--cs-ink)]">
                          {item.title}
                        </p>
                      </div>
                    </div>
                    <p className="mt-3 text-sm text-[color:var(--cs-ink-muted)]">
                      {item.description}
                    </p>
                  </li>
                );
              })}
            </ol>
          </section>

          <section className="relative z-10 border-t border-[color:var(--cs-stroke)] py-12">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-[color:var(--cs-ink-muted)]">
                  Learning tracks
                </p>
                <h2 className="mt-3 font-display text-3xl font-semibold text-[color:var(--cs-ink)]">
                  Choose a track, ship a build.
                </h2>
              </div>
              <Link
                className="rounded-full border border-[color:var(--cs-stroke)] bg-white/80 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-[color:var(--cs-ink-muted)]"
                href="/learn"
              >
                Open learner dashboard
              </Link>
            </div>

            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {tracks.map((track, index) => {
                const glowClass =
                  index % 2 === 0 ? "corner-glow-cool" : "corner-glow-warm";

                return (
                  <div
                    key={track.title}
                    className={`glass-panel ${glowClass} rounded-[22px] border border-[color:var(--cs-stroke)] p-5`}
                  >
                    <p className="text-sm font-semibold text-[color:var(--cs-ink)]">
                      {track.title}
                    </p>
                    <p className="mt-2 text-sm text-[color:var(--cs-ink-muted)]">
                      {track.focus}
                    </p>
                  </div>
                );
              })}
            </div>
          </section>

          <section className="relative z-10 border-t border-[color:var(--cs-stroke)] py-12">
            <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
              <div className="glass-panel rounded-[24px] border border-[color:var(--cs-stroke)] p-6">
                <p className="text-xs uppercase tracking-[0.3em] text-[color:var(--cs-ink-muted)]">
                  Safe by design
                </p>
                <h2 className="mt-3 font-display text-3xl font-semibold text-[color:var(--cs-ink)]">
                  A trusted space for learners.
                </h2>
                <p className="mt-3 text-sm text-[color:var(--cs-ink-muted)]">
                  We keep the experience calm, welcoming, and transparent.
                </p>
                <div className="mt-5 grid gap-4">
                  {safetyStack.map((item, index) => {
                    const Icon = item.icon;
                    const glowClass =
                      index === 0
                        ? "corner-glow-mint"
                        : index === 1
                          ? "corner-glow-cool"
                          : "corner-glow-warm";

                    return (
                      <div
                        key={item.title}
                        className={`glass-panel ${glowClass} rounded-[20px] border border-[color:var(--cs-stroke)] p-4`}
                      >
                        <div className="flex items-center gap-3">
                          <div className="flex h-9 w-9 items-center justify-center rounded-2xl border border-[color:var(--cs-stroke)] bg-white/70 text-[color:var(--cs-ink)]">
                            <Icon className="h-5 w-5" />
                          </div>
                          <p className="text-sm font-semibold text-[color:var(--cs-ink)]">
                            {item.title}
                          </p>
                        </div>
                        <p className="mt-2 text-xs text-[color:var(--cs-ink-muted)]">
                          {item.description}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="glass-panel rounded-[24px] border border-[color:var(--cs-stroke)] p-6">
                <p className="text-xs uppercase tracking-[0.3em] text-[color:var(--cs-ink-muted)]">
                  Families love it
                </p>
                <div className="mt-5 grid gap-4">
                  {testimonials.map((item, index) => {
                    const glowClass =
                      index === 0 ? "corner-glow-cool" : "corner-glow-warm";

                    return (
                      <blockquote
                        key={item.name}
                        className={`glass-panel ${glowClass} rounded-[20px] border border-[color:var(--cs-stroke)] p-4`}
                      >
                        <div className="flex items-center gap-2 text-[color:var(--cs-ink)]">
                          <Star className="h-4 w-4" />
                          <p className="text-xs uppercase tracking-[0.22em] text-[color:var(--cs-ink-muted)]">
                            Verified family
                          </p>
                        </div>
                        <p className="mt-3 text-base text-[color:var(--cs-ink)]">
                          “{item.quote}”
                        </p>
                        <p className="mt-2 text-xs uppercase tracking-[0.2em] text-[color:var(--cs-ink-muted)]">
                          {item.name}
                        </p>
                      </blockquote>
                    );
                  })}
                </div>
              </div>
            </div>
          </section>

          <section className="relative z-10 border-t border-[color:var(--cs-stroke)] py-12">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-[color:var(--cs-ink-muted)]">
                  FAQ
                </p>
                <h2 className="mt-3 font-display text-3xl font-semibold text-[color:var(--cs-ink)]">
                  Questions from parents and schools
                </h2>
              </div>
              <div className="inline-flex items-center gap-2 rounded-full border border-[color:var(--cs-stroke)] bg-white/80 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-[color:var(--cs-ink-muted)]">
                <BookOpen className="h-4 w-4" />
                Updated weekly
              </div>
            </div>

            <div className="mt-6 glass-panel rounded-[28px] border border-[color:var(--cs-stroke)] p-6">
              <div className="grid gap-4 sm:grid-cols-2">
                {faqs.map((item, index) => {
                  const glowClass =
                    index % 2 === 0 ? "corner-glow-cool" : "corner-glow-warm";

                  return (
                    <details
                      key={item.question}
                      className={`group rounded-[20px] border border-[color:var(--cs-stroke)] bg-white/70 px-4 py-4 ${glowClass}`}
                    >
                      <summary className="cursor-pointer list-none text-sm font-semibold text-[color:var(--cs-ink)]">
                        <div className="flex items-center justify-between gap-4">
                          <span>{item.question}</span>
                          <span className="text-[color:var(--cs-ink-muted)] transition group-open:rotate-45">
                            +
                          </span>
                        </div>
                      </summary>
                      <p className="mt-3 text-sm text-[color:var(--cs-ink-muted)]">
                        {item.answer}
                      </p>
                    </details>
                  );
                })}
              </div>
            </div>
          </section>

          <section className="relative z-10 mt-12 sm:mt-16">
            <div className="glass-panel corner-glow-cool rounded-[28px] border border-[color:var(--cs-stroke)] bg-[radial-gradient(circle_at_top,rgba(43,215,255,0.12),transparent_60%)] p-8 backdrop-blur-sm">
              <div className="flex flex-wrap items-center justify-between gap-8">
                <div className="max-w-2xl">
                  <p className="text-xs uppercase tracking-[0.3em] text-[color:var(--cs-ink-muted)]">
                    Ready to see it live?
                  </p>
                  <h2 className="mt-3 font-display text-3xl font-semibold text-[color:var(--cs-ink)]">
                    Launch the workspace and meet your mentors.
                  </h2>
                  <p className="mt-3 text-sm text-[color:var(--cs-ink-muted)]">
                    Explore the live mentoring space, chat with a coach, and see
                    the challenges learners are building.
                  </p>
                </div>
                <Link
                  className="rounded-full bg-[color:var(--cs-ink)] px-6 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-white"
                  href="/learn"
                >
                  Open learner dashboard
                </Link>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
