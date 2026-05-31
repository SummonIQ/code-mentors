"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";

import { ChevronDown, ChevronUp } from "lucide-react";

import { signOut, useSession } from "@/lib/auth/client";

function getInitials(name: string) {
  const parts = name
    .split(" ")
    .map((part) => part.trim())
    .filter(Boolean);

  if (!parts.length) {
    return "?";
  }

  const first = parts[0]?.[0] ?? "?";
  const last = parts.length > 1 ? (parts[parts.length - 1]?.[0] ?? "") : "";

  return `${first}${last}`.toUpperCase();
}

export function UserMenu() {
  const router = useRouter();
  const { data } = useSession();
  const user = data?.user;

  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const displayName = useMemo(() => {
    if (!user) return "";
    return user.name || user.email || "";
  }, [user]);

  const initials = useMemo(() => {
    return displayName ? getInitials(displayName) : "?";
  }, [displayName]);

  useEffect(() => {
    function onPointerDown(event: MouseEvent) {
      const target = event.target;
      if (!(target instanceof Node)) return;
      if (!containerRef.current?.contains(target)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("pointerdown", onPointerDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
    };
  }, []);

  if (!user) {
    return null;
  }

  async function handleSignOut() {
    setIsOpen(false);

    await signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/login");
        },
      },
    });
  }

  return (
    <div className="relative" ref={containerRef}>
      <button
        className="flex items-center gap-3 rounded-2xl border border-[color:var(--cs-stroke)] bg-white/70 px-3 py-2 text-left text-sm text-[color:var(--cs-ink)] transition hover:bg-white"
        onClick={() => setIsOpen((value) => !value)}
        type="button"
      >
        <div className="relative flex h-9 w-9 items-center justify-center overflow-hidden rounded-2xl bg-[color:var(--cs-ink)] text-xs font-semibold text-[color:var(--cs-paper-strong)]">
          {user.image ? (
            <Image
              alt=""
              className="h-full w-full object-cover"
              height={36}
              loader={({ src }) => src}
              src={user.image}
              unoptimized
              width={36}
            />
          ) : (
            initials
          )}
        </div>
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold">
            {displayName || user.email}
          </p>
          <p className="truncate text-xs text-[color:var(--cs-ink-muted)]">
            {user.email}
          </p>
        </div>

        <div className="ml-auto flex items-center">
          {isOpen ? (
            <ChevronUp className="h-4 w-4 text-[color:var(--cs-ink-muted)]" />
          ) : (
            <ChevronDown className="h-4 w-4 text-[color:var(--cs-ink-muted)]" />
          )}
        </div>
      </button>

      {isOpen ? (
        <div className="absolute right-0 z-50 mt-2 w-56 overflow-hidden rounded-2xl border border-[color:var(--cs-stroke)] bg-white shadow-lg">
          <div className="px-4 py-3">
            <p className="text-xs uppercase tracking-[0.22em] text-[color:var(--cs-ink-muted)]">
              Account
            </p>
            <p className="mt-1 truncate text-sm font-semibold text-[color:var(--cs-ink)]">
              {displayName || user.email}
            </p>
          </div>
          <div className="border-t border-[color:var(--cs-stroke)]">
            <Link
              className="block px-4 py-3 text-sm text-[color:var(--cs-ink)] hover:bg-[rgba(43,215,255,0.12)]"
              href="/challenge-library"
              onClick={() => setIsOpen(false)}
            >
              Challenge library
            </Link>
            <button
              className="w-full px-4 py-3 text-left text-sm text-[color:var(--cs-ink)] hover:bg-[rgba(255,0,0,0.08)]"
              onClick={handleSignOut}
              type="button"
            >
              Sign out
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
}
