/* eslint-disable import/no-duplicates */
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getApp, getApps, initializeApp } from "@firebase/app";
import { getAuth, initializeAuth } from "@firebase/auth";

// TypeScript resolves the default Firebase condition, while Metro uses the
// React Native export where this function is available.
// @ts-expect-error React Native conditional export.
import { getReactNativePersistence } from "@firebase/auth";

import { env } from "@/config/env";

const firebaseApp =
  getApps().length > 0 ? getApp() : initializeApp(env.firebase);

export const firebaseAuth = (() => {
  try {
    return initializeAuth(firebaseApp, {
      persistence: getReactNativePersistence(AsyncStorage),
    });
  } catch {
    return getAuth(firebaseApp);
  }
})();
