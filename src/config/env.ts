// src/config/env.ts
import { z } from "zod";

const envSchema = z.object({
  EXPO_PUBLIC_API_URL: z.string().url(),
  EXPO_PUBLIC_APP_ENV: z.enum(["development", "staging", "production"]),
});
const parsedEnv = envSchema.safeParse({
  EXPO_PUBLIC_API_URL: process.env.EXPO_PUBLIC_API_URL,
  EXPO_PUBLIC_APP_ENV: process.env.EXPO_PUBLIC_APP_ENV,
});

if (!parsedEnv.success) {
  console.error(
    "Invalid environment variables:",
    parsedEnv.error.flatten().fieldErrors,
  );

  throw new Error("Invalid environment variables");
}

export const env = {
  apiUrl: parsedEnv.data.EXPO_PUBLIC_API_URL,
  appEnv: parsedEnv.data.EXPO_PUBLIC_APP_ENV,
};
