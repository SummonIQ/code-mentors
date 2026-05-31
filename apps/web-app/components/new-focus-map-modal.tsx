"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function NewFocusMapModal() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setIsSubmitting(true);

    const formData = new FormData(event.currentTarget);
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;

    try {
      const response = await fetch("/api/mentor/focus-maps", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          description: description || undefined,
        }),
      });

      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        throw new Error(data.error || "Failed to create focus map");
      }

      router.push("/focus-maps");
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
          New focus map
        </h2>
        <p className="mt-2 text-sm text-[color:var(--cs-ink-muted)]">
          Capture key skills and how they connect.
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
              placeholder="e.g., Prompting Fundamentals"
              required
              type="text"
            />
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
              placeholder="What should learners be able to do after mastering this map?"
              rows={3}
            />
          </div>

          {error ? <p className="text-sm text-red-600">{error}</p> : null}

          <div className="flex flex-wrap gap-2 pt-1">
            <Link
              className="rounded-full border border-[color:var(--cs-stroke)] bg-white/80 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-[color:var(--cs-ink-muted)]"
              href="/focus-maps"
            >
              Close
            </Link>
            <button
              className="rounded-full bg-[color:var(--cs-ink)] px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-white disabled:opacity-50"
              disabled={isSubmitting}
              type="submit"
            >
              {isSubmitting ? "Creating..." : "Create map"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
