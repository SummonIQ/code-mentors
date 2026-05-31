import Link from "next/link";
import { GraduationCap, Users } from "lucide-react";

const mentors = [
  {
    name: "Coach Maya",
    specialty: "AI fundamentals",
    status: "Live now",
  },
  {
    name: "Ravi K.",
    specialty: "Automation workflows",
    status: "Available",
  },
  {
    name: "Lena K.",
    specialty: "Curriculum design",
    status: "Planning",
  },
  {
    name: "Sam P.",
    specialty: "Creative coding",
    status: "Reviewing",
  },
];

const students = [
  {
    name: "Zoey M.",
    level: "Beginner",
    focus: "Prompting basics",
  },
  {
    name: "Liam S.",
    level: "Intermediate",
    focus: "Automation logic",
  },
  {
    name: "Tara L.",
    level: "Beginner",
    focus: "Creative coding",
  },
  {
    name: "Aiden R.",
    level: "Advanced",
    focus: "AI ethics",
  },
];

const cohorts = [
  { name: "Saturday AI Builders", mentors: 2, students: 14, status: "Active" },
  { name: "Tuesday Automation Lab", mentors: 1, students: 8, status: "Active" },
  {
    name: "Thursday Creative Coders",
    mentors: 2,
    students: 12,
    status: "Upcoming",
  },
];

export default function PeoplePage({
  searchParams,
}: {
  searchParams?: { invite?: string; add?: string };
}) {
  const modal = searchParams?.invite
    ? {
        title: "Invite mentor",
        description:
          "Send a live-session invite to a mentor with AI or automation expertise.",
        primary: "Send invite",
      }
    : searchParams?.add
    ? {
        title: "Add learner",
        description:
          "Create a new learner profile and assign them to a cohort.",
        primary: "Add learner",
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
                href="/people"
              >
                Close
              </Link>
              <Link
                className="rounded-full bg-[color:var(--cs-ink)] px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-white"
                href="/people"
              >
                {modal.primary}
              </Link>
            </div>
          </div>
        </div>
      ) : null}

      <header className="glass-panel rounded-[32px] border border-[color:var(--cs-stroke)] p-6">
        <p className="text-xs uppercase tracking-[0.32em] text-[color:var(--cs-ink-muted)]">
          People
        </p>
        <h1 className="font-display text-3xl font-semibold text-[color:var(--cs-ink)]">
          Mentors & learners
        </h1>
        <p className="mt-2 text-sm text-[color:var(--cs-ink-muted)]">
          Manage your coaching team and support every learner in the program.
        </p>
      </header>

      <section className="grid gap-6 lg:grid-cols-2">
        <div className="glass-panel rounded-[28px] border border-[color:var(--cs-stroke)] p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-2xl border border-[color:var(--cs-stroke)] bg-white/70 text-[color:var(--cs-ink)]">
                <Users className="h-5 w-5" />
              </div>
              <h2 className="font-display text-xl font-semibold text-[color:var(--cs-ink)]">
                Mentors
              </h2>
            </div>
            <Link
              className="rounded-full bg-[color:var(--cs-ink)] px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-white"
              href="/people?invite=1"
            >
              Invite
            </Link>
          </div>
          <div className="mt-5 divide-y divide-[color:var(--cs-stroke)]">
            {mentors.map((mentor) => (
              <div key={mentor.name} className="py-3 first:pt-0 last:pb-0">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-semibold text-[color:var(--cs-ink)]">
                    {mentor.name}
                  </p>
                  <span
                    className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                      mentor.status === "Live now"
                        ? "bg-[rgba(43,215,255,0.16)] text-[color:var(--cs-ink)]"
                        : "bg-[color:var(--cs-paper)] text-[color:var(--cs-ink-muted)]"
                    }`}
                  >
                    {mentor.status}
                  </span>
                </div>
                <p className="text-xs text-[color:var(--cs-ink-muted)]">
                  {mentor.specialty}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="glass-panel rounded-[28px] border border-[color:var(--cs-stroke)] p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-2xl border border-[color:var(--cs-stroke)] bg-white/70 text-[color:var(--cs-ink)]">
                <GraduationCap className="h-5 w-5" />
              </div>
              <h2 className="font-display text-xl font-semibold text-[color:var(--cs-ink)]">
                Learners
              </h2>
            </div>
            <Link
              className="rounded-full bg-[color:var(--cs-ink)] px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-white"
              href="/people?add=1"
            >
              Add
            </Link>
          </div>
          <div className="mt-5 divide-y divide-[color:var(--cs-stroke)]">
            {students.map((student) => (
              <div key={student.name} className="py-3 first:pt-0 last:pb-0">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-semibold text-[color:var(--cs-ink)]">
                    {student.name}
                  </p>
                  <span className="rounded-full bg-[color:var(--cs-paper)] px-2 py-0.5 text-xs text-[color:var(--cs-ink-muted)]">
                    {student.level}
                  </span>
                </div>
                <p className="text-xs text-[color:var(--cs-ink-muted)]">
                  {student.focus}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="glass-panel rounded-[28px] border border-[color:var(--cs-stroke)] p-6">
        <h2 className="font-display text-xl font-semibold text-[color:var(--cs-ink)]">
          Cohorts
        </h2>
        <p className="text-sm text-[color:var(--cs-ink-muted)]">
          Active and upcoming groups of learners.
        </p>
        <div className="mt-5 grid gap-3 sm:grid-cols-3">
          {cohorts.map((cohort) => (
            <div
              key={cohort.name}
              className="rounded-2xl border border-[color:var(--cs-stroke)] bg-[color:var(--cs-paper-strong)] p-4"
            >
              <div className="flex items-center justify-between">
                <p className="text-sm font-semibold text-[color:var(--cs-ink)]">
                  {cohort.name}
                </p>
                <span
                  className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                    cohort.status === "Active"
                      ? "bg-[rgba(43,215,255,0.16)] text-[color:var(--cs-ink)]"
                      : "bg-[color:var(--cs-paper)] text-[color:var(--cs-ink-muted)]"
                  }`}
                >
                  {cohort.status}
                </span>
              </div>
              <div className="mt-2 flex gap-4 text-xs text-[color:var(--cs-ink-muted)]">
                <span>{cohort.mentors} mentors</span>
                <span>{cohort.students} learners</span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
