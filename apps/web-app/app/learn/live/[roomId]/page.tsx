import Link from "next/link";

import { LiveRoom } from "@/components/live-room";

export default function LearnerLiveRoomPage({
  params,
}: {
  params: { roomId: string };
}) {
  const roomLabel = params.roomId.replace(/[-_]/g, " ");

  return (
    <div className="space-y-8">
      <header className="glass-panel rounded-[32px] border border-[color:var(--cs-stroke)] p-6">
        <p className="text-xs uppercase tracking-[0.32em] text-[color:var(--cs-ink-muted)]">
          Live room
        </p>
        <h1 className="font-display text-3xl font-semibold text-[color:var(--cs-ink)]">
          {roomLabel}
        </h1>
        <p className="mt-2 text-sm text-[color:var(--cs-ink-muted)]">
          Join the live session and build together.
        </p>
        <div className="mt-5 flex flex-wrap gap-2">
          <Link
            className="rounded-full border border-[color:var(--cs-stroke)] bg-white/80 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-[color:var(--cs-ink-muted)]"
            href="/learn/live"
          >
            Back
          </Link>
          <Link
            className="rounded-full bg-[color:var(--cs-ink)] px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-white"
            href="/learn/challenges"
          >
            Choose a challenge
          </Link>
        </div>
      </header>

      <LiveRoom exitHref="/learn/live" roomId={params.roomId} />
    </div>
  );
}
