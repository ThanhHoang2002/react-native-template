import { Text, TextInput, View, type TextInputProps } from "react-native";

import { cn } from "@/utils/cn";

import { semanticTokens } from "../../../styles/tokens";

export type InputProps = TextInputProps & {
  label?: string;
  helperText?: string;
  errorText?: string;
  containerClassName?: string;
  className?: string;
};

export function Input({
  label,
  helperText,
  errorText,
  containerClassName,
  className,
  editable = true,
  style,
  ...props
}: InputProps) {
  const hasError = Boolean(errorText);

  return (
    <View className={cn("gap-2", containerClassName)}>
      {label ? (
        <Text className="text-sm font-bold leading-5 tracking-normal text-foreground">
          {label}
        </Text>
      ) : null}
      <TextInput
        {...props}
        editable={editable}
        placeholderTextColor={semanticTokens.color.mutedForeground}
        className={cn(
          "min-h-12 rounded-glass-md border border-glass-border bg-glass-surface px-4 py-3",
          "text-base font-medium leading-6 text-foreground",
          !editable && "opacity-50",
          hasError && "border-destructive/70 bg-destructive/10",
          className,
        )}
        style={[
          {
            borderCurve: "continuous",
            boxShadow: hasError ? semanticTokens.shadow.inputError : semanticTokens.shadow.input,
          },
          style,
        ]}
      />
      {errorText || helperText ? (
        <Text
          className={cn(
            "text-xs font-semibold leading-4 tracking-normal",
            hasError ? "text-destructive" : "text-muted-foreground",
          )}
        >
          {errorText ?? helperText}
        </Text>
      ) : null}
    </View>
  );
}
