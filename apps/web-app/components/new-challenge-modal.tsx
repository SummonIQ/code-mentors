"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

const LEVEL_OPTIONS = [
  { value: "BEGINNER", label: "Beginner" },
  { value: "INTERMEDIATE", label: "Intermediate" },
  { value: "ADVANCED", label: "Advanced" },
] as const;

export function NewChallengeModal() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setIsSubmitting(true);

    const formData = new FormData(event.currentTarget);
    const title = formData.get("title") as string;
    const focus = formData.get("focus") as string;
    const level = formData.get("level") as string;
    const description = formData.get("description") as string;

    try {
      const response = await fetch("/api/mentor/challenges", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          focus,
          level,
          description: description || undefined,
        }),
      });

      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        throw new Error(data.error || "Failed to create challenge");
      }

      router.push("/challenges");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
      setIsSubmitting(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[rgba(11,15,20,0.35)] px-6 py-10">
      <div className="glass-panel animate-pop w-full max-w-lg rounded-[28px] border border-[color:var(--cs-stroke)] p-6">
        <p className="text-xs uppercase tracking-[0.32em] text-[color:var(--cs-ink-muted)]">
          Action dialog
        </p>
        <h2 className="mt-2 font-display text-2xl font-semibold text-[color:var(--cs-ink)]">
          New challenge
        </h2>
        <p className="mt-2 text-sm text-[color:var(--cs-ink-muted)]">
          Draft a beginner-friendly AI challenge with prompts, hints, and a
          rubric.
        </p>

        <form className="mt-5 space-y-4" onSubmit={handleSubmit}>
          <div>
            <label
              className="block text-xs font-semibold uppercase tracking-[0.2em] text-[color:var(--cs-ink-muted)]"
              htmlFor="title"
            >
              Title
            </label>
            <input
              autoFocus
              className="mt-1 w-full rounded-xl border border-[color:var(--cs-stroke)] bg-white/80 px-4 py-2 text-sm text-[color:var(--cs-ink)] placeholder:text-[color:var(--cs-ink-muted)] focus:border-[color:var(--cs-ink)] focus:outline-none"
              id="title"
              name="title"
              placeholder="e.g., Build a Story Generator"
              required
              type="text"
            />
          </div>

          <div>
            <label
              className="block text-xs font-semibold uppercase tracking-[0.2em] text-[color:var(--cs-ink-muted)]"
              htmlFor="focus"
            >
              Focus
            </label>
            <input
              className="mt-1 w-full rounded-xl border border-[color:var(--cs-stroke)] bg-white/80 px-4 py-2 text-sm text-[color:var(--cs-ink)] placeholder:text-[color:var(--cs-ink-muted)] focus:border-[color:var(--cs-ink)] focus:outline-none"
              id="focus"
              name="focus"
              placeholder="e.g., Prompt Engineering, Automation"
              required
              type="text"
            />
          </div>

          <div>
            <label
              className="block text-xs font-semibold uppercase tracking-[0.2em] text-[color:var(--cs-ink-muted)]"
              htmlFor="level"
            >
              Level
            </label>
            <select
              className="mt-1 w-full rounded-xl border border-[color:var(--cs-stroke)] bg-white/80 px-4 py-2 text-sm text-[color:var(--cs-ink)] focus:border-[color:var(--cs-ink)] focus:outline-none"
              id="level"
              name="level"
              required
            >
              {LEVEL_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label
              className="block text-xs font-semibold uppercase tracking-[0.2em] text-[color:var(--cs-ink-muted)]"
              htmlFor="description"
            >
              Description (optional)
            </label>
            <textarea
              className="mt-1 w-full resize-none rounded-xl border border-[color:var(--cs-stroke)] bg-white/80 px-4 py-2 text-sm text-[color:var(--cs-ink)] placeholder:text-[color:var(--cs-ink-muted)] focus:border-[color:var(--cs-ink)] focus:outline-none"
              id="description"
              name="description"
              placeholder="Brief description of the challenge..."
              rows={3}
            />
          </div>

          {error ? <p className="text-sm text-red-600">{error}</p> : null}

          <div className="flex flex-wrap gap-2 pt-1">
            <Link
              className="rounded-full border border-[color:var(--cs-stroke)] bg-white/80 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-[color:var(--cs-ink-muted)]"
              href="/challenges"
            >
              Close
            </Link>
            <button
              className="rounded-full bg-[color:var(--cs-ink)] px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-white disabled:opacity-50"
              disabled={isSubmitting}
              type="submit"
            >
              {isSubmitting ? "Creating..." : "Create draft"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
