import Link from "next/link";
import {
  BookOpen,
  LayoutDashboard,
  Map,
  Rocket,
  Settings,
  Users,
  Video,
} from "lucide-react";

import { UserMenu } from "@/components/user-menu";

const navItems = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "Sessions", href: "/sessions", icon: Video },
  { label: "Challenges", href: "/challenges", icon: Rocket },
  { label: "People", href: "/people", icon: Users },
  { label: "Curriculum", href: "/curriculum", icon: BookOpen },
  { label: "Focus Maps", href: "/focus-maps", icon: Map },
  { label: "Settings", href: "/settings", icon: Settings },
];

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative min-h-screen px-6 py-10 sm:px-10">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-grid opacity-20" />
        <div className="absolute inset-0 scanlines opacity-40" />
      </div>

      <div className="relative mx-auto flex w-full max-w-[1440px] flex-col gap-6 lg:flex-row">
        <aside className="glass-panel flex w-full flex-col rounded-[28px] border border-[color:var(--cs-stroke)] p-6 lg:sticky lg:top-8 lg:h-fit lg:w-72">
          <Link
            aria-label="Go to mentor dashboard"
            className="flex items-center gap-3"
            href="/dashboard"
          >
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[color:var(--cs-ink)] text-sm font-semibold text-[color:var(--cs-paper-strong)]">
              SS
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.32em] text-[color:var(--cs-ink-muted)]">
                SummonSkill
              </p>
              <p className="font-display text-xl font-semibold text-[color:var(--cs-ink)]">
                Mentor Console
              </p>
            </div>
          </Link>

          <div className="mt-6 flex-1 space-y-3">
            <p className="text-xs uppercase tracking-[0.3em] text-[color:var(--cs-ink-muted)]">
              Navigation
            </p>
            <div className="grid gap-2">
              {navItems.map((item) => {
                const Icon = item.icon;

                return (
                  <Link
                    key={item.href}
                    className="flex items-center gap-3 rounded-2xl border border-transparent px-3 py-2 text-sm font-medium text-[color:var(--cs-ink)] transition hover:border-[color:var(--cs-stroke)] hover:bg-white/70"
                    href={item.href}
                  >
                    <Icon className="h-4 w-4 text-[color:var(--cs-ink-muted)]" />
                    {item.label}
                  </Link>
                );
              })}
            </div>
          </div>

          <div className="mt-6">
            <UserMenu />
          </div>
        </aside>

        <div className="flex-1 space-y-6">{children}</div>
      </div>
    </div>
  );
}
