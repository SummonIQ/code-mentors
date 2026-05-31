"use client";

import { useEffect, useState, useCallback } from "react";
import { getPusherClient } from "@/lib/pusher-client";
import type { PresenceChannel, Members } from "pusher-js";

interface PresenceMember {
  id: string;
  info: {
    name: string;
  };
}

interface ChatMessage {
  id: string;
  name: string;
  message: string;
  timestamp: number;
}

interface UsePresenceChannelReturn {
  members: PresenceMember[];
  messages: ChatMessage[];
  myId: string | null;
  myName: string | null;
  isConnected: boolean;
  sendMessage: (message: string) => Promise<void>;
  typingNames: string[];
  setIsTyping: (isTyping: boolean) => void;
}

export function usePresenceChannel(
  channelName: string,
): UsePresenceChannelReturn {
  const [members, setMembers] = useState<PresenceMember[]>([]);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [myId, setMyId] = useState<string | null>(null);
  const [myName, setMyName] = useState<string | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [channel, setChannel] = useState<PresenceChannel | null>(null);
  const [typingByUserId, setTypingByUserId] = useState<
    Record<string, { name: string; updatedAt: number }>
  >({});

  useEffect(() => {
    let presenceChannel: PresenceChannel | null = null;

    try {
      const pusherClient = getPusherClient();
      presenceChannel = pusherClient.subscribe(channelName) as PresenceChannel;
    } catch {
      setIsConnected(false);
      return;
    }

    setChannel(presenceChannel);

    presenceChannel.bind(
      "pusher:subscription_succeeded",
      (members: Members) => {
        setIsConnected(true);
        setMyId(members.myID);

        const me = members.me;
        if (me?.info?.name) {
          setMyName(me.info.name);
        }

        const memberList: PresenceMember[] = [];
        members.each((member: { id: string; info: { name: string } }) => {
          memberList.push({
            id: member.id,
            info: { name: member.info.name },
          });
        });
        setMembers(memberList);
      },
    );

    presenceChannel.bind("pusher:subscription_error", () => {
      setIsConnected(false);
    });

    presenceChannel.bind(
      "pusher:member_added",
      (member: { id: string; info: { name: string } }) => {
        setMembers((prev) => [
          ...prev,
          { id: member.id, info: { name: member.info.name } },
        ]);
      },
    );

    presenceChannel.bind("pusher:member_removed", (member: { id: string }) => {
      setMembers((prev) => prev.filter((m) => m.id !== member.id));
    });

    presenceChannel.bind("chat-message", (data: ChatMessage) => {
      setMessages((prev) => [...prev, data]);
    });

    presenceChannel.bind(
      "client-typing",
      (data: { userId: string; name: string; isTyping: boolean }) => {
        if (!data?.userId || !data?.name) return;
        if (data.isTyping) {
          setTypingByUserId((prev) => ({
            ...prev,
            [data.userId]: { name: data.name, updatedAt: Date.now() },
          }));
          return;
        }

        setTypingByUserId((prev) => {
          if (!prev[data.userId]) return prev;
          const next = { ...prev };
          delete next[data.userId];
          return next;
        });
      },
    );

    const pruneInterval = window.setInterval(() => {
      setTypingByUserId((prev) => {
        const now = Date.now();
        const entries = Object.entries(prev).filter(
          ([, value]) => now - value.updatedAt < 4500,
        );
        if (entries.length === Object.keys(prev).length) return prev;
        return Object.fromEntries(entries);
      });
    }, 1000);

    return () => {
      presenceChannel.unbind_all();
      window.clearInterval(pruneInterval);
      try {
        const pusherClient = getPusherClient();
        pusherClient.unsubscribe(channelName);
      } catch {
        // ignore
      }
      setIsConnected(false);
      setChannel(null);
      setTypingByUserId({});
    };
  }, [channelName]);

  const sendMessage = useCallback(
    async (message: string) => {
      if (!message.trim()) return;

      await fetch("/api/pusher/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          channel: channelName,
          message: message.trim(),
        }),
      });
    },
    [channelName],
  );

  const setIsTyping = useCallback(
    (isTyping: boolean) => {
      if (!channel || !isConnected || !myId || !myName) return;
      try {
        channel.trigger("client-typing", {
          userId: myId,
          name: myName,
          isTyping,
        });
      } catch {
        // ignore
      }
    },
    [channel, isConnected, myId, myName],
  );

  const typingNames = Object.entries(typingByUserId)
    .filter(([userId]) => userId !== myId)
    .map(([, value]) => value.name)
    .slice(0, 2);

  return {
    members,
    messages,
    myId,
    myName,
    isConnected,
    sendMessage,
    typingNames,
    setIsTyping,
  };
}
