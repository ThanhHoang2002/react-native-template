import { KeyboardAvoidingView, Platform, ScrollView, View } from "react-native";

import { ScreenBackground } from "@/components/ui";

import { useAuthForm } from "../hooks/use-auth-form";
import type { AuthMode, AuthSubmitHandler } from "../types/auth";
import { AuthFormCard } from "./auth-form-card";
import { AuthHero } from "./auth-hero";

export type AuthScreenProps = {
  apiError?: string | null;
  initialMode?: AuthMode;
  isSubmitting?: boolean;
  onGoogleSignIn?: () => void;
  onSubmit?: AuthSubmitHandler;
  successMessage?: string | null;
};

export function AuthScreen({
  apiError,
  initialMode = "login",
  isSubmitting = false,
  onGoogleSignIn,
  onSubmit,
  successMessage,
}: AuthScreenProps) {
  const form = useAuthForm(initialMode);

  return (
    <ScreenBackground>
      <KeyboardAvoidingView
        behavior={Platform.select({ ios: "padding", default: undefined })}
        className="flex-1"
      >
        <ScrollView
          keyboardShouldPersistTaps="handled"
          className="flex-1"
          contentContainerClassName="min-h-full px-5 pb-8 pt-0"
        >
          <View className="min-h-full justify-center gap-6">
            <AuthHero mode={form.mode} />

            <AuthFormCard
              apiError={apiError}
              control={form.control}
              errors={form.errors}
              isRegister={form.isRegister}
              isSubmitting={isSubmitting}
              mode={form.mode}
              onGoogleSignIn={onGoogleSignIn}
              onModeChange={form.changeMode}
              onSubmit={form.submit(onSubmit)}
              successMessage={successMessage}
            />

            {/* <AuthMetricsRow /> */}
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </ScreenBackground>
  );
}
