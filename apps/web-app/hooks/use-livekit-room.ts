"use client";

import {
  Room,
  RoomEvent,
  createLocalTracks,
  createLocalScreenTracks,
  type LocalTrack,
  type LocalVideoTrack,
  type LocalAudioTrack,
  type RemoteParticipant,
} from "livekit-client";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

interface UseLiveKitRoomResult {
  room: Room | null;
  isConnecting: boolean;
  isConnected: boolean;
  error: string | null;
  localCameraTrack: LocalVideoTrack | null;
  localMicrophoneTrack: LocalAudioTrack | null;
  localScreenTrack: LocalVideoTrack | null;
  remoteParticipants: RemoteParticipant[];
  connect: () => Promise<void>;
  disconnect: () => void;
  startScreenShare: () => Promise<void>;
  stopScreenShare: () => void;
}

async function fetchToken(roomId: string): Promise<string> {
  const response = await fetch("/api/livekit/token", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ roomId }),
  });

  if (!response.ok) {
    const body = (await response.json().catch(() => null)) as {
      error?: string;
      details?: string;
    } | null;
    const message =
      body?.details || body?.error || "Unable to fetch LiveKit token";
    throw new Error(message);
  }

  const body = (await response.json()) as { token: string };
  if (!body.token) {
    throw new Error("LiveKit token response missing token");
  }

  return body.token;
}

function pickVideoTrack(tracks: LocalTrack[]) {
  const video = tracks.find((track) => track.kind === "video");
  if (!video) return null;
  return video as LocalVideoTrack;
}

function pickAudioTrack(tracks: LocalTrack[]) {
  const audio = tracks.find((track) => track.kind === "audio");
  if (!audio) return null;
  return audio as LocalAudioTrack;
}

export function useLiveKitRoom(roomId: string): UseLiveKitRoomResult {
  const livekitUrl = process.env.NEXT_PUBLIC_LIVEKIT_URL;

  const [room, setRoom] = useState<Room | null>(null);
  const [isConnecting, setIsConnecting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const roomRef = useRef<Room | null>(null);
  const isConnectingRef = useRef(false);
  const connectGenerationRef = useRef(0);
  const [localCameraTrack, setLocalCameraTrack] =
    useState<LocalVideoTrack | null>(null);
  const [localMicrophoneTrack, setLocalMicrophoneTrack] =
    useState<LocalAudioTrack | null>(null);
  const [localScreenTrack, setLocalScreenTrack] =
    useState<LocalVideoTrack | null>(null);

  const [remoteParticipants, setRemoteParticipants] = useState<
    RemoteParticipant[]
  >([]);

  const isConnected = Boolean(room?.state === "connected");

  useEffect(() => {
    roomRef.current = room;
  }, [room]);

  const normalizedRoomId = useMemo(() => roomId.trim(), [roomId]);

  const disconnect = useCallback(() => {
    connectGenerationRef.current += 1;
    isConnectingRef.current = false;
    setIsConnecting(false);
    setError(null);

    setLocalScreenTrack((track) => {
      track?.stop();
      return null;
    });

    setLocalCameraTrack((track) => {
      track?.stop();
      return null;
    });

    setLocalMicrophoneTrack((track) => {
      track?.stop();
      return null;
    });

    setRemoteParticipants([]);

    const currentRoom = roomRef.current;
    currentRoom?.disconnect();
    roomRef.current = null;
    setRoom(null);
  }, []);

  const connect = useCallback(async () => {
    if (!livekitUrl) {
      setError("NEXT_PUBLIC_LIVEKIT_URL is not set");
      return;
    }

    if (!normalizedRoomId) {
      setError("Room id is missing");
      return;
    }

    if (roomRef.current?.state === "connected" || isConnectingRef.current) {
      return;
    }

    const generation = connectGenerationRef.current + 1;
    connectGenerationRef.current = generation;

    isConnectingRef.current = true;
    setIsConnecting(true);
    setError(null);

    try {
      const token = await fetchToken(normalizedRoomId);

      if (connectGenerationRef.current !== generation) {
        return;
      }

      const nextRoom = new Room({
        adaptiveStream: true,
        dynacast: true,
      });

      nextRoom
        .on(RoomEvent.ParticipantConnected, () => {
          setRemoteParticipants(
            Array.from(nextRoom.remoteParticipants.values()),
          );
        })
        .on(RoomEvent.ParticipantDisconnected, () => {
          setRemoteParticipants(
            Array.from(nextRoom.remoteParticipants.values()),
          );
        });

      await nextRoom.connect(livekitUrl, token);

      if (connectGenerationRef.current !== generation) {
        nextRoom.disconnect();
        return;
      }

      roomRef.current = nextRoom;
      setRoom(nextRoom);

      const localTracks = await createLocalTracks({
        audio: true,
        video: true,
      });

      if (connectGenerationRef.current !== generation) {
        localTracks.forEach((track) => track.stop());
        nextRoom.disconnect();
        return;
      }

      const camera = pickVideoTrack(localTracks);
      const microphone = pickAudioTrack(localTracks);

      if (camera) {
        await nextRoom.localParticipant.publishTrack(camera);
        setLocalCameraTrack(camera);
      }

      if (microphone) {
        await nextRoom.localParticipant.publishTrack(microphone);
        setLocalMicrophoneTrack(microphone);
      }

      setRemoteParticipants(Array.from(nextRoom.remoteParticipants.values()));
    } catch (caughtError) {
      const message =
        caughtError instanceof Error
          ? caughtError.message
          : "Unable to connect";
      setError(message);

      const currentRoom = roomRef.current;
      currentRoom?.disconnect();
      roomRef.current = null;
      setRoom(null);
    } finally {
      isConnectingRef.current = false;
      setIsConnecting(false);
    }
  }, [livekitUrl, normalizedRoomId]);

  const stopScreenShare = useCallback(() => {
    if (!room) {
      setLocalScreenTrack((track) => {
        track?.stop();
        return null;
      });
      return;
    }

    setLocalScreenTrack((track) => {
      if (track) {
        room.localParticipant.unpublishTrack(track);
        track.stop();
      }
      return null;
    });
  }, [room]);

  const startScreenShare = useCallback(async () => {
    if (!room) {
      setError("Not connected to a LiveKit room");
      return;
    }

    try {
      const tracks = await createLocalScreenTracks({
        audio: true,
        video: true,
      });
      const screenVideo = pickVideoTrack(tracks);

      if (!screenVideo) {
        throw new Error("Unable to start screen share");
      }

      const mediaStreamTrack = screenVideo.mediaStreamTrack;
      if (mediaStreamTrack) {
        mediaStreamTrack.onended = () => {
          stopScreenShare();
        };
      }

      await room.localParticipant.publishTrack(screenVideo);
      setLocalScreenTrack(screenVideo);
    } catch (caughtError) {
      const message =
        caughtError instanceof Error
          ? caughtError.message
          : "Unable to start screen share";
      setError(message);
    }
  }, [room, stopScreenShare]);

  useEffect(() => {
    connect();

    return () => {
      disconnect();
    };
  }, [connect, disconnect]);

  return {
    room,
    isConnecting,
    isConnected,
    error,
    localCameraTrack,
    localMicrophoneTrack,
    localScreenTrack,
    remoteParticipants,
    connect,
    disconnect,
    startScreenShare,
    stopScreenShare,
  };
}
