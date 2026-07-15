import { create } from "zustand";

import { queryClient } from "@/lib/react-query";

import { ApiRequestError, getMe, syncUser } from "../api/auth-api";
import {
  getFirebaseAuthErrorMessage,
  registerWithEmail,
  signInWithEmail,
  signInWithGoogleIdToken,
  signOutFirebase,
  waitForFirebaseUser,
} from "../services/firebase-auth-service";
import type {
  AuthMetaData,
  AuthResource,
  AuthSubmitValues,
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
  setError: (error: string | null) => void;
  signIn: (values: AuthSubmitValues) => Promise<void>;
  signInWithGoogle: (idToken: string) => Promise<void>;
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

  return getFirebaseAuthErrorMessage(error);
}

async function applyMe(accessToken: string) {
  await syncUser(accessToken);
  const response = await getMe(accessToken);
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
    set({ status: "loading" });

    try {
      await get().refreshSession();
    } catch (bootstrapError) {
      await signOutFirebase().catch(() => undefined);
      queryClient.clear();
      set({
        ...initialState,
        error: getAuthErrorMessage(bootstrapError),
      });
    }
  },
  clearSession: async () => {
    queryClient.clear();
    set(initialState);
  },
  refreshSession: async () => {
    const firebaseUser = await waitForFirebaseUser();

    if (!firebaseUser) {
      await get().clearSession();
      return;
    }

    await firebaseUser.reload();

    if (!firebaseUser.emailVerified) {
      await signOutFirebase();
      await get().clearSession();
      return;
    }

    const accessToken = await firebaseUser.getIdToken();
    await applyMe(accessToken);
  },
  register: async (values: AuthSubmitValues) => {
    set({ error: null, isSubmitting: true, successMessage: null });

    try {
      await registerWithEmail(values);
      await signOutFirebase();
      set({
        status: "unauthenticated",
        successMessage:
          "Dang ky thanh cong. Vui long kiem tra email de xac thuc tai khoan roi dang nhap.",
      });
    } catch (registerError) {
      set({ error: getAuthErrorMessage(registerError) });
    } finally {
      set({ isSubmitting: false });
    }
  },
  setError: (error: string | null) => {
    set({ error });
  },
  signIn: async (values: AuthSubmitValues) => {
    set({ error: null, isSubmitting: true, successMessage: null });

    try {
      const firebaseUser = await signInWithEmail(values);
      const accessToken = await firebaseUser.getIdToken();
      await applyMe(accessToken);
    } catch (signInError) {
      set({
        error: getAuthErrorMessage(signInError),
        status: "unauthenticated",
      });
    } finally {
      set({ isSubmitting: false });
    }
  },
  signInWithGoogle: async (idToken: string) => {
    set({ error: null, isSubmitting: true, successMessage: null });

    try {
      const firebaseUser = await signInWithGoogleIdToken(idToken);
      const accessToken = await firebaseUser.getIdToken();
      await applyMe(accessToken);
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
      await signOutFirebase();
    } finally {
      await get().clearSession();
    }
  },
}));

export const selectIsAuthenticated = (state: AuthStore) =>
  state.status === "authenticated";
