import { betterAuth, type BetterAuthOptions } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";

import { db } from "@/lib/db/client";

const authSecret =
  process.env.BETTER_AUTH_SECRET ??
  process.env.AUTH_SECRET ??
  process.env.NEXTAUTH_SECRET;

if (!authSecret) {
  throw new Error(
    "Missing auth secret. Set BETTER_AUTH_SECRET (or AUTH_SECRET / NEXTAUTH_SECRET) in .env.",
  );
}

export const config: BetterAuthOptions = {
  appName: "Coder School",
  baseURL: process.env.NEXT_PUBLIC_APP_URL,
  secret: authSecret,
  advanced: {
    disableCSRFCheck: false,
    useSecureCookies: process.env.NODE_ENV === "production",
  },
  database: prismaAdapter(db, {
    provider: "postgresql",
  }),
  emailAndPassword: {
    autoSignIn: true,
    enabled: true,
    maxPasswordLength: 64,
    minPasswordLength: 8,
  },
  logger: {
    disabled: process.env.NODE_ENV === "production",
    level: process.env.NODE_ENV === "production" ? "error" : "info",
  },
  session: {
    cookieCache: {
      enabled: true,
      maxAge: 7 * 24 * 60 * 60,
    },
    expiresIn: 7 * 24 * 60 * 60,
    preserveSessionInDatabase: false,
    updateAge: 24 * 60 * 60,
  },
  trustedOrigins: [
    process.env.NEXT_PUBLIC_APP_URL,
    "http://localhost:10170",
    "http://127.0.0.1:10170",
  ].filter(Boolean) as string[],
  user: {
    additionalFields: {
      firstName: {
        required: true,
        type: "string",
      },
      lastName: {
        required: true,
        type: "string",
      },
    },
    modelName: "user",
  },
};

export const auth = betterAuth(config);
