import { createClient } from "redis";

export default async function RedisService(url: string) {
  if (!url) throw new Error("url is required to connect to redis");
  const client = await createClient({ url }).connect();

  return {
    getSession: (sessionId: string) => {
      client.get(sessionId);
    },
    setSession: (sessionId: string, session: object) => {
      client.set(sessionId, JSON.stringify(session));
    },
    dispose: async () => client.quit(),
    getRedisClient: () => {
      if (!client.isOpen) throw new Error("no redis connection");
      return client;
    },
  };
}
