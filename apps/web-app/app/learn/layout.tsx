import Link from "next/link";
import {
  BookOpen,
  Briefcase,
  Compass,
  Gauge,
  LayoutDashboard,
  Video,
} from "lucide-react";

import { UserMenu } from "@/components/user-menu";

const navItems = [
  { label: "Dashboard", href: "/learn", icon: LayoutDashboard },
  { label: "Challenges", href: "/learn/challenges", icon: BookOpen },
  { label: "Tracks", href: "/learn/tracks", icon: Compass },
  { label: "Careers", href: "/learn/careers", icon: Briefcase },
  { label: "Progress", href: "/learn/progress", icon: Gauge },
  { label: "Live", href: "/learn/live", icon: Video },
];

export default function LearnerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative min-h-screen overflow-hidden px-6 py-10 sm:px-10">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-grid opacity-20" />
        <div className="absolute inset-0 scanlines opacity-40" />
      </div>

      <div className="relative mx-auto w-full max-w-6xl space-y-8">
        <header className="glass-panel rounded-[28px] border border-[color:var(--cs-stroke)] p-5">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <Link
              aria-label="Go to learner dashboard"
              className="flex items-center gap-3"
              href="/learn"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[color:var(--cs-ink)] text-sm font-semibold text-[color:var(--cs-paper-strong)]">
                CS
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.32em] text-[color:var(--cs-ink-muted)]">
                  Coder School
                </p>
                <p className="font-display text-xl font-semibold text-[color:var(--cs-ink)]">
                  Learner Space
                </p>
              </div>
            </Link>

            <div className="flex flex-wrap items-center gap-2">
              <Link
                className="rounded-full border border-[color:var(--cs-stroke)] bg-white/80 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-[color:var(--cs-ink-muted)]"
                href="/"
              >
                Back home
              </Link>
              <Link
                className="rounded-full bg-[color:var(--cs-ink)] px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-white"
                href="/sessions"
              >
                Mentor console
              </Link>
              <UserMenu />
            </div>
          </div>

          <nav className="mt-5 flex flex-wrap gap-2">
            {navItems.map((item) => {
              const Icon = item.icon;

              return (
                <Link
                  key={item.href}
                  className="inline-flex items-center gap-2 rounded-full border border-[color:var(--cs-stroke)] bg-white/70 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-[color:var(--cs-ink-muted)] transition hover:bg-white"
                  href={item.href}
                >
                  <Icon className="h-4 w-4" />
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </header>

        <main className="space-y-8">{children}</main>
      </div>
    </div>
  );
}
