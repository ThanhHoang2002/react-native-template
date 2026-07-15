// src/config/env.ts
import { z } from "zod";

const envSchema = z.object({
  EXPO_PUBLIC_API_URL: z.string().url(),
  EXPO_PUBLIC_APP_ENV: z.enum(["development", "staging", "production"]),
  EXPO_PUBLIC_AUTH_REDIRECT_SCHEME: z.string().min(1),
  EXPO_PUBLIC_KEYCLOAK_CLIENT_ID: z.string().min(1),
  EXPO_PUBLIC_KEYCLOAK_ISSUER: z.string().url(),
});
const parsedEnv = envSchema.safeParse({
  EXPO_PUBLIC_API_URL: process.env.EXPO_PUBLIC_API_URL,
  EXPO_PUBLIC_APP_ENV: process.env.EXPO_PUBLIC_APP_ENV,
  EXPO_PUBLIC_AUTH_REDIRECT_SCHEME:
    process.env.EXPO_PUBLIC_AUTH_REDIRECT_SCHEME,
  EXPO_PUBLIC_KEYCLOAK_CLIENT_ID:
    process.env.EXPO_PUBLIC_KEYCLOAK_CLIENT_ID,
  EXPO_PUBLIC_KEYCLOAK_ISSUER: process.env.EXPO_PUBLIC_KEYCLOAK_ISSUER,
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
  authRedirectScheme: parsedEnv.data.EXPO_PUBLIC_AUTH_REDIRECT_SCHEME,
  keycloakClientId: parsedEnv.data.EXPO_PUBLIC_KEYCLOAK_CLIENT_ID,
  keycloakIssuer: parsedEnv.data.EXPO_PUBLIC_KEYCLOAK_ISSUER,
};
