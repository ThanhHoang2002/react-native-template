import { Ionicons } from "@expo/vector-icons";
import { Controller, type Control, type FieldErrors } from "react-hook-form";
import { Pressable, View } from "react-native";

import { Button, Card, CardContent, Input, Typography } from "@/components/ui";
import type { AuthFormValues, AuthMode } from "../types/auth";
import { GoogleSignInButton } from "./google-sign-in-button";
import { PasswordField } from "./password-field";

type AuthFormCardProps = {
  control: Control<AuthFormValues>;
  errors: FieldErrors<AuthFormValues>;
  isRegister: boolean;
  mode: AuthMode;
  onGoogleSignIn?: () => void;
  onModeChange: (mode: AuthMode) => void;
  onSubmit: () => void;
};

export function AuthFormCard({
  control,
  errors,
  isRegister,
  mode,
  onGoogleSignIn,
  onModeChange,
  onSubmit,
}: AuthFormCardProps) {
  return (
    <Card variant="muted" contentClassName="gap-5">
      <CardContent className="gap-4">
        <AuthFields
          control={control}
          errors={errors}
          isRegister={isRegister}
          mode={mode}
        />
        <Button
          fullWidth
          size="lg"
          onPress={onSubmit}
          rightIcon={
            <Ionicons name="arrow-forward" size={19} color="#ffffff" />
          }
        >
          {isRegister ? "Tạo tài khoản" : "Đăng nhập"}
        </Button>
        <AuthModePrompt isRegister={isRegister} onModeChange={onModeChange} />
        <AuthDivider />
        <GoogleSignInButton onPress={onGoogleSignIn} />
      </CardContent>
    </Card>
  );
}

type AuthFieldsProps = Pick<
  AuthFormCardProps,
  "control" | "errors" | "isRegister" | "mode"
>;

function AuthFields({ control, errors, isRegister, mode }: AuthFieldsProps) {
  return (
    <>
      {isRegister ? (
        <Controller
          control={control}
          name="displayName"
          render={({ field: { onChange, value } }) => (
            <Input
              label="Tên hiển thị"
              placeholder="Hoàng Nguyễn"
              autoCapitalize="words"
              textContentType="name"
              value={value}
              onChangeText={onChange}
              errorText={errors.displayName?.message}
            />
          )}
        />
      ) : null}

      <Controller
        control={control}
        name="email"
        render={({ field: { onChange, value } }) => (
          <Input
            label="Email"
            placeholder="ban@quyfc.vn"
            autoCapitalize="none"
            autoCorrect={false}
            keyboardType="email-address"
            textContentType="emailAddress"
            value={value}
            onChangeText={onChange}
            errorText={errors.email?.message}
          />
        )}
      />

      <Controller
        control={control}
        name="password"
        render={({ field: { onChange, value } }) => (
          <PasswordField
            mode={mode}
            value={value}
            onChangeText={onChange}
            errorText={errors.password?.message}
          />
        )}
      />
    </>
  );
}

function AuthDivider() {
  return (
    <View className="flex-row items-center gap-3">
      <View className="h-px flex-1 bg-foreground/10" />
      <Typography variant="caption">
        hoặc dùng email
      </Typography>
      <View className="h-px flex-1 bg-foreground/10" />
    </View>
  );
}

type AuthModePromptProps = {
  isRegister: boolean;
  onModeChange: (mode: AuthMode) => void;
};

function AuthModePrompt({ isRegister, onModeChange }: AuthModePromptProps) {
  return (
    <View className="flex-row items-center justify-center gap-1">
      <Typography variant="caption">
        {isRegister ? "Đã có tài khoản?" : "Chưa có tài khoản?"}
      </Typography>
      <Pressable
        accessibilityRole="button"
        onPress={() => onModeChange(isRegister ? "login" : "register")}
        className="px-1 py-1"
      >
        <Typography variant="caption" className="text-primary">
          {isRegister ? "Đăng nhập" : "Đăng ký mới"}
        </Typography>
      </Pressable>
    </View>
  );
}
