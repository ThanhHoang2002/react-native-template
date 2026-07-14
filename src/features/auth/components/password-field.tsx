import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { Pressable, View } from "react-native";

import { Input } from "@/components/ui";

import type { AuthMode } from "../types/auth";

type PasswordFieldProps = {
  errorText?: string;
  mode: AuthMode;
  onChangeText: (value: string) => void;
  value: string;
};

export function PasswordField({
  errorText,
  mode,
  onChangeText,
  value,
}: PasswordFieldProps) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <View className="relative">
      <Input
        label="Mật khẩu"
        placeholder="Tối thiểu 8 ký tự"
        autoCapitalize="none"
        autoCorrect={false}
        secureTextEntry={!showPassword}
        textContentType={mode === "register" ? "newPassword" : "password"}
        value={value}
        onChangeText={onChangeText}
        errorText={errorText}
        className="pr-12"
      />

      <Pressable
        accessibilityRole="button"
        accessibilityLabel={showPassword ? "Ẩn mật khẩu" : "Hiện mật khẩu"}
        onPress={() => setShowPassword((current) => !current)}
        className="absolute right-1 top-7 h-12 w-12 items-center justify-center"
      >
        <Ionicons
          name={showPassword ? "eye-off-outline" : "eye-outline"}
          size={20}
          color="#64748b"
        />
      </Pressable>
    </View>
  );
}
