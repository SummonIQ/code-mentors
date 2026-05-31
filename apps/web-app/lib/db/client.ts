import { PrismaClient } from "@prisma/client";

import { PrismaPg } from "@prisma/adapter-pg";

function createPrismaClient() {
  const databaseUrl = process.env.DATABASE_URL;
  if (!databaseUrl) {
    throw new Error("DATABASE_URL is not set");
  }

  const adapter = new PrismaPg({
    connectionString: databaseUrl,
  });

  return new PrismaClient({ adapter });
}

export const db = globalThis.cachedDb ?? createPrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalThis.cachedDb = db;
}
