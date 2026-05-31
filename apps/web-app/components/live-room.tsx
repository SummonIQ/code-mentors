"use client";

import Link from "next/link";
import {
  useState,
  useRef,
  useEffect,
  useMemo,
  type FormEvent,
  type PointerEvent,
} from "react";
import { Track } from "livekit-client";
import { Camera, Monitor, MonitorOff, Send, Users } from "lucide-react";
import { LiveKitAudio, LiveKitVideo } from "./livekit-track-media";
import { usePresenceChannel } from "@/hooks/use-presence-channel";
import { useLiveKitRoom } from "@/hooks/use-livekit-room";

type ActiveView = "webcam" | "screen";
type LayoutPreset = "presenter" | "coach";

interface LiveRoomProps {
  roomId?: string;
  exitHref?: string;
}

export function LiveRoom({
  roomId = "session-room",
  exitHref = "/sessions",
}: LiveRoomProps) {
  const [chatInput, setChatInput] = useState("");
  const [activeView, setActiveView] = useState<ActiveView>("webcam");
  const [layoutPreset, setLayoutPreset] = useState<LayoutPreset>("presenter");
  const [isAnnotating, setIsAnnotating] = useState(false);
  const [facecamPosition, setFacecamPosition] = useState({ x: 24, y: 24 });
  const screenStageRef = useRef<HTMLDivElement>(null);
  const annotationCanvasRef = useRef<HTMLCanvasElement>(null);
  const isDrawingRef = useRef(false);
  const lastPointRef = useRef<{ x: number; y: number } | null>(null);
  const facecamDragRef = useRef<{
    startPointerX: number;
    startPointerY: number;
    startX: number;
    startY: number;
  } | null>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  const channelName = useMemo(() => {
    const normalizedRoomId = roomId.trim() || "session-room";
    return `presence-live-${normalizedRoomId}`;
  }, [roomId]);

  const {
    isConnecting,
    isConnected: isLiveKitConnected,
    error: liveKitError,
    localCameraTrack,
    localMicrophoneTrack,
    localScreenTrack,
    remoteParticipants,
    startScreenShare,
    stopScreenShare,
  } = useLiveKitRoom(roomId);

  const remoteAudioTracks = useMemo(() => {
    return remoteParticipants
      .flatMap((participant) =>
        Array.from(participant.audioTrackPublications.values()),
      )
      .map((publication) => publication.track);
  }, [remoteParticipants]);

  const remoteScreenTrack = useMemo(() => {
    for (const participant of remoteParticipants) {
      const publications = Array.from(
        participant.videoTrackPublications.values(),
      );
      const screenPublication = publications.find(
        (publication) =>
          publication.source === Track.Source.ScreenShare &&
          Boolean(publication.track),
      );
      if (screenPublication?.track) return screenPublication.track;
    }
    return null;
  }, [remoteParticipants]);

  const remoteCameraTracks = useMemo(() => {
    return remoteParticipants
      .flatMap((participant) =>
        Array.from(participant.videoTrackPublications.values()),
      )
      .filter((publication) => publication.source === Track.Source.Camera)
      .map((publication) => publication.track);
  }, [remoteParticipants]);

  const remotePrimaryCameraTrack = useMemo(() => {
    return remoteCameraTracks.find((track) => Boolean(track)) ?? null;
  }, [remoteCameraTracks]);

  const screenTrack = localScreenTrack ?? remoteScreenTrack;
  const isSomeoneScreenSharing = Boolean(screenTrack);
  const isLocalScreenSharing = Boolean(localScreenTrack);

  const {
    members,
    messages,
    myName,
    isConnected,
    sendMessage,
    typingNames,
    setIsTyping,
  } = usePresenceChannel(channelName);

  const typingTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const stage = screenStageRef.current;
    const canvas = annotationCanvasRef.current;
    if (!stage || !canvas) return;

    function syncCanvasSize() {
      const rect = stage.getBoundingClientRect();
      const dpr =
        typeof window !== "undefined" ? window.devicePixelRatio || 1 : 1;
      canvas.width = Math.max(1, Math.round(rect.width * dpr));
      canvas.height = Math.max(1, Math.round(rect.height * dpr));
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
      const context = canvas.getContext("2d");
      if (context) {
        context.setTransform(dpr, 0, 0, dpr, 0, 0);
        context.lineCap = "round";
        context.lineJoin = "round";
        context.strokeStyle = "rgba(43, 215, 255, 0.95)";
        context.lineWidth = 3;
      }
    }

    syncCanvasSize();
    const observer = new ResizeObserver(() => syncCanvasSize());
    observer.observe(stage);
    return () => observer.disconnect();
  }, [activeView, layoutPreset, isSomeoneScreenSharing]);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = async (e: FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;
    await sendMessage(chatInput);
    setChatInput("");
    setIsTyping(false);
  };

  useEffect(() => {
    return () => {
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (isSomeoneScreenSharing) {
      setActiveView("screen");
      return;
    }

    setActiveView("webcam");
    setIsAnnotating(false);
  }, [isSomeoneScreenSharing]);

  function handleClearAnnotations() {
    const canvas = annotationCanvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext("2d");
    if (!context) return;
    context.clearRect(0, 0, canvas.width, canvas.height);
  }

  function getCanvasPoint(event: PointerEvent<HTMLCanvasElement>) {
    const stage = screenStageRef.current;
    if (!stage) return null;
    const rect = stage.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    if (Number.isNaN(x) || Number.isNaN(y)) return null;
    return { x, y };
  }

  function handleAnnotationPointerDown(event: PointerEvent<HTMLCanvasElement>) {
    if (!isAnnotating) return;
    const canvas = annotationCanvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext("2d");
    if (!context) return;

    const point = getCanvasPoint(event);
    if (!point) return;

    isDrawingRef.current = true;
    lastPointRef.current = point;
    event.currentTarget.setPointerCapture(event.pointerId);
    context.beginPath();
    context.moveTo(point.x, point.y);
  }

  function handleAnnotationPointerMove(event: PointerEvent<HTMLCanvasElement>) {
    if (!isAnnotating || !isDrawingRef.current) return;
    const canvas = annotationCanvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext("2d");
    if (!context) return;
    const point = getCanvasPoint(event);
    if (!point) return;
    const last = lastPointRef.current;
    if (!last) {
      lastPointRef.current = point;
      return;
    }
    context.beginPath();
    context.moveTo(last.x, last.y);
    context.lineTo(point.x, point.y);
    context.stroke();
    lastPointRef.current = point;
  }

  function handleAnnotationPointerUp(event: PointerEvent<HTMLCanvasElement>) {
    if (!isAnnotating) return;
    isDrawingRef.current = false;
    lastPointRef.current = null;
    try {
      event.currentTarget.releasePointerCapture(event.pointerId);
    } catch {
      // ignore
    }
  }

  function handleFacecamPointerDown(event: PointerEvent<HTMLDivElement>) {
    if (
      activeView !== "screen" ||
      !isSomeoneScreenSharing ||
      layoutPreset !== "presenter"
    ) {
      return;
    }

    event.currentTarget.setPointerCapture(event.pointerId);
    facecamDragRef.current = {
      startPointerX: event.clientX,
      startPointerY: event.clientY,
      startX: facecamPosition.x,
      startY: facecamPosition.y,
    };
  }

  function handleFacecamPointerMove(event: PointerEvent<HTMLDivElement>) {
    const dragState = facecamDragRef.current;
    const stage = screenStageRef.current;
    if (!dragState || !stage) return;
    const rect = stage.getBoundingClientRect();
    const nextX = dragState.startX + (event.clientX - dragState.startPointerX);
    const nextY = dragState.startY + (event.clientY - dragState.startPointerY);
    const maxX = Math.max(0, rect.width - 260);
    const maxY = Math.max(0, rect.height - 180);
    setFacecamPosition({
      x: Math.max(0, Math.min(maxX, nextX)),
      y: Math.max(0, Math.min(maxY, nextY)),
    });
  }

  function handleFacecamPointerUp(event: PointerEvent<HTMLDivElement>) {
    facecamDragRef.current = null;
    try {
      event.currentTarget.releasePointerCapture(event.pointerId);
    } catch {
      // ignore
    }
  }

  return (
    <section className="glass-panel rounded-[28px] border border-[color:var(--cs-stroke)] p-6">
      {remoteAudioTracks.map((track) =>
        track ? <LiveKitAudio key={track.sid} track={track} /> : null,
      )}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-xs uppercase tracking-[0.32em] text-[color:var(--cs-ink-muted)]">
            Live room
          </p>
          <h2 className="font-display text-2xl font-semibold text-[color:var(--cs-ink)]">
            AI Helper Build · Room is open
          </h2>
          <p className="text-sm text-[color:var(--cs-ink-muted)]">
            Video, chat, and screen share are live for the cohort.
          </p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={isLocalScreenSharing ? stopScreenShare : startScreenShare}
            disabled={!isLiveKitConnected}
            className={`flex items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] transition ${
              isLocalScreenSharing
                ? "bg-[color:var(--cs-accent)] text-white"
                : "border border-[color:var(--cs-stroke)] bg-white/80 text-[color:var(--cs-ink-muted)] hover:bg-white"
            }`}
            type="button"
          >
            {isLocalScreenSharing ? (
              <>
                <MonitorOff className="h-4 w-4" />
                Stop sharing
              </>
            ) : (
              <>
                <Monitor className="h-4 w-4" />
                Share screen
              </>
            )}
          </button>
          <Link
            className="rounded-full border border-[color:var(--cs-stroke)] bg-white/80 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-[color:var(--cs-ink-muted)]"
            href={exitHref}
          >
            Exit room
          </Link>
        </div>
      </div>

      <div className="mt-5 grid gap-6 lg:grid-cols-[1.4fr_0.6fr]">
        <div className="space-y-4">
          {!isLiveKitConnected ? (
            <div className="rounded-2xl border border-[color:var(--cs-stroke)] bg-white/70 px-4 py-3 text-xs text-[color:var(--cs-ink-muted)]">
              {isConnecting ? "Connecting to LiveKit..." : "Connecting..."}
              {liveKitError ? ` (${liveKitError})` : null}
            </div>
          ) : null}

          {isSomeoneScreenSharing && (
            <div className="flex items-center gap-2 rounded-full bg-[color:var(--cs-paper-strong)] p-1">
              <button
                onClick={() => setActiveView("screen")}
                className={`flex items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] transition ${
                  activeView === "screen"
                    ? "bg-[color:var(--cs-accent)] text-white"
                    : "text-[color:var(--cs-ink-muted)] hover:bg-white/50"
                }`}
                type="button"
              >
                <Monitor className="h-4 w-4" />
                Screen
              </button>
              <button
                onClick={() => setActiveView("webcam")}
                className={`flex items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] transition ${
                  activeView === "webcam"
                    ? "bg-[color:var(--cs-ink)] text-white"
                    : "text-[color:var(--cs-ink-muted)] hover:bg-white/50"
                }`}
                type="button"
              >
                <Camera className="h-4 w-4" />
                Webcam
              </button>
            </div>
          )}

          {activeView === "screen" && isSomeoneScreenSharing ? (
            <div className="flex flex-wrap items-center justify-between gap-2 rounded-2xl border border-[color:var(--cs-stroke)] bg-white/70 px-4 py-3">
              <div className="flex flex-wrap gap-2">
                <button
                  className={`rounded-full px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] transition ${
                    layoutPreset === "presenter"
                      ? "bg-[color:var(--cs-ink)] text-white"
                      : "border border-[color:var(--cs-stroke)] bg-white/80 text-[color:var(--cs-ink-muted)] hover:bg-white"
                  }`}
                  onClick={() => setLayoutPreset("presenter")}
                  type="button"
                >
                  Presenter
                </button>
                <button
                  className={`rounded-full px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] transition ${
                    layoutPreset === "coach"
                      ? "bg-[color:var(--cs-ink)] text-white"
                      : "border border-[color:var(--cs-stroke)] bg-white/80 text-[color:var(--cs-ink-muted)] hover:bg-white"
                  }`}
                  onClick={() => setLayoutPreset("coach")}
                  type="button"
                >
                  Coach
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                <button
                  className={`rounded-full px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] transition ${
                    isAnnotating
                      ? "bg-[color:var(--cs-accent)] text-white"
                      : "border border-[color:var(--cs-stroke)] bg-white/80 text-[color:var(--cs-ink-muted)] hover:bg-white"
                  }`}
                  onClick={() => setIsAnnotating((value) => !value)}
                  type="button"
                >
                  {isAnnotating ? "Annotating" : "Annotate"}
                </button>
                <button
                  className="rounded-full border border-[color:var(--cs-stroke)] bg-white/80 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-[color:var(--cs-ink-muted)] hover:bg-white"
                  onClick={handleClearAnnotations}
                  type="button"
                >
                  Clear
                </button>
              </div>
            </div>
          ) : null}

          {activeView === "screen" && isSomeoneScreenSharing ? (
            layoutPreset === "coach" ? (
              <div className="grid gap-4 lg:grid-cols-2">
                <div
                  ref={screenStageRef}
                  className="relative aspect-video min-h-[320px] overflow-hidden rounded-2xl border border-[color:var(--cs-stroke)] bg-[rgba(28,22,18,0.95)] sm:min-h-[380px]"
                >
                  <LiveKitVideo
                    track={screenTrack}
                    className="h-full w-full object-contain"
                  />
                  <canvas
                    ref={annotationCanvasRef}
                    className="absolute inset-0"
                    style={{ pointerEvents: isAnnotating ? "auto" : "none" }}
                    onPointerDown={handleAnnotationPointerDown}
                    onPointerMove={handleAnnotationPointerMove}
                    onPointerUp={handleAnnotationPointerUp}
                    onPointerCancel={handleAnnotationPointerUp}
                  />
                  <div className="absolute left-3 top-3">
                    <span className="flex items-center gap-1.5 rounded-full bg-[color:var(--cs-accent)] px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-white">
                      <Monitor className="h-3 w-3" />
                      Screen sharing
                    </span>
                  </div>
                </div>

                <div className="relative aspect-video min-h-[320px] overflow-hidden rounded-2xl border border-[color:var(--cs-stroke)] bg-[rgba(28,22,18,0.95)] sm:min-h-[380px]">
                  <LiveKitVideo
                    track={remotePrimaryCameraTrack ?? localCameraTrack}
                    className="h-full w-full object-cover"
                  />
                </div>
              </div>
            ) : (
              <div
                ref={screenStageRef}
                className="relative aspect-video min-h-[320px] overflow-hidden rounded-2xl border border-[color:var(--cs-stroke)] bg-[rgba(28,22,18,0.95)] sm:min-h-[380px]"
              >
                <LiveKitVideo
                  track={screenTrack}
                  className="h-full w-full object-contain"
                />
                <canvas
                  ref={annotationCanvasRef}
                  className="absolute inset-0"
                  style={{ pointerEvents: isAnnotating ? "auto" : "none" }}
                  onPointerDown={handleAnnotationPointerDown}
                  onPointerMove={handleAnnotationPointerMove}
                  onPointerUp={handleAnnotationPointerUp}
                  onPointerCancel={handleAnnotationPointerUp}
                />
                <div className="absolute left-3 top-3">
                  <span className="flex items-center gap-1.5 rounded-full bg-[color:var(--cs-accent)] px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-white">
                    <Monitor className="h-3 w-3" />
                    Screen sharing
                  </span>
                </div>

                <div
                  className="absolute"
                  style={{ left: facecamPosition.x, top: facecamPosition.y }}
                >
                  <div
                    className="w-[260px] cursor-grab overflow-hidden rounded-2xl border border-white/20 bg-black/40 shadow-lg"
                    onPointerDown={handleFacecamPointerDown}
                    onPointerMove={handleFacecamPointerMove}
                    onPointerUp={handleFacecamPointerUp}
                    onPointerCancel={handleFacecamPointerUp}
                    role="button"
                    tabIndex={0}
                  >
                    <div className="flex items-center justify-between border-b border-white/10 bg-black/40 px-3 py-2">
                      <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/80">
                        Facecam
                      </span>
                      <span className="text-[10px] uppercase tracking-[0.2em] text-white/50">
                        Drag
                      </span>
                    </div>

                    <LiveKitVideo
                      track={localCameraTrack}
                      className="h-[160px] w-full object-cover"
                    />
                  </div>
                </div>
              </div>
            )
          ) : (
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="relative aspect-video min-h-[220px] overflow-hidden rounded-2xl border border-[color:var(--cs-stroke)] bg-[rgba(28,22,18,0.95)]">
                <LiveKitVideo
                  track={localCameraTrack}
                  className="h-full w-full object-cover"
                />
                {isLiveKitConnected && !localCameraTrack ? (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <p className="text-xs uppercase tracking-[0.2em] text-white/60">
                      {liveKitError === "Unauthorized"
                        ? "Sign in to enable your camera"
                        : "Waiting for camera permissions..."}
                    </p>
                  </div>
                ) : null}
              </div>

              {remoteCameraTracks
                .filter(Boolean)
                .slice(0, 5)
                .map((track) => (
                  <div
                    key={track!.sid}
                    className="relative aspect-video min-h-[220px] overflow-hidden rounded-2xl border border-[color:var(--cs-stroke)] bg-[rgba(28,22,18,0.95)]"
                  >
                    <LiveKitVideo
                      track={track}
                      className="h-full w-full object-cover"
                      isMuted={false}
                    />
                  </div>
                ))}
            </div>
          )}

          <div className="grid gap-2 sm:grid-cols-4">
            {members.slice(0, 3).map((member) => (
              <div
                key={member.id}
                className="flex h-20 items-end justify-start rounded-xl border border-amber-900/30 bg-[rgba(28,22,18,0.9)] px-3 pb-2"
              >
                <span className="text-[10px] uppercase tracking-[0.2em] text-white/80">
                  {member.info.name}
                </span>
              </div>
            ))}
            {members.length > 3 ? (
              <div className="flex h-20 items-center justify-center rounded-xl border border-dashed border-[color:var(--cs-stroke)] bg-[color:var(--cs-paper)]">
                <span className="text-[10px] uppercase tracking-[0.2em] text-[color:var(--cs-ink-muted)]">
                  +{members.length - 3} more
                </span>
              </div>
            ) : (
              <div className="flex h-20 items-center justify-center rounded-xl border border-dashed border-[color:var(--cs-stroke)] bg-[color:var(--cs-paper)]">
                <span className="text-[10px] uppercase tracking-[0.2em] text-[color:var(--cs-ink-muted)]">
                  Waiting...
                </span>
              </div>
            )}
          </div>
        </div>

        <div className="flex flex-col rounded-2xl border border-[color:var(--cs-stroke)] bg-white/90">
          <div className="flex items-center justify-between border-b border-[color:var(--cs-stroke)] px-4 py-3">
            <div className="flex items-center gap-2">
              <span className="text-xs uppercase tracking-[0.26em] text-[color:var(--cs-ink-muted)]">
                Live chat
              </span>
              {isConnected && (
                <span className="flex h-2 w-2 rounded-full bg-green-500" />
              )}
            </div>
            <span className="flex items-center gap-1 rounded-full border border-[color:var(--cs-stroke)] bg-[color:var(--cs-paper)] px-2 py-1 text-[10px] uppercase tracking-[0.22em] text-[color:var(--cs-ink-muted)]">
              <Users className="h-3 w-3" />
              {members.length}
            </span>
          </div>

          <div
            ref={chatContainerRef}
            className="flex-1 space-y-3 overflow-y-auto p-4"
            style={{ maxHeight: "300px", minHeight: "200px" }}
          >
            {messages.length === 0 ? (
              <p className="text-center text-xs text-[color:var(--cs-ink-muted)]">
                {isConnected
                  ? "No messages yet. Say hello!"
                  : "Connecting to chat..."}
              </p>
            ) : (
              messages.map((message) => (
                <div
                  key={message.id}
                  className={`rounded-xl border border-[color:var(--cs-stroke)] p-3 ${
                    message.name === myName
                      ? "bg-[color:var(--cs-accent)]/10"
                      : "bg-[color:var(--cs-paper-strong)]"
                  }`}
                >
                  <p className="text-[10px] uppercase tracking-[0.24em] text-[color:var(--cs-ink-muted)]">
                    {message.name === myName ? "You" : message.name}
                  </p>
                  <p className="mt-2 text-xs text-[color:var(--cs-ink)]">
                    {message.message}
                  </p>
                </div>
              ))
            )}
          </div>

          {typingNames.length > 0 ? (
            <div className="px-4 pb-2">
              <p className="text-[10px] uppercase tracking-[0.24em] text-[color:var(--cs-ink-muted)]">
                {typingNames.length === 1
                  ? `${typingNames[0]} is typing...`
                  : `${typingNames[0]} and ${typingNames[1]} are typing...`}
              </p>
            </div>
          ) : null}

          <form
            onSubmit={handleSendMessage}
            className="flex gap-2 border-t border-[color:var(--cs-stroke)] p-3"
          >
            <input
              type="text"
              value={chatInput}
              onChange={(e) => {
                const value = e.target.value;
                setChatInput(value);

                if (!isConnected) return;

                if (typingTimeoutRef.current) {
                  clearTimeout(typingTimeoutRef.current);
                }

                setIsTyping(value.trim().length > 0);
                typingTimeoutRef.current = setTimeout(() => {
                  setIsTyping(false);
                }, 2500);
              }}
              onBlur={() => {
                if (typingTimeoutRef.current) {
                  clearTimeout(typingTimeoutRef.current);
                }
                setIsTyping(false);
              }}
              placeholder={
                isConnected
                  ? "Type a message for the cohort..."
                  : "Connecting..."
              }
              disabled={!isConnected}
              className="flex-1 rounded-full border border-[color:var(--cs-stroke)] bg-white/80 px-4 py-2 text-xs text-[color:var(--cs-ink)] placeholder:text-[color:var(--cs-ink-muted)] focus:outline-none focus:ring-2 focus:ring-[color:var(--cs-accent)]/30 disabled:opacity-50"
            />
            <button
              type="submit"
              disabled={!isConnected || !chatInput.trim()}
              className="flex h-9 w-9 items-center justify-center rounded-full bg-[color:var(--cs-ink)] text-white transition hover:bg-[color:var(--cs-ink)]/80 disabled:opacity-50"
            >
              <Send className="h-4 w-4" />
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
