import Link from "next/link";

import { getCareerBySlug } from "../career-details";

interface DayInLifeEntry {
  time: string;
  title: string;
  detail: string;
}

interface CareerDetail {
  title: string;
  summary: string;
  whatYouDo: string[];
  skillsToBuild: string[];
  dayInLife: DayInLifeEntry[];
  starterProject: {
    title: string;
    steps: string[];
  };
}

const careerDetails: Record<string, CareerDetail> = {
  "software-engineer": {
    title: "Software Engineer",
    summary:
      "Software engineers build and maintain reliable systems that solve real problems.",
    whatYouDo: [
      "Turn ideas into working features",
      "Fix bugs and improve reliability",
      "Collaborate with designers and product teams",
      "Write tests and monitor systems",
    ],
    skillsToBuild: ["Debugging", "Data modeling", "Code review"],
    dayInLife: [
      {
        time: "9:00 AM",
        title: "Plan the day",
        detail: "Review tasks, check system health, and pick a clear goal.",
      },
      {
        time: "10:00 AM",
        title: "Build time",
        detail: "Implement a small feature or bugfix in a focused block.",
      },
      {
        time: "11:00 AM",
        title: "Code review",
        detail:
          "Read teammates’ changes and leave clear, constructive feedback.",
      },
      {
        time: "12:00 PM",
        title: "Recharge",
        detail: "Take a break and reset your attention.",
      },
      {
        time: "1:00 PM",
        title: "Sync up",
        detail: "Short standup or check-in to align on priorities.",
      },
      {
        time: "2:00 PM",
        title: "Debug + iterate",
        detail: "Investigate an issue, reproduce it, and ship a fix.",
      },
      {
        time: "3:00 PM",
        title: "Test + ship",
        detail: "Add tests, verify edge cases, and open a pull request.",
      },
      {
        time: "4:00 PM",
        title: "Document + handoff",
        detail: "Write notes so others can pick up where you left off.",
      },
    ],
    starterProject: {
      title: "Build a tiny task tracker",
      steps: [
        "Write down 3 tasks you do often",
        "Create a simple page that lists them",
        "Add a way to mark one as done",
        "Ask: what would make this easier to use?",
      ],
    },
  },
  "data-analyst": {
    title: "Data Analyst",
    summary:
      "Data analysts answer questions with data, then communicate insights clearly.",
    whatYouDo: [
      "Collect and clean data",
      "Explore trends and patterns",
      "Build charts that explain what’s happening",
      "Write summaries people can act on",
    ],
    skillsToBuild: ["SQL", "Visualization", "Business context"],
    dayInLife: [
      {
        time: "9:00 AM",
        title: "Clarify the question",
        detail:
          "Meet with a stakeholder and define the decision they need to make.",
      },
      {
        time: "10:00 AM",
        title: "Pull data",
        detail: "Query sources, collect files, and document assumptions.",
      },
      {
        time: "11:00 AM",
        title: "Clean + validate",
        detail:
          "Fix missing values, check duplicates, and sanity-check totals.",
      },
      {
        time: "12:00 PM",
        title: "Recharge",
        detail: "Take a break and step away from the spreadsheet.",
      },
      {
        time: "1:00 PM",
        title: "Explore",
        detail: "Look for patterns, outliers, and interesting segments.",
      },
      {
        time: "2:00 PM",
        title: "Visualize",
        detail: "Make one chart that answers the question clearly.",
      },
      {
        time: "3:00 PM",
        title: "Write the story",
        detail: "Summarize insights, caveats, and recommended next steps.",
      },
      {
        time: "4:00 PM",
        title: "Share + iterate",
        detail: "Present findings, collect feedback, and refine.",
      },
    ],
    starterProject: {
      title: "Analyze a personal dataset",
      steps: [
        "Pick a dataset (sleep, workouts, spending, study time)",
        "Create a table with 7–14 days",
        "Make one chart",
        "Write 3 insights and 1 question",
      ],
    },
  },
  "product-manager": {
    title: "Product Manager",
    summary:
      "Product managers align teams on what to build next and why it matters.",
    whatYouDo: [
      "Talk to users and learn what they need",
      "Define priorities and tradeoffs",
      "Write clear requirements",
      "Coordinate engineering, design, and stakeholders",
    ],
    skillsToBuild: ["Prioritization", "Writing", "Decision making"],
    dayInLife: [
      {
        time: "9:00 AM",
        title: "Check metrics",
        detail: "Review what changed overnight and flag surprises.",
      },
      {
        time: "10:00 AM",
        title: "Customer time",
        detail: "Read feedback, run an interview, or review support tickets.",
      },
      {
        time: "11:00 AM",
        title: "Write a brief",
        detail: "Draft a clear goal, scope, and success metric for a feature.",
      },
      {
        time: "12:00 PM",
        title: "Recharge",
        detail: "Take a break and reset before meetings.",
      },
      {
        time: "1:00 PM",
        title: "Team sync",
        detail: "Align with engineering and design on tradeoffs and timeline.",
      },
      {
        time: "2:00 PM",
        title: "Prioritize",
        detail:
          "Compare options and decide what to do next (and what to skip).",
      },
      {
        time: "3:00 PM",
        title: "Review",
        detail: "Look at designs or builds and confirm they meet the goal.",
      },
      {
        time: "4:00 PM",
        title: "Communicate",
        detail: "Share updates and keep everyone aligned on what’s shipping.",
      },
    ],
    starterProject: {
      title: "Write a one-page product brief",
      steps: [
        "Pick a problem you want to solve",
        "Describe who it’s for",
        "List 3 must-have features",
        "Define what success looks like",
      ],
    },
  },
  "ux-designer": {
    title: "UX Designer",
    summary:
      "UX designers create experiences that feel intuitive, inclusive, and clear.",
    whatYouDo: [
      "Interview people about their needs",
      "Sketch and prototype flows",
      "Test designs and iterate",
      "Partner with engineering to ship",
    ],
    skillsToBuild: ["Research", "Prototyping", "Accessibility"],
    dayInLife: [
      {
        time: "9:00 AM",
        title: "Review notes",
        detail: "Scan research notes and pick a problem to focus on today.",
      },
      {
        time: "10:00 AM",
        title: "Map the flow",
        detail: "Sketch the steps someone takes and where they get stuck.",
      },
      {
        time: "11:00 AM",
        title: "Prototype",
        detail: "Build a quick clickable prototype to test an idea.",
      },
      {
        time: "12:00 PM",
        title: "Recharge",
        detail: "Take a break and come back with fresh eyes.",
      },
      {
        time: "1:00 PM",
        title: "Test",
        detail: "Run a short usability test and listen for confusion points.",
      },
      {
        time: "2:00 PM",
        title: "Iterate",
        detail: "Revise the design to remove friction and clarify language.",
      },
      {
        time: "3:00 PM",
        title: "Design review",
        detail: "Share options, explain tradeoffs, and decide next steps.",
      },
      {
        time: "4:00 PM",
        title: "Handoff",
        detail: "Write specs and notes so engineering can implement smoothly.",
      },
    ],
    starterProject: {
      title: "Redesign a small workflow",
      steps: [
        "Pick a workflow (signup, search, checkout)",
        "Map the current steps",
        "Design a simpler version",
        "Test with one person and revise",
      ],
    },
  },
  "ai-ml-practitioner": {
    title: "AI / ML Practitioner",
    summary: "AI practitioners prototype and evaluate AI features responsibly.",
    whatYouDo: [
      "Design prompts and evaluate outputs",
      "Measure quality and failure cases",
      "Think about safety and bias",
      "Ship improvements iteratively",
    ],
    skillsToBuild: ["Prompting", "Evaluation", "Responsible AI"],
    dayInLife: [
      {
        time: "9:00 AM",
        title: "Review outputs",
        detail: "Look at examples from yesterday and note failure cases.",
      },
      {
        time: "10:00 AM",
        title: "Experiment",
        detail: "Try prompt variants or model settings and log results.",
      },
      {
        time: "11:00 AM",
        title: "Evaluate",
        detail:
          "Score outputs using a checklist and compare against a baseline.",
      },
      {
        time: "12:00 PM",
        title: "Recharge",
        detail: "Take a break and reset your judgment.",
      },
      {
        time: "1:00 PM",
        title: "Safety check",
        detail: "Identify risky outputs and add guardrails or refusal rules.",
      },
      {
        time: "2:00 PM",
        title: "Build a test set",
        detail: "Add representative examples that cover edge cases.",
      },
      {
        time: "3:00 PM",
        title: "Share findings",
        detail: "Summarize what improved and what still fails.",
      },
      {
        time: "4:00 PM",
        title: "Ship iteration",
        detail: "Implement changes, then monitor for regressions.",
      },
    ],
    starterProject: {
      title: "Create an evaluation checklist",
      steps: [
        "Pick a task (summarize, classify, brainstorm)",
        "Write 5 example inputs",
        "Define what a good output looks like",
        "Test, score, and refine",
      ],
    },
  },
  "cybersecurity-analyst": {
    title: "Cybersecurity Analyst",
    summary:
      "Security analysts protect systems by reducing risk and responding to threats.",
    whatYouDo: [
      "Review alerts and logs",
      "Harden systems with practical controls",
      "Investigate suspicious activity",
      "Teach security habits",
    ],
    skillsToBuild: ["Threat modeling", "Monitoring", "Incident response"],
    dayInLife: [
      {
        time: "9:00 AM",
        title: "Triage alerts",
        detail: "Review dashboards, confirm what’s real, and prioritize.",
      },
      {
        time: "10:00 AM",
        title: "Investigate",
        detail:
          "Follow the evidence trail: logs, accounts, and suspicious events.",
      },
      {
        time: "11:00 AM",
        title: "Harden",
        detail: "Fix the root cause (permissions, MFA, patches, monitoring).",
      },
      {
        time: "12:00 PM",
        title: "Recharge",
        detail: "Take a break and reset.",
      },
      {
        time: "1:00 PM",
        title: "Threat model",
        detail: "Ask: what could go wrong, and how would we notice?",
      },
      {
        time: "2:00 PM",
        title: "Write guidance",
        detail: "Create a short checklist people can follow.",
      },
      {
        time: "3:00 PM",
        title: "Practice response",
        detail: "Run a tabletop exercise or confirm incident playbooks.",
      },
      {
        time: "4:00 PM",
        title: "Report",
        detail: "Share what happened, what changed, and what to watch next.",
      },
    ],
    starterProject: {
      title: "Do a personal security audit",
      steps: [
        "List the accounts you use most",
        "Enable MFA where possible",
        "Update passwords and recovery settings",
        "Write 3 habits to keep",
      ],
    },
  },
};

export default function CareerDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const career = getCareerBySlug(params.slug);

  if (!career) {
    return (
      <div className="space-y-8">
        <header className="glass-panel rounded-[32px] border border-[color:var(--cs-stroke)] p-6">
          <p className="text-xs uppercase tracking-[0.32em] text-[color:var(--cs-ink-muted)]">
            Explore careers
          </p>
          <h1 className="font-display text-3xl font-semibold text-[color:var(--cs-ink)]">
            Career not found
          </h1>
          <p className="mt-2 text-sm text-[color:var(--cs-ink-muted)]">
            Choose a role from the careers list.
          </p>
          <div className="mt-5 flex flex-wrap gap-2">
            <Link
              className="rounded-full bg-[color:var(--cs-ink)] px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-white"
              href="/learn/careers"
            >
              Back to careers
            </Link>
          </div>
        </header>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <header className="glass-panel rounded-[32px] border border-[color:var(--cs-stroke)] p-6">
        <p className="text-xs uppercase tracking-[0.32em] text-[color:var(--cs-ink-muted)]">
          Career
        </p>
        <h1 className="font-display text-3xl font-semibold text-[color:var(--cs-ink)]">
          {career.title}
        </h1>
        <p className="mt-2 max-w-2xl text-sm text-[color:var(--cs-ink-muted)]">
          {career.summary}
        </p>
        <div className="mt-5 flex flex-wrap gap-2">
          <Link
            className="rounded-full border border-[color:var(--cs-stroke)] bg-white/80 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-[color:var(--cs-ink-muted)]"
            href="/learn/careers"
          >
            Back
          </Link>
          <Link
            className="rounded-full bg-[color:var(--cs-ink)] px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-white"
            href="/learn"
          >
            Dashboard
          </Link>
        </div>
      </header>

      <section className="grid gap-6 lg:grid-cols-2">
        <div className="glass-panel rounded-[28px] border border-[color:var(--cs-stroke)] p-6">
          <h2 className="font-display text-2xl font-semibold text-[color:var(--cs-ink)]">
            What you do
          </h2>
          <ul className="mt-5 space-y-2">
            {career.whatYouDo.map((item) => (
              <li
                key={item}
                className="rounded-2xl border border-[color:var(--cs-stroke)] bg-[color:var(--cs-paper-strong)] px-4 py-3 text-sm font-semibold text-[color:var(--cs-ink)]"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="glass-panel rounded-[28px] border border-[color:var(--cs-stroke)] p-6">
          <h2 className="font-display text-2xl font-semibold text-[color:var(--cs-ink)]">
            Skills to build
          </h2>
          <p className="text-sm text-[color:var(--cs-ink-muted)]">
            Focus on one skill this week.
          </p>
          <div className="mt-5 flex flex-wrap gap-2">
            {career.skillsToBuild.map((skill) => (
              <span
                key={skill}
                className="rounded-full bg-[rgba(43,215,255,0.16)] px-3 py-1 text-xs font-semibold text-[color:var(--cs-ink)]"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="glass-panel rounded-[28px] border border-[color:var(--cs-stroke)] p-6">
        <h2 className="font-display text-2xl font-semibold text-[color:var(--cs-ink)]">
          Day in the life
        </h2>
        <p className="text-sm text-[color:var(--cs-ink-muted)]">
          A sample schedule to make the work feel concrete. Real days vary.
        </p>
        <ol className="mt-5 space-y-3">
          {career.dayInLife.map((entry) => (
            <li key={entry.id}>
              <Link
                className="block rounded-2xl border border-[color:var(--cs-stroke)] bg-white/80 px-4 py-3 transition hover:-translate-y-0.5"
                href={`/learn/careers/${params.slug}/day/${entry.id}`}
              >
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <p className="text-xs font-semibold uppercase tracking-[0.26em] text-[color:var(--cs-ink-muted)]">
                    {entry.time}
                  </p>
                  <p className="text-sm font-semibold text-[color:var(--cs-ink)]">
                    {entry.title}
                  </p>
                </div>
                <p className="mt-1 text-xs text-[color:var(--cs-ink-muted)]">
                  {entry.detail}
                </p>
                <p className="mt-3 text-xs font-semibold uppercase tracking-[0.2em] text-[color:var(--cs-ink)]">
                  Try this in a mock workspace
                </p>
              </Link>
            </li>
          ))}
        </ol>
      </section>

      <section className="glass-panel rounded-[28px] border border-[color:var(--cs-stroke)] p-6">
        <h2 className="font-display text-2xl font-semibold text-[color:var(--cs-ink)]">
          Starter project
        </h2>
        <p className="text-sm text-[color:var(--cs-ink-muted)]">
          {career.starterProject.title}
        </p>
        <ol className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {career.starterProject.steps.map((step) => (
            <li
              key={step}
              className="rounded-2xl border border-[color:var(--cs-stroke)] bg-white/80 px-4 py-3"
            >
              <p className="text-sm font-semibold text-[color:var(--cs-ink)]">
                {step}
              </p>
            </li>
          ))}
        </ol>
      </section>
    </div>
  );
}
