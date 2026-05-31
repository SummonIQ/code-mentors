import PusherClient from "pusher-js";

let pusherClient: PusherClient | null = null;

export function getPusherClient(): PusherClient {
  if (pusherClient) return pusherClient;

  const key = process.env.NEXT_PUBLIC_PUSHER_KEY;
  const cluster = process.env.NEXT_PUBLIC_PUSHER_CLUSTER;

  if (!key || !cluster) {
    throw new Error("Pusher env vars are missing");
  }

  pusherClient = new PusherClient(key, {
    cluster,
    authEndpoint: "/api/pusher/auth",
  });

  return pusherClient;
}
