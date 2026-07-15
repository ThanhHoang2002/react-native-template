import { Ionicons } from "@expo/vector-icons";
import { Controller, type Control, type FieldErrors } from "react-hook-form";
import { Pressable, View } from "react-native";

import { Button, Card, CardContent, Input, Typography } from "@/components/ui";
import type { AuthFormValues, AuthMode } from "../types/auth";
import { PasswordField } from "./password-field";

type AuthFormCardProps = {
  apiError?: string | null;
  control: Control<AuthFormValues>;
  errors: FieldErrors<AuthFormValues>;
  isRegister: boolean;
  isSubmitting?: boolean;
  mode: AuthMode;
  onGoogleSignIn?: () => void;
  onModeChange: (mode: AuthMode) => void;
  onSubmit: () => void;
  successMessage?: string | null;
};

export function AuthFormCard({
  apiError,
  control,
  errors,
  isRegister,
  isSubmitting = false,
  mode,
  onGoogleSignIn,
  onModeChange,
  onSubmit,
  successMessage,
}: AuthFormCardProps) {
  return (
    <Card variant="muted" contentClassName="gap-5">
      <CardContent className="gap-4">
        {isRegister ? (
          <AuthFields
            control={control}
            errors={errors}
            isRegister={isRegister}
            mode={mode}
          />
        ) : (
          <Typography variant="body">
            Tiếp tục bằng tài khoản SSO hiện có của bạn.
          </Typography>
        )}
        {apiError ? (
          <Typography variant="caption" className="text-destructive">
            {apiError}
          </Typography>
        ) : null}
        {successMessage ? (
          <Typography variant="caption" className="text-primary">
            {successMessage}
          </Typography>
        ) : null}
        <Button
          fullWidth
          loading={isSubmitting}
          size="lg"
          onPress={isRegister ? onSubmit : (onGoogleSignIn ?? onSubmit)}
          rightIcon={
            <Ionicons name="arrow-forward" size={19} color="#ffffff" />
          }
        >
          {isRegister ? "Tạo tài khoản" : "Đăng nhập bằng SSO"}
        </Button>
        <AuthModePrompt isRegister={isRegister} onModeChange={onModeChange} />
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
          name="fullName"
          render={({ field: { onChange, value } }) => (
            <Input
              label="Họ và tên"
              placeholder="Hoàng Nguyễn"
              autoCapitalize="words"
              textContentType="name"
              value={value}
              onChangeText={onChange}
              errorText={errors.fullName?.message}
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

      {isRegister ? (
        <Controller
          control={control}
          name="confirmPassword"
          render={({ field: { onChange, value } }) => (
            <PasswordField
              label="Xác nhận mật khẩu"
              mode={mode}
              value={value}
              onChangeText={onChange}
              errorText={errors.confirmPassword?.message}
            />
          )}
        />
      ) : null}
    </>
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
