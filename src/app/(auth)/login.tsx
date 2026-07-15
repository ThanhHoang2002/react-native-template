import { Redirect } from "expo-router";

import { AuthScreen } from "@/features/auth/components/auth-screen";
import { LoadingScreen } from "@/features/auth/components/loading-screen";
import {
  selectIsAuthenticated,
  useAuthStore,
} from "@/features/auth/stores/auth-store";
import type { AuthMode, AuthSubmitValues } from "@/features/auth/types/auth";

export default function LoginRoute() {
  const error = useAuthStore((state) => state.error);
  const isAuthenticated = useAuthStore(selectIsAuthenticated);
  const isSubmitting = useAuthStore((state) => state.isSubmitting);
  const register = useAuthStore((state) => state.register);
  const signIn = useAuthStore((state) => state.signIn);
  const status = useAuthStore((state) => state.status);
  const successMessage = useAuthStore((state) => state.successMessage);

  async function handleSubmit(mode: AuthMode, values: AuthSubmitValues) {
    if (mode === "register") {
      await register(values);
      return;
    }

    await signIn();
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
      onGoogleSignIn={signIn}
      onSubmit={handleSubmit}
      successMessage={successMessage}
    />
  );
}
