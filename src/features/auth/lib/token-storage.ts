import AsyncStorage from "@react-native-async-storage/async-storage";
import { Platform } from "react-native";
import * as SecureStore from "expo-secure-store";

import type { AuthTokens } from "../types/auth";

const AUTH_TOKENS_KEY = "quy-fc.auth-tokens";

export async function getStoredAuthTokens() {
  const value =
    Platform.OS === "web"
      ? await AsyncStorage.getItem(AUTH_TOKENS_KEY)
      : await SecureStore.getItemAsync(AUTH_TOKENS_KEY);

  if (!value) {
    return null;
  }

  try {
    return JSON.parse(value) as AuthTokens;
  } catch {
    await clearStoredAuthTokens();
    return null;
  }
}

export async function saveAuthTokens(tokens: AuthTokens) {
  const value = JSON.stringify(tokens);

  if (Platform.OS === "web") {
    await AsyncStorage.setItem(AUTH_TOKENS_KEY, value);
    return;
  }

  await SecureStore.setItemAsync(AUTH_TOKENS_KEY, value);
}

export async function clearStoredAuthTokens() {
  if (Platform.OS === "web") {
    await AsyncStorage.removeItem(AUTH_TOKENS_KEY);
    return;
  }

  await SecureStore.deleteItemAsync(AUTH_TOKENS_KEY);
}

export function isTokenExpired(tokens: AuthTokens, marginMs = 60_000) {
  return Date.now() >= tokens.expiresAt - marginMs;
}
