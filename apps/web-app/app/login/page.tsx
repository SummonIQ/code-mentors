"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";

import { authClient } from "@/lib/auth/client";

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const redirectTo = useMemo(() => {
    const value = searchParams.get("redirect_to");
    if (!value) return "/challenges";
    if (!value.startsWith("/")) return "/challenges";
    if (value.startsWith("/login") || value.startsWith("/signup")) {
      return "/challenges";
    }
    return value;
  }, [searchParams]);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setErrorMessage(null);
    setIsSubmitting(true);

    const { error } = await authClient.signIn.email({
      email,
      password,
    });

    if (error) {
      const message =
        typeof error === "string"
          ? error
          : "code" in error && typeof error.code === "string"
            ? error.code
            : "message" in error && typeof error.message === "string"
              ? error.message
              : JSON.stringify(error);

      setErrorMessage(message);
      setIsSubmitting(false);
      return;
    }

    router.push(redirectTo);
  }

  return (
    <div className="relative min-h-screen overflow-hidden">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-grid opacity-20" />
        <div className="absolute inset-0 scanlines opacity-30" />
      </div>

      <div className="relative mx-auto flex min-h-screen w-full max-w-2xl flex-col justify-center px-6 py-12">
        <div className="glass-panel rounded-[32px] border border-[color:var(--cs-stroke)] p-8">
          <p className="text-xs uppercase tracking-[0.32em] text-[color:var(--cs-ink-muted)]">
            Mentor access
          </p>
          <h1 className="mt-2 font-display text-3xl font-semibold text-[color:var(--cs-ink)]">
            Sign in
          </h1>
          <p className="mt-2 text-sm text-[color:var(--cs-ink-muted)]">
            Draft challenges are mentor-only. Sign in to manage drafts.
          </p>

          {errorMessage ? (
            <div className="mt-5 rounded-2xl border border-[rgba(255,0,0,0.25)] bg-[rgba(255,0,0,0.06)] px-4 py-3 text-sm text-[color:var(--cs-ink)]">
              {errorMessage}
            </div>
          ) : null}

          <form className="mt-6 space-y-4" onSubmit={onSubmit}>
            <div className="space-y-2">
              <label
                className="text-xs font-semibold uppercase tracking-[0.22em] text-[color:var(--cs-ink-muted)]"
                htmlFor="email"
              >
                Email
              </label>
              <input
                className="w-full rounded-2xl border border-[color:var(--cs-stroke)] bg-white/70 px-4 py-3 text-sm text-[color:var(--cs-ink)] outline-none focus:border-[color:var(--cs-accent)]"
                id="email"
                name="email"
                onChange={(event) => setEmail(event.target.value)}
                required
                type="email"
                value={email}
              />
            </div>

            <div className="space-y-2">
              <label
                className="text-xs font-semibold uppercase tracking-[0.22em] text-[color:var(--cs-ink-muted)]"
                htmlFor="password"
              >
                Password
              </label>
              <input
                className="w-full rounded-2xl border border-[color:var(--cs-stroke)] bg-white/70 px-4 py-3 text-sm text-[color:var(--cs-ink)] outline-none focus:border-[color:var(--cs-accent)]"
                id="password"
                name="password"
                onChange={(event) => setPassword(event.target.value)}
                required
                type="password"
                value={password}
              />
            </div>

            <button
              className="w-full rounded-full bg-[color:var(--cs-ink)] px-5 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-white disabled:cursor-not-allowed disabled:opacity-60"
              disabled={isSubmitting}
              type="submit"
            >
              {isSubmitting ? "Signing in" : "Sign in"}
            </button>
          </form>

          <div className="mt-6 flex flex-wrap items-center justify-between gap-3 text-sm text-[color:var(--cs-ink-muted)]">
            <Link className="underline" href="/signup">
              Create an account
            </Link>
            <Link className="underline" href="/">
              Back home
            </Link>
          </div>
        </div>

        <p className="mt-6 text-center text-xs text-[color:var(--cs-ink-muted)]">
          Published challenges are available at{" "}
          <Link className="underline" href="/challenge-library">
            /challenge-library
          </Link>
          .
        </p>
      </div>
    </div>
  );
}
