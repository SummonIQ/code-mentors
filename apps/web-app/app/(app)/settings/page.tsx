import Link from "next/link";

const preferences = [
  {
    title: "Cohort reminders",
    description: "Notify mentors 30 minutes before each session.",
  },
  {
    title: "Safety-first AI guardrails",
    description: "Enable content filters and monitoring.",
  },
  {
    title: "Weekly family summary",
    description: "Auto-send progress updates every Friday.",
  },
];

const integrations = [
  "Calendar sync",
  "Video conferencing",
  "Learning management system",
];

const workspacePolicies = [
  {
    title: "Default to safety",
    description:
      "Prefer conservative settings when working with young learners and public sharing.",
  },
  {
    title: "Make automations visible",
    description:
      "Avoid silent actions; learners should see what happened and why.",
  },
  {
    title: "Keep outcomes measurable",
    description:
      "Each session should end with a small artifact learners can show and explain.",
  },
  {
    title: "Capture feedback loops",
    description: "Store mentor notes and focus-map updates after each session.",
  },
];

const settingsShortcuts = [
  {
    label: "Open sessions",
    description: "Launch a room and manage live tools.",
    href: "/sessions",
  },
  {
    label: "Review reports",
    description: "Share weekly summaries with families.",
    href: "/reports",
  },
  {
    label: "Update focus maps",
    description: "Capture where learners are growing.",
    href: "/focus-maps",
  },
  {
    label: "Browse the library",
    description: "Use reusable assets and checklists.",
    href: "/library",
  },
];

export default function SettingsPage({
  searchParams,
}: {
  searchParams?: { panel?: string; integration?: string };
}) {
  const modal = searchParams?.panel
    ? {
        title: "Configure preference",
        description: searchParams.panel,
        primary: "Save preference",
      }
    : searchParams?.integration
      ? {
          title: "Connect integration",
          description: searchParams.integration,
          primary: "Connect",
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
                href="/settings"
              >
                Close
              </Link>
              <Link
                className="rounded-full bg-[color:var(--cs-ink)] px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-white"
                href="/settings"
              >
                {modal.primary}
              </Link>
            </div>
          </div>
        </div>
      ) : null}
      <header className="glass-panel rounded-[32px] border border-[color:var(--cs-stroke)] p-6">
        <p className="text-xs uppercase tracking-[0.32em] text-[color:var(--cs-ink-muted)]">
          Settings
        </p>
        <h1 className="font-display text-3xl font-semibold text-[color:var(--cs-ink)]">
          Workspace preferences
        </h1>
        <p className="mt-2 text-sm text-[color:var(--cs-ink-muted)]">
          Configure notifications, guardrails, and integrations.
        </p>
      </header>

      <section className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <div className="glass-panel rounded-2xl border border-[color:var(--cs-stroke)] p-4">
          <p className="text-xs uppercase tracking-[0.28em] text-[color:var(--cs-ink-muted)]">
            Preferences
          </p>
          <p className="mt-2 text-2xl font-semibold text-[color:var(--cs-ink)]">
            {preferences.length}
          </p>
          <p className="text-xs text-[color:var(--cs-ink-muted)]">
            Configurable panels
          </p>
        </div>

        <div className="glass-panel rounded-2xl border border-[color:var(--cs-stroke)] p-4">
          <p className="text-xs uppercase tracking-[0.28em] text-[color:var(--cs-ink-muted)]">
            Integrations
          </p>
          <p className="mt-2 text-2xl font-semibold text-[color:var(--cs-ink)]">
            {integrations.length}
          </p>
          <p className="text-xs text-[color:var(--cs-ink-muted)]">
            Available connectors
          </p>
        </div>

        <div className="glass-panel rounded-2xl border border-[color:var(--cs-stroke)] p-4">
          <p className="text-xs uppercase tracking-[0.28em] text-[color:var(--cs-ink-muted)]">
            Policies
          </p>
          <p className="mt-2 text-2xl font-semibold text-[color:var(--cs-ink)]">
            {workspacePolicies.length}
          </p>
          <p className="text-xs text-[color:var(--cs-ink-muted)]">
            Default standards
          </p>
        </div>

        <div className="glass-panel rounded-2xl border border-[color:var(--cs-stroke)] p-4">
          <p className="text-xs uppercase tracking-[0.28em] text-[color:var(--cs-ink-muted)]">
            Shortcuts
          </p>
          <p className="mt-2 text-2xl font-semibold text-[color:var(--cs-ink)]">
            {settingsShortcuts.length}
          </p>
          <p className="text-xs text-[color:var(--cs-ink-muted)]">
            Next actions
          </p>
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="glass-panel rounded-[28px] border border-[color:var(--cs-stroke)] p-6">
          <h2 className="font-display text-2xl font-semibold text-[color:var(--cs-ink)]">
            Preferences
          </h2>
          <div className="mt-5 divide-y divide-[color:var(--cs-stroke)]">
            {preferences.map((item) => (
              <div key={item.title} className="py-4 first:pt-0 last:pb-0">
                <p className="text-base font-semibold text-[color:var(--cs-ink)]">
                  {item.title}
                </p>
                <p className="text-sm text-[color:var(--cs-ink-muted)]">
                  {item.description}
                </p>
                <Link
                  className="mt-3 inline-flex rounded-full border border-[color:var(--cs-stroke)] bg-white/80 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-[color:var(--cs-ink-muted)]"
                  href={`/settings?panel=${encodeURIComponent(item.title)}`}
                >
                  Configure
                </Link>
              </div>
            ))}
          </div>
        </div>

        <div className="glass-panel rounded-[28px] border border-[color:var(--cs-stroke)] p-6">
          <h2 className="font-display text-2xl font-semibold text-[color:var(--cs-ink)]">
            Integrations
          </h2>
          <p className="text-sm text-[color:var(--cs-ink-muted)]">
            Connect the tools you already use.
          </p>
          <div className="mt-5 space-y-3">
            {integrations.map((item) => (
              <div
                key={item}
                className="flex items-center justify-between rounded-2xl border border-[color:var(--cs-stroke)] bg-[color:var(--cs-paper-strong)] px-4 py-3"
              >
                <p className="text-sm font-semibold text-[color:var(--cs-ink)]">
                  {item}
                </p>
                <Link
                  className="rounded-full bg-[color:var(--cs-ink)] px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-white"
                  href={`/settings?integration=${encodeURIComponent(item)}`}
                >
                  Connect
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="glass-panel rounded-[28px] border border-[color:var(--cs-stroke)] p-6">
          <h2 className="font-display text-2xl font-semibold text-[color:var(--cs-ink)]">
            Workspace policies
          </h2>
          <p className="text-sm text-[color:var(--cs-ink-muted)]">
            Shared defaults that keep the program consistent.
          </p>
          <div className="mt-5 space-y-3">
            {workspacePolicies.map((policy) => (
              <div
                key={policy.title}
                className="rounded-2xl border border-[color:var(--cs-stroke)] bg-[color:var(--cs-paper-strong)] px-4 py-3"
              >
                <p className="text-sm font-semibold text-[color:var(--cs-ink)]">
                  {policy.title}
                </p>
                <p className="mt-1 text-xs text-[color:var(--cs-ink-muted)]">
                  {policy.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="glass-panel rounded-[28px] border border-[color:var(--cs-stroke)] p-6">
          <h2 className="font-display text-2xl font-semibold text-[color:var(--cs-ink)]">
            Quick links
          </h2>
          <p className="text-sm text-[color:var(--cs-ink-muted)]">
            Jump to the next workflow.
          </p>
          <div className="mt-5 space-y-3">
            {settingsShortcuts.map((shortcut) => (
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
