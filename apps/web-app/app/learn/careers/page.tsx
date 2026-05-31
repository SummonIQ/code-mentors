import Link from "next/link";

interface CareerCard {
  title: string;
  slug: string;
  summary: string;
  skills: string[];
}

const careers: CareerCard[] = [
  {
    title: "Software Engineer",
    slug: "software-engineer",
    summary: "Build products, automate workflows, and ship reliable systems.",
    skills: ["Problem solving", "Debugging", "Communication"],
  },
  {
    title: "Data Analyst",
    slug: "data-analyst",
    summary: "Turn messy data into clear insights and decisions.",
    skills: ["Spreadsheets", "SQL", "Storytelling"],
  },
  {
    title: "Product Manager",
    slug: "product-manager",
    summary: "Define what to build and align teams around outcomes.",
    skills: ["Prioritization", "User empathy", "Writing"],
  },
  {
    title: "UX Designer",
    slug: "ux-designer",
    summary: "Design experiences that are intuitive, inclusive, and helpful.",
    skills: ["Research", "Prototyping", "Visual design"],
  },
  {
    title: "AI / ML Practitioner",
    slug: "ai-ml-practitioner",
    summary: "Prototype AI-powered features and evaluate model behavior.",
    skills: ["Experimentation", "Prompting", "Ethics"],
  },
  {
    title: "Cybersecurity Analyst",
    slug: "cybersecurity-analyst",
    summary: "Protect systems and people with practical security habits.",
    skills: ["Threat modeling", "Monitoring", "Risk thinking"],
  },
];

function normalizeQuery(value: string) {
  return value.toLowerCase().trim();
}

function buildCareersHref(options: { q?: string; skill?: string }) {
  const params = new URLSearchParams();

  if (options.q) params.set("q", options.q);
  if (options.skill) params.set("skill", options.skill);

  const queryString = params.toString();
  return queryString ? `/learn/careers?${queryString}` : "/learn/careers";
}

export default function CareersPage({
  searchParams,
}: {
  searchParams?: {
    q?: string;
    skill?: string;
  };
}) {
  const q = typeof searchParams?.q === "string" ? searchParams.q : "";
  const skill =
    typeof searchParams?.skill === "string" ? searchParams.skill : "";

  const normalizedQuery = normalizeQuery(q);
  const normalizedSkill = normalizeQuery(skill);

  const availableSkills = Array.from(
    new Set(careers.flatMap((career) => career.skills)),
  ).sort((a, b) => a.localeCompare(b));

  const filteredCareers = careers.filter((career) => {
    const matchesSkill =
      !normalizedSkill ||
      career.skills.some((careerSkill) =>
        normalizeQuery(careerSkill).includes(normalizedSkill),
      );

    if (!matchesSkill) return false;

    if (!normalizedQuery) return true;

    return (
      normalizeQuery(career.title).includes(normalizedQuery) ||
      normalizeQuery(career.summary).includes(normalizedQuery) ||
      career.skills.some((careerSkill) =>
        normalizeQuery(careerSkill).includes(normalizedQuery),
      )
    );
  });

  return (
    <div className="space-y-8">
      <header className="glass-panel rounded-[32px] border border-[color:var(--cs-stroke)] p-6">
        <p className="text-xs uppercase tracking-[0.32em] text-[color:var(--cs-ink-muted)]">
          Tool
        </p>
        <h1 className="font-display text-3xl font-semibold text-[color:var(--cs-ink)]">
          Career Explorer
        </h1>
        <p className="mt-2 max-w-2xl text-sm text-[color:var(--cs-ink-muted)]">
          Find a role, learn the core skills, and try a starter project. Use the
          filters to narrow down options quickly.
        </p>

        <form
          action="/learn/careers"
          className="mt-6 grid gap-3 lg:grid-cols-[1.2fr_0.8fr_auto]"
          method="get"
        >
          <label className="grid gap-2">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[color:var(--cs-ink-muted)]">
              Search
            </span>
            <input
              className="h-11 rounded-2xl border border-[color:var(--cs-stroke)] bg-white/80 px-4 text-sm text-[color:var(--cs-ink)]"
              name="q"
              placeholder="Try: design, security, writing"
              defaultValue={q}
              type="search"
            />
          </label>

          <label className="grid gap-2">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[color:var(--cs-ink-muted)]">
              Skill
            </span>
            <select
              className="h-11 rounded-2xl border border-[color:var(--cs-stroke)] bg-white/80 px-4 text-sm text-[color:var(--cs-ink)]"
              name="skill"
              defaultValue={skill}
            >
              <option value="">All skills</option>
              {availableSkills.map((availableSkill) => (
                <option key={availableSkill} value={availableSkill}>
                  {availableSkill}
                </option>
              ))}
            </select>
          </label>

          <button
            className="h-11 self-end rounded-full bg-[color:var(--cs-ink)] px-6 text-xs font-semibold uppercase tracking-[0.2em] text-white"
            type="submit"
          >
            Search
          </button>
        </form>

        <div className="mt-5 flex flex-wrap items-center gap-2">
          <p className="text-xs uppercase tracking-[0.2em] text-[color:var(--cs-ink-muted)]">
            Showing {filteredCareers.length} of {careers.length}
          </p>
          {(q || skill) && (
            <Link
              className="rounded-full border border-[color:var(--cs-stroke)] bg-white/80 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-[color:var(--cs-ink-muted)]"
              href="/learn/careers"
            >
              Clear
            </Link>
          )}
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          {availableSkills.slice(0, 8).map((availableSkill) => {
            const isActive =
              normalizedSkill &&
              normalizeQuery(availableSkill).includes(normalizedSkill);

            return (
              <Link
                key={availableSkill}
                className={
                  isActive
                    ? "rounded-full bg-[color:var(--cs-ink)] px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-white"
                    : "rounded-full border border-[color:var(--cs-stroke)] bg-white/80 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-[color:var(--cs-ink-muted)]"
                }
                href={
                  isActive
                    ? buildCareersHref({ q })
                    : buildCareersHref({ q, skill: availableSkill })
                }
              >
                {availableSkill}
              </Link>
            );
          })}
        </div>
        <div className="mt-5 flex flex-wrap gap-2">
          <Link
            className="rounded-full bg-[color:var(--cs-ink)] px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-white"
            href="/learn"
          >
            Back to dashboard
          </Link>
          <Link
            className="rounded-full border border-[color:var(--cs-stroke)] bg-white/80 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-[color:var(--cs-ink-muted)]"
            href="/learn/tracks"
          >
            Browse tracks
          </Link>
        </div>
      </header>

      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filteredCareers.map((career) => (
          <Link
            key={career.slug}
            className="glass-panel rounded-[28px] border border-[color:var(--cs-stroke)] p-6 transition hover:-translate-y-0.5"
            href={`/learn/careers/${career.slug}`}
          >
            <h2 className="font-display text-2xl font-semibold text-[color:var(--cs-ink)]">
              {career.title}
            </h2>
            <p className="mt-2 text-sm text-[color:var(--cs-ink-muted)]">
              {career.summary}
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              {career.skills.map((skill) => (
                <span
                  key={skill}
                  className="rounded-full bg-[rgba(43,215,255,0.16)] px-3 py-1 text-xs font-semibold text-[color:var(--cs-ink)]"
                >
                  {skill}
                </span>
              ))}
            </div>
          </Link>
        ))}
      </section>

      <section className="glass-panel rounded-[28px] border border-[color:var(--cs-stroke)] p-6">
        <h2 className="font-display text-2xl font-semibold text-[color:var(--cs-ink)]">
          How to explore a career in one week
        </h2>
        <p className="text-sm text-[color:var(--cs-ink-muted)]">
          You don’t need to “pick forever”. Try the work and see what you enjoy.
        </p>
        <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {[
            {
              title: "Day 1",
              detail: "Read the role overview and write 3 questions.",
            },
            {
              title: "Days 2–3",
              detail: "Do one small project that matches the role.",
            },
            {
              title: "Days 4–5",
              detail: "Share your work and get feedback.",
            },
            {
              title: "Weekend",
              detail: "Reflect: what felt energizing vs draining?",
            },
          ].map((step) => (
            <div
              key={step.title}
              className="rounded-2xl border border-[color:var(--cs-stroke)] bg-[color:var(--cs-paper-strong)] p-4"
            >
              <p className="text-xs uppercase tracking-[0.26em] text-[color:var(--cs-ink-muted)]">
                {step.title}
              </p>
              <p className="mt-2 text-sm font-semibold text-[color:var(--cs-ink)]">
                {step.detail}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
