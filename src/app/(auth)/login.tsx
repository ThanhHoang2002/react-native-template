import * as Google from "expo-auth-session/providers/google";
import * as WebBrowser from "expo-web-browser";
import { Redirect } from "expo-router";

import { env } from "@/config/env";
import { AuthScreen } from "@/features/auth/components/auth-screen";
import { LoadingScreen } from "@/features/auth/components/loading-screen";
import {
  selectIsAuthenticated,
  useAuthStore,
} from "@/features/auth/stores/auth-store";
import type { AuthMode, AuthSubmitValues } from "@/features/auth/types/auth";

WebBrowser.maybeCompleteAuthSession();

export default function LoginRoute() {
  const error = useAuthStore((state) => state.error);
  const isAuthenticated = useAuthStore(selectIsAuthenticated);
  const isSubmitting = useAuthStore((state) => state.isSubmitting);
  const register = useAuthStore((state) => state.register);
  const setError = useAuthStore((state) => state.setError);
  const signIn = useAuthStore((state) => state.signIn);
  const signInWithGoogle = useAuthStore((state) => state.signInWithGoogle);
  const status = useAuthStore((state) => state.status);
  const successMessage = useAuthStore((state) => state.successMessage);

  const [, , promptGoogleSignIn] = Google.useIdTokenAuthRequest({
    androidClientId: env.googleAuth.androidClientId,
    clientId: env.googleAuth.webClientId,
    iosClientId: env.googleAuth.iosClientId,
    scopes: ["openid", "profile", "email"],
    webClientId: env.googleAuth.webClientId,
  });

  async function handleSubmit(mode: AuthMode, values: AuthSubmitValues) {
    if (mode === "register") {
      await register(values);
      return;
    }

    await signIn(values);
  }

  async function handleGoogleSignIn() {
    setError(null);

    const result = await promptGoogleSignIn();

    if (result.type !== "success") {
      setError("Ban da huy dang nhap Google.");
      return;
    }

    const idToken = result.params.id_token;

    if (!idToken) {
      setError("Google khong tra ve id_token. Vui long kiem tra OAuth client.");
      return;
    }

    await signInWithGoogle(idToken);
  }

  if (status === "loading") {
    return <LoadingScreen />;
  }

  if (isAuthenticated) {
    return <Redirect href="/private/test-private" />;
  }

  return (
    <AuthScreen
      apiError={error}
      isSubmitting={isSubmitting}
      onGoogleSignIn={handleGoogleSignIn}
      onSubmit={handleSubmit}
      successMessage={successMessage}
    />
  );
}
