// src/config/env.ts
import { z } from "zod";

const envSchema = z.object({
  EXPO_PUBLIC_API_URL: z.string().url(),
  EXPO_PUBLIC_APP_ENV: z.enum(["development", "staging", "production"]),
  EXPO_PUBLIC_AUTH_REDIRECT_SCHEME: z.string().min(1),
  EXPO_PUBLIC_FIREBASE_API_KEY: z.string().min(1),
  EXPO_PUBLIC_FIREBASE_APP_ID: z.string().min(1),
  EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN: z.string().min(1),
  EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID: z.string().min(1),
  EXPO_PUBLIC_FIREBASE_PROJECT_ID: z.string().min(1),
  EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET: z.string().min(1),
  EXPO_PUBLIC_GOOGLE_ANDROID_CLIENT_ID: z.string().optional(),
  EXPO_PUBLIC_GOOGLE_IOS_CLIENT_ID: z.string().optional(),
  EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID: z.string().min(1),
});
const parsedEnv = envSchema.safeParse({
  EXPO_PUBLIC_API_URL: process.env.EXPO_PUBLIC_API_URL,
  EXPO_PUBLIC_APP_ENV: process.env.EXPO_PUBLIC_APP_ENV,
  EXPO_PUBLIC_AUTH_REDIRECT_SCHEME:
    process.env.EXPO_PUBLIC_AUTH_REDIRECT_SCHEME,
  EXPO_PUBLIC_FIREBASE_API_KEY: process.env.EXPO_PUBLIC_FIREBASE_API_KEY,
  EXPO_PUBLIC_FIREBASE_APP_ID: process.env.EXPO_PUBLIC_FIREBASE_APP_ID,
  EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN:
    process.env.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN,
  EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID:
    process.env.EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  EXPO_PUBLIC_FIREBASE_PROJECT_ID:
    process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID,
  EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET:
    process.env.EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET,
  EXPO_PUBLIC_GOOGLE_ANDROID_CLIENT_ID:
    process.env.EXPO_PUBLIC_GOOGLE_ANDROID_CLIENT_ID,
  EXPO_PUBLIC_GOOGLE_IOS_CLIENT_ID:
    process.env.EXPO_PUBLIC_GOOGLE_IOS_CLIENT_ID,
  EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID:
    process.env.EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID,
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
  firebase: {
    apiKey: parsedEnv.data.EXPO_PUBLIC_FIREBASE_API_KEY,
    appId: parsedEnv.data.EXPO_PUBLIC_FIREBASE_APP_ID,
    authDomain: parsedEnv.data.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN,
    messagingSenderId:
      parsedEnv.data.EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    projectId: parsedEnv.data.EXPO_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: parsedEnv.data.EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET,
  },
  googleAuth: {
    androidClientId:
      parsedEnv.data.EXPO_PUBLIC_GOOGLE_ANDROID_CLIENT_ID || undefined,
    iosClientId: parsedEnv.data.EXPO_PUBLIC_GOOGLE_IOS_CLIENT_ID || undefined,
    webClientId: parsedEnv.data.EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID,
  },
};
