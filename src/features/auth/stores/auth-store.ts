import { create } from "zustand";

import { queryClient } from "@/lib/react-query";

import {
  ApiRequestError,
  getMe,
  logoutSso,
  registerAccount,
  syncUser,
} from "../api/auth-api";
import {
  clearStoredAuthTokens,
  getStoredAuthTokens,
  isTokenExpired,
  saveAuthTokens,
} from "../lib/token-storage";
import {
  refreshKeycloakTokens,
  revokeRefreshToken,
  signInWithKeycloak,
} from "../services/keycloak-auth-service";
import type {
  AuthMetaData,
  AuthResource,
  AuthSubmitValues,
  AuthTokens,
  AuthUser,
} from "../types/auth";

export type AuthStatus = "authenticated" | "loading" | "unauthenticated";

type AuthState = {
  error: string | null;
  isSubmitting: boolean;
  metaData: AuthMetaData | null;
  resources: AuthResource[];
  status: AuthStatus;
  successMessage: string | null;
  user: AuthUser | null;
};

type AuthActions = {
  bootstrap: () => Promise<void>;
  clearSession: () => Promise<void>;
  refreshSession: () => Promise<void>;
  register: (values: AuthSubmitValues) => Promise<void>;
  signIn: () => Promise<void>;
  signOut: () => Promise<void>;
};

type AuthStore = AuthState & AuthActions;

const initialState: AuthState = {
  error: null,
  isSubmitting: false,
  metaData: null,
  resources: [],
  status: "unauthenticated",
  successMessage: null,
  user: null,
};

function getAuthErrorMessage(error: unknown) {
  if (error instanceof ApiRequestError) {
    return error.message;
  }

  if (error instanceof Error) {
    return error.message;
  }

  return "Không thể xử lý yêu cầu đăng nhập. Vui lòng thử lại.";
}

async function applyMe(tokens: AuthTokens) {
  await syncUser(tokens.accessToken);
  const response = await getMe(tokens.accessToken);
  const data = response.data;

  useAuthStore.setState({
    metaData: data?.metaData ?? null,
    resources: data?.resources ?? [],
    status: "authenticated",
    user: data?.user ?? null,
  });
}

export const useAuthStore = create<AuthStore>((set, get) => ({
  ...initialState,
  bootstrap: async () => {
    try {
      await get().refreshSession();
    } catch {
      await clearStoredAuthTokens();
      set({ status: "unauthenticated" });
    }
  },
  clearSession: async () => {
    await clearStoredAuthTokens();
    queryClient.clear();
    set({
      error: null,
      isSubmitting: false,
      metaData: null,
      resources: [],
      status: "unauthenticated",
      successMessage: null,
      user: null,
    });
  },
  refreshSession: async () => {
    const tokens = await getStoredAuthTokens();

    if (!tokens) {
      await get().clearSession();
      return;
    }

    const freshTokens = isTokenExpired(tokens)
      ? await refreshKeycloakTokens(tokens.refreshToken)
      : tokens;

    if (freshTokens !== tokens) {
      await saveAuthTokens(freshTokens);
    }

    await applyMe(freshTokens);
  },
  register: async (values: AuthSubmitValues) => {
    set({ error: null, isSubmitting: true, successMessage: null });

    try {
      await registerAccount(values);
      set({
        successMessage:
          "Đăng ký thành công. Vui lòng kiểm tra email để kích hoạt tài khoản rồi đăng nhập bằng SSO.",
      });
    } catch (registerError) {
      set({ error: getAuthErrorMessage(registerError) });
    } finally {
      set({ isSubmitting: false });
    }
  },
  signIn: async () => {
    set({ error: null, isSubmitting: true, successMessage: null });

    try {
      const tokens = await signInWithKeycloak();
      await saveAuthTokens(tokens);
      await applyMe(tokens);
    } catch (signInError) {
      set({
        error: getAuthErrorMessage(signInError),
        status: "unauthenticated",
      });
    } finally {
      set({ isSubmitting: false });
    }
  },
  signOut: async () => {
    set({ error: null, isSubmitting: true });

    try {
      const tokens = await getStoredAuthTokens();

      if (tokens) {
        await logoutSso(tokens).catch(() => undefined);
        await revokeRefreshToken(tokens.refreshToken).catch(() => undefined);
      }
    } finally {
      await get().clearSession();
    }
  },
}));

export const selectIsAuthenticated = (state: AuthStore) =>
  state.status === "authenticated";
