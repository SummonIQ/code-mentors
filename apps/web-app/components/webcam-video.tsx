"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import {
  Camera,
  CameraOff,
  Mic,
  MicOff,
  Monitor,
  MonitorOff,
} from "lucide-react";

interface WebcamVideoProps {
  className?: string;
  onStreamReady?: (stream: MediaStream) => void;
  showScreenShareControl?: boolean;
}

export function WebcamVideo({
  className = "",
  onStreamReady,
  showScreenShareControl = true,
}: WebcamVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [screenStream, setScreenStream] = useState<MediaStream | null>(null);
  const [isVideoEnabled, setIsVideoEnabled] = useState(true);
  const [isAudioEnabled, setIsAudioEnabled] = useState(true);
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const startStream = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: {
          width: { ideal: 1280 },
          height: { ideal: 720 },
          facingMode: "user",
        },
        audio: true,
      });

      setStream(mediaStream);

      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }

      onStreamReady?.(mediaStream);
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      if (err instanceof Error) {
        if (err.name === "NotAllowedError") {
          setError("Camera access denied. Please allow camera permissions.");
        } else if (err.name === "NotFoundError") {
          setError("No camera found. Please connect a camera.");
        } else {
          setError(`Could not access camera: ${err.message}`);
        }
      }
    }
  }, [onStreamReady]);

  const stopStream = useCallback(() => {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
      setStream(null);
    }
  }, [stream]);

  const toggleVideo = useCallback(() => {
    if (stream) {
      const videoTrack = stream.getVideoTracks()[0];
      if (videoTrack) {
        videoTrack.enabled = !videoTrack.enabled;
        setIsVideoEnabled(videoTrack.enabled);
      }
    }
  }, [stream]);

  const toggleAudio = useCallback(() => {
    if (stream) {
      const audioTrack = stream.getAudioTracks()[0];
      if (audioTrack) {
        audioTrack.enabled = !audioTrack.enabled;
        setIsAudioEnabled(audioTrack.enabled);
      }
    }
  }, [stream]);

  const startScreenShare = useCallback(async () => {
    try {
      const displayStream = await navigator.mediaDevices.getDisplayMedia({
        video: {
          width: { ideal: 1920 },
          height: { ideal: 1080 },
        },
        audio: true,
      });

      setScreenStream(displayStream);
      setIsScreenSharing(true);

      if (videoRef.current) {
        videoRef.current.srcObject = displayStream;
      }

      displayStream.getVideoTracks()[0].onended = () => {
        stopScreenShare();
      };
    } catch (err) {
      console.error("Screen share error:", err);
    }
  }, []);

  const stopScreenShare = useCallback(() => {
    if (screenStream) {
      screenStream.getTracks().forEach((track) => track.stop());
      setScreenStream(null);
    }
    setIsScreenSharing(false);

    if (videoRef.current && stream) {
      videoRef.current.srcObject = stream;
    }
  }, [screenStream, stream]);

  const toggleScreenShare = useCallback(() => {
    if (isScreenSharing) {
      stopScreenShare();
    } else {
      startScreenShare();
    }
  }, [isScreenSharing, startScreenShare, stopScreenShare]);

  useEffect(() => {
    startStream();

    return () => {
      stopStream();
    };
  }, []);

  return (
    <div
      className={`relative overflow-hidden rounded-2xl bg-[rgba(28,22,18,0.95)] ${className}`}
    >
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <div className="mx-auto h-8 w-8 animate-spin rounded-full border-2 border-white/20 border-t-white/80" />
            <p className="mt-3 text-xs uppercase tracking-[0.2em] text-white/60">
              Starting camera...
            </p>
          </div>
        </div>
      )}

      {error && (
        <div className="absolute inset-0 flex items-center justify-center p-6">
          <div className="text-center">
            <CameraOff className="mx-auto h-10 w-10 text-white/40" />
            <p className="mt-3 max-w-xs text-sm text-white/70">{error}</p>
            <button
              onClick={startStream}
              className="mt-4 rounded-full bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-white transition hover:bg-white/20"
              type="button"
            >
              Retry
            </button>
          </div>
        </div>
      )}

      <video
        ref={videoRef}
        autoPlay
        playsInline
        muted
        className={`h-full w-full object-cover ${
          !isVideoEnabled || error ? "invisible" : ""
        }`}
        style={{
          filter: "saturate(1.1) sepia(0.08) brightness(1.05) contrast(0.95)",
        }}
      />

      {!isVideoEnabled && !error && stream && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <CameraOff className="mx-auto h-10 w-10 text-white/40" />
            <p className="mt-2 text-xs uppercase tracking-[0.2em] text-white/60">
              Camera off
            </p>
          </div>
        </div>
      )}

      {stream && (
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
          <div className="flex items-center justify-center gap-3">
            <button
              onClick={toggleAudio}
              className={`flex h-10 w-10 items-center justify-center rounded-full transition ${
                isAudioEnabled
                  ? "bg-white/20 text-white hover:bg-white/30"
                  : "bg-red-500/80 text-white hover:bg-red-500"
              }`}
              type="button"
              aria-label={
                isAudioEnabled ? "Mute microphone" : "Unmute microphone"
              }
            >
              {isAudioEnabled ? (
                <Mic className="h-5 w-5" />
              ) : (
                <MicOff className="h-5 w-5" />
              )}
            </button>

            <button
              onClick={toggleVideo}
              className={`flex h-10 w-10 items-center justify-center rounded-full transition ${
                isVideoEnabled
                  ? "bg-white/20 text-white hover:bg-white/30"
                  : "bg-red-500/80 text-white hover:bg-red-500"
              }`}
              type="button"
              aria-label={isVideoEnabled ? "Turn off camera" : "Turn on camera"}
            >
              {isVideoEnabled ? (
                <Camera className="h-5 w-5" />
              ) : (
                <CameraOff className="h-5 w-5" />
              )}
            </button>

            {showScreenShareControl ? (
              <button
                onClick={toggleScreenShare}
                className={`flex h-10 w-10 items-center justify-center rounded-full transition ${
                  isScreenSharing
                    ? "bg-[color:var(--cs-accent)] text-white hover:bg-[color:var(--cs-accent)]/80"
                    : "bg-white/20 text-white hover:bg-white/30"
                }`}
                type="button"
                aria-label={
                  isScreenSharing ? "Stop screen share" : "Share screen"
                }
              >
                {isScreenSharing ? (
                  <MonitorOff className="h-5 w-5" />
                ) : (
                  <Monitor className="h-5 w-5" />
                )}
              </button>
            ) : null}
          </div>
        </div>
      )}

      {stream && (
        <div className="absolute left-3 top-3 flex items-center gap-2">
          <span className="flex items-center gap-1.5 rounded-full bg-black/50 px-2 py-1 text-[10px] uppercase tracking-[0.2em] text-white/80">
            <span className="h-2 w-2 animate-pulse rounded-full bg-red-500" />
            {isScreenSharing ? "Screen" : "Live"}
          </span>
        </div>
      )}
    </div>
  );
}
