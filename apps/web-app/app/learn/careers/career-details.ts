export type ActivityType =
  | "plan"
  | "deep_work"
  | "review"
  | "break"
  | "sync"
  | "investigate"
  | "write"
  | "ship";

export interface MockWorkspace {
  title: string;
  scenario: string;
  inputs: Array<{ label: string; value: string }>;
  checklist: string[];
  promptTemplate: string;
  outputPlaceholder: string;
}

export interface DayInLifeEntry {
  id: string;
  time: string;
  title: string;
  detail: string;
  activityType: ActivityType;
}

export interface CareerDetail {
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

export const careerDetails: Record<string, CareerDetail> = {
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
        id: "plan",
        time: "9:00 AM",
        title: "Plan the day",
        detail: "Review tasks, check system health, and pick a clear goal.",
        activityType: "plan",
      },
      {
        id: "build",
        time: "10:00 AM",
        title: "Build time",
        detail: "Implement a small feature or bugfix in a focused block.",
        activityType: "deep_work",
      },
      {
        id: "code-review",
        time: "11:00 AM",
        title: "Code review",
        detail:
          "Read teammates’ changes and leave clear, constructive feedback.",
        activityType: "review",
      },
      {
        id: "recharge",
        time: "12:00 PM",
        title: "Recharge",
        detail: "Take a break and reset your attention.",
        activityType: "break",
      },
      {
        id: "sync",
        time: "1:00 PM",
        title: "Sync up",
        detail: "Short standup or check-in to align on priorities.",
        activityType: "sync",
      },
      {
        id: "debug",
        time: "2:00 PM",
        title: "Debug + iterate",
        detail: "Investigate an issue, reproduce it, and ship a fix.",
        activityType: "investigate",
      },
      {
        id: "test-ship",
        time: "3:00 PM",
        title: "Test + ship",
        detail: "Add tests, verify edge cases, and open a pull request.",
        activityType: "ship",
      },
      {
        id: "handoff",
        time: "4:00 PM",
        title: "Document + handoff",
        detail: "Write notes so others can pick up where you left off.",
        activityType: "write",
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
        id: "clarify",
        time: "9:00 AM",
        title: "Clarify the question",
        detail:
          "Meet with a stakeholder and define the decision they need to make.",
        activityType: "plan",
      },
      {
        id: "pull-data",
        time: "10:00 AM",
        title: "Pull data",
        detail: "Query sources, collect files, and document assumptions.",
        activityType: "deep_work",
      },
      {
        id: "clean-validate",
        time: "11:00 AM",
        title: "Clean + validate",
        detail:
          "Fix missing values, check duplicates, and sanity-check totals.",
        activityType: "investigate",
      },
      {
        id: "recharge",
        time: "12:00 PM",
        title: "Recharge",
        detail: "Take a break and step away from the spreadsheet.",
        activityType: "break",
      },
      {
        id: "explore",
        time: "1:00 PM",
        title: "Explore",
        detail: "Look for patterns, outliers, and interesting segments.",
        activityType: "investigate",
      },
      {
        id: "visualize",
        time: "2:00 PM",
        title: "Visualize",
        detail: "Make one chart that answers the question clearly.",
        activityType: "deep_work",
      },
      {
        id: "write-story",
        time: "3:00 PM",
        title: "Write the story",
        detail: "Summarize insights, caveats, and recommended next steps.",
        activityType: "write",
      },
      {
        id: "share",
        time: "4:00 PM",
        title: "Share + iterate",
        detail: "Present findings, collect feedback, and refine.",
        activityType: "sync",
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
        id: "metrics",
        time: "9:00 AM",
        title: "Check metrics",
        detail: "Review what changed overnight and flag surprises.",
        activityType: "investigate",
      },
      {
        id: "customer-time",
        time: "10:00 AM",
        title: "Customer time",
        detail: "Read feedback, run an interview, or review support tickets.",
        activityType: "sync",
      },
      {
        id: "write-brief",
        time: "11:00 AM",
        title: "Write a brief",
        detail: "Draft a clear goal, scope, and success metric for a feature.",
        activityType: "write",
      },
      {
        id: "recharge",
        time: "12:00 PM",
        title: "Recharge",
        detail: "Take a break and reset before meetings.",
        activityType: "break",
      },
      {
        id: "team-sync",
        time: "1:00 PM",
        title: "Team sync",
        detail: "Align with engineering and design on tradeoffs and timeline.",
        activityType: "sync",
      },
      {
        id: "prioritize",
        time: "2:00 PM",
        title: "Prioritize",
        detail:
          "Compare options and decide what to do next (and what to skip).",
        activityType: "plan",
      },
      {
        id: "review",
        time: "3:00 PM",
        title: "Review",
        detail: "Look at designs or builds and confirm they meet the goal.",
        activityType: "review",
      },
      {
        id: "communicate",
        time: "4:00 PM",
        title: "Communicate",
        detail: "Share updates and keep everyone aligned on what’s shipping.",
        activityType: "write",
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
        id: "review-notes",
        time: "9:00 AM",
        title: "Review notes",
        detail: "Scan research notes and pick a problem to focus on today.",
        activityType: "investigate",
      },
      {
        id: "map-flow",
        time: "10:00 AM",
        title: "Map the flow",
        detail: "Sketch the steps someone takes and where they get stuck.",
        activityType: "plan",
      },
      {
        id: "prototype",
        time: "11:00 AM",
        title: "Prototype",
        detail: "Build a quick clickable prototype to test an idea.",
        activityType: "deep_work",
      },
      {
        id: "recharge",
        time: "12:00 PM",
        title: "Recharge",
        detail: "Take a break and come back with fresh eyes.",
        activityType: "break",
      },
      {
        id: "test",
        time: "1:00 PM",
        title: "Test",
        detail: "Run a short usability test and listen for confusion points.",
        activityType: "investigate",
      },
      {
        id: "iterate",
        time: "2:00 PM",
        title: "Iterate",
        detail: "Revise the design to remove friction and clarify language.",
        activityType: "deep_work",
      },
      {
        id: "design-review",
        time: "3:00 PM",
        title: "Design review",
        detail: "Share options, explain tradeoffs, and decide next steps.",
        activityType: "review",
      },
      {
        id: "handoff",
        time: "4:00 PM",
        title: "Handoff",
        detail: "Write specs and notes so engineering can implement smoothly.",
        activityType: "write",
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
        id: "review-outputs",
        time: "9:00 AM",
        title: "Review outputs",
        detail: "Look at examples from yesterday and note failure cases.",
        activityType: "review",
      },
      {
        id: "experiment",
        time: "10:00 AM",
        title: "Experiment",
        detail: "Try prompt variants or model settings and log results.",
        activityType: "deep_work",
      },
      {
        id: "evaluate",
        time: "11:00 AM",
        title: "Evaluate",
        detail:
          "Score outputs using a checklist and compare against a baseline.",
        activityType: "review",
      },
      {
        id: "recharge",
        time: "12:00 PM",
        title: "Recharge",
        detail: "Take a break and reset your judgment.",
        activityType: "break",
      },
      {
        id: "safety-check",
        time: "1:00 PM",
        title: "Safety check",
        detail: "Identify risky outputs and add guardrails or refusal rules.",
        activityType: "investigate",
      },
      {
        id: "build-test-set",
        time: "2:00 PM",
        title: "Build a test set",
        detail: "Add representative examples that cover edge cases.",
        activityType: "write",
      },
      {
        id: "share-findings",
        time: "3:00 PM",
        title: "Share findings",
        detail: "Summarize what improved and what still fails.",
        activityType: "write",
      },
      {
        id: "ship-iteration",
        time: "4:00 PM",
        title: "Ship iteration",
        detail: "Implement changes, then monitor for regressions.",
        activityType: "ship",
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
        id: "triage",
        time: "9:00 AM",
        title: "Triage alerts",
        detail: "Review dashboards, confirm what’s real, and prioritize.",
        activityType: "investigate",
      },
      {
        id: "investigate",
        time: "10:00 AM",
        title: "Investigate",
        detail:
          "Follow the evidence trail: logs, accounts, and suspicious events.",
        activityType: "investigate",
      },
      {
        id: "harden",
        time: "11:00 AM",
        title: "Harden",
        detail: "Fix the root cause (permissions, MFA, patches, monitoring).",
        activityType: "ship",
      },
      {
        id: "recharge",
        time: "12:00 PM",
        title: "Recharge",
        detail: "Take a break and reset.",
        activityType: "break",
      },
      {
        id: "threat-model",
        time: "1:00 PM",
        title: "Threat model",
        detail: "Ask: what could go wrong, and how would we notice?",
        activityType: "plan",
      },
      {
        id: "write-guidance",
        time: "2:00 PM",
        title: "Write guidance",
        detail: "Create a short checklist people can follow.",
        activityType: "write",
      },
      {
        id: "practice",
        time: "3:00 PM",
        title: "Practice response",
        detail: "Run a tabletop exercise or confirm incident playbooks.",
        activityType: "sync",
      },
      {
        id: "report",
        time: "4:00 PM",
        title: "Report",
        detail: "Share what happened, what changed, and what to watch next.",
        activityType: "write",
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

interface RoleWorkspaceConfig {
  roleTitle: string;
  tools: string[];
  artifact: string;
  defaultInputs: Array<{ label: string; value: string }>;
}

const roleWorkspaceConfigBySlug: Record<string, RoleWorkspaceConfig> = {
  "software-engineer": {
    roleTitle: "Software Engineer",
    tools: ["Issue tracker", "Editor", "PR review"],
    artifact: "implementation plan",
    defaultInputs: [
      { label: "Task", value: "Fix a bug in the login flow" },
      { label: "Constraints", value: "Keep changes small and testable" },
      { label: "Signal", value: "Users can sign in reliably" },
    ],
  },
  "data-analyst": {
    roleTitle: "Data Analyst",
    tools: ["SQL", "Spreadsheet", "Charts"],
    artifact: "analysis summary",
    defaultInputs: [
      { label: "Question", value: "What changed in weekly engagement?" },
      { label: "Dataset", value: "Events table + cohort list" },
      { label: "Decision", value: "Where should we focus next week?" },
    ],
  },
  "product-manager": {
    roleTitle: "Product Manager",
    tools: ["Notes", "Roadmap", "PRD"],
    artifact: "product brief",
    defaultInputs: [
      { label: "Goal", value: "Reduce time-to-first-success for new learners" },
      { label: "User signal", value: "Fewer drop-offs after signup" },
      { label: "Constraints", value: "Ship in one week" },
    ],
  },
  "ux-designer": {
    roleTitle: "UX Designer",
    tools: ["Sketches", "Prototype", "Usability test"],
    artifact: "prototype notes",
    defaultInputs: [
      { label: "Problem", value: "Learners can’t find the next step" },
      { label: "Audience", value: "New users on mobile" },
      { label: "Constraint", value: "Keep language simple and inclusive" },
    ],
  },
  "ai-ml-practitioner": {
    roleTitle: "AI / ML Practitioner",
    tools: ["Prompt variants", "Eval set", "Safety checks"],
    artifact: "evaluation checklist",
    defaultInputs: [
      { label: "Task", value: "Summarize a learner’s notes into action items" },
      { label: "Failure case", value: "Hallucinated action items" },
      { label: "Goal", value: "Accurate, actionable summaries" },
    ],
  },
  "cybersecurity-analyst": {
    roleTitle: "Cybersecurity Analyst",
    tools: ["Alerts", "Logs", "Incident notes"],
    artifact: "incident report",
    defaultInputs: [
      { label: "Alert", value: "Unusual login attempt spike" },
      { label: "System", value: "Auth service" },
      { label: "Goal", value: "Confirm what’s real and reduce risk" },
    ],
  },
};

export function getCareerBySlug(slug: string) {
  return careerDetails[slug] ?? null;
}

export function getDayInLifeEntry(options: { slug: string; entryId: string }) {
  const career = getCareerBySlug(options.slug);
  if (!career) return null;

  const entry = career.dayInLife.find((item) => item.id === options.entryId);
  if (!entry) return null;

  return { career, entry };
}

function titleForActivity(activityType: ActivityType) {
  switch (activityType) {
    case "plan":
      return "Plan";
    case "deep_work":
      return "Deep work";
    case "review":
      return "Review";
    case "break":
      return "Recharge";
    case "sync":
      return "Sync";
    case "investigate":
      return "Investigate";
    case "write":
      return "Write";
    case "ship":
      return "Ship";
    default:
      return "Practice";
  }
}

export function buildMockWorkspace(options: {
  careerSlug: string;
  entry: DayInLifeEntry;
}) {
  const roleConfig = roleWorkspaceConfigBySlug[options.careerSlug];

  if (!roleConfig) {
    return {
      title: "Mock workspace",
      scenario: "Try the activity using a lightweight, guided template.",
      inputs: [{ label: "Goal", value: "Make progress on a realistic task" }],
      checklist: [
        "Set a goal",
        "Do one focused step",
        "Write what you learned",
      ],
      promptTemplate: "Goal:\n\nContext:\n\nWork:\n\nResult:\n\nNext step:\n",
      outputPlaceholder:
        "Write your notes here. Pretend you’re doing the task for real.",
    } satisfies MockWorkspace;
  }

  const activityTitle = titleForActivity(options.entry.activityType);
  const toolsLine = roleConfig.tools.join(" · ");

  const basePrompt =
    `Role: ${roleConfig.roleTitle}\n` +
    `Activity: ${options.entry.title}\n` +
    `Tools: ${toolsLine}\n\n` +
    "Goal:\n" +
    "\n" +
    "Context:\n" +
    "\n" +
    "Work:\n" +
    "\n" +
    "Result:\n" +
    "\n" +
    "Next step:\n";

  const baseChecklist = [
    "Restate the goal in one sentence",
    "List constraints or assumptions",
    `Create one small ${roleConfig.artifact}`,
    "Write the next step you would do",
  ];

  const activityChecklistByType: Record<ActivityType, string[]> = {
    plan: [
      "Pick a single success metric",
      "Define scope: what’s in vs out",
      "Write a plan with 3 steps",
      "Identify one risk and a mitigation",
    ],
    deep_work: [
      "Set a 20-minute timer",
      "Do the next smallest action",
      "Note what you learned",
      "Stop when you hit the timer",
    ],
    review: [
      "State what you’re reviewing",
      "Find 1 thing that’s working",
      "Find 1 risk or edge case",
      "Propose 1 improvement",
    ],
    break: [
      "Step away from the screen",
      "Write one sentence: what’s the goal after the break?",
      "Return and do one small action",
    ],
    sync: [
      "Write a 1-sentence update",
      "List one blocker (if any)",
      "Ask one clear question",
      "Confirm the next decision",
    ],
    investigate: [
      "Describe the issue in plain language",
      "List 2 possible causes",
      "Write the first test you’d run",
      "Log what evidence you’d collect",
    ],
    write: [
      "Decide the audience (who is this for?)",
      "Write a short structure (3 bullets)",
      "Draft the first version",
      "Add 1 example",
    ],
    ship: [
      "Define what ‘done’ means",
      "Check one edge case",
      "Write a short release note",
      "List what to monitor after shipping",
    ],
  };

  const scenarioByType: Record<ActivityType, string> = {
    plan: `You’re starting a work block as a ${roleConfig.roleTitle}. Create a clear plan you could hand to someone else.`,
    deep_work: `You have a focused work block. Make progress on a realistic task, then stop and capture what you learned.`,
    review: `You’re reviewing work from a teammate. Practice giving clear, respectful feedback and identifying risks.`,
    break: `Recharge is part of doing good work. Use this block to reset and pick one small next action.`,
    sync: `You’re in a quick sync. Practice sharing updates and asking one crisp question.`,
    investigate: `You’re investigating something unclear. Practice forming hypotheses and collecting evidence.`,
    write: `You’re writing an artifact others will use. Practice clarity, structure, and examples.`,
    ship: `You’re getting ready to ship. Practice defining “done”, checking edge cases, and planning monitoring.`,
  };

  const outputPlaceholderByType: Record<ActivityType, string> = {
    plan: "Write your plan (goal, scope, steps, risks).",
    deep_work: "Write what you did, what you found, and what you’d do next.",
    review:
      "Write feedback you’d leave on a PR/doc. Keep it specific and kind.",
    break: "Write a short reset note and one next action.",
    sync: "Write your update + question + next decision.",
    investigate: "Write your hypotheses and the first test you’d run.",
    write: "Draft the artifact with structure and examples.",
    ship: "Write the checklist you’d use before shipping.",
  };

  return {
    title: `${activityTitle} workspace`,
    scenario: scenarioByType[options.entry.activityType],
    inputs: roleConfig.defaultInputs,
    checklist: [
      ...activityChecklistByType[options.entry.activityType],
      ...baseChecklist,
    ],
    promptTemplate: basePrompt,
    outputPlaceholder: outputPlaceholderByType[options.entry.activityType],
  } satisfies MockWorkspace;
}
