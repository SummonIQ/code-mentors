"use client";

import { useEffect, useRef } from "react";

import type { Track } from "livekit-client";

interface LiveKitVideoProps {
  className?: string;
  isMuted?: boolean;
  track: Track | null;
}

export function LiveKitVideo({
  className,
  isMuted = true,
  track,
}: LiveKitVideoProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const element = videoRef.current;
    if (!element || !track) return;

    track.attach(element);

    return () => {
      track.detach(element);
    };
  }, [track]);

  return (
    <video
      ref={videoRef}
      autoPlay
      playsInline
      muted={isMuted}
      className={className}
    />
  );
}

interface LiveKitAudioProps {
  track: Track | null;
}

export function LiveKitAudio({ track }: LiveKitAudioProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const element = audioRef.current;
    if (!element || !track) return;

    track.attach(element);

    return () => {
      track.detach(element);
    };
  }, [track]);

  return <audio ref={audioRef} autoPlay />;
}
