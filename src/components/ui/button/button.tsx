import { BlurView, type BlurTint } from "expo-blur";
import type { ReactNode } from "react";
import {
  ActivityIndicator,
  Pressable,
  Text,
  View,
  type PressableProps,
  type TextProps,
  type ViewStyle,
} from "react-native";

import { cn } from "@/utils/cn";

import { semanticTokens } from "../../../styles/tokens";

const buttonVariants = {
  primary: {
    className: "border-white/70 bg-primary",
    textClassName: "text-primary-foreground",
    activityColor: semanticTokens.color.inverseForeground,
    blurIntensity: 24,
    blurTint: "light",
    shadow: semanticTokens.shadow.primary,
  },
  secondary: {
    className: "border-glass-border-strong bg-glass-surface-strong",
    textClassName: "text-foreground",
    activityColor: semanticTokens.color.primary,
    blurIntensity: 74,
    blurTint: "extraLight",
    shadow: semanticTokens.shadow.surface,
  },
  outline: {
    className: "border-glass-border-strong bg-glass-surface-muted",
    textClassName: "text-foreground",
    activityColor: semanticTokens.color.primary,
    blurIntensity: 62,
    blurTint: "extraLight",
    shadow: undefined,
  },
  ghost: {
    className: "border-transparent bg-transparent",
    textClassName: "text-foreground",
    activityColor: semanticTokens.color.primary,
    blurIntensity: 0,
    blurTint: "light",
    shadow: undefined,
  },
  destructive: {
    className: "border-white/70 bg-destructive",
    textClassName: "text-destructive-foreground",
    activityColor: semanticTokens.color.inverseForeground,
    blurIntensity: 28,
    blurTint: "light",
    shadow: semanticTokens.shadow.destructive,
  },
} as const;

const buttonSizes = {
  sm: {
    className: "min-h-10 px-3 py-2",
    textClassName: "text-sm leading-5",
  },
  md: {
    className: "min-h-12 px-5 py-2.5",
    textClassName: "text-[15px] leading-5",
  },
  lg: {
    className: "min-h-14 px-7 py-3",
    textClassName: "text-base leading-6",
  },
  icon: {
    className: "h-12 w-12 p-0",
    textClassName: "text-[15px] leading-5",
  },
} as const;

export type ButtonVariant = keyof typeof buttonVariants;
export type ButtonSize = keyof typeof buttonSizes;

export type ButtonProps = Omit<PressableProps, "children"> & {
  children?: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  fullWidth?: boolean;
  className?: string;
  textClassName?: string;
  textProps?: TextProps;
};

export function Button({
  children,
  variant = "primary",
  size = "md",
  loading = false,
  leftIcon,
  rightIcon,
  fullWidth = false,
  disabled,
  className,
  textClassName,
  textProps,
  style,
  accessibilityRole = "button",
  ...props
}: ButtonProps) {
  const button = buttonVariants[variant];
  const buttonSize = buttonSizes[size];
  const isDisabled = disabled || loading;

  return (
    <Pressable
      {...props}
      accessibilityRole={accessibilityRole}
      accessibilityState={{ disabled: isDisabled, busy: loading }}
      disabled={isDisabled}
      className={cn(
        "relative flex-row items-center justify-center gap-2 overflow-hidden rounded-full border",
        buttonSize.className,
        button.className,
        fullWidth && "w-full",
        className,
      )}
      style={(state) => [
        {
          borderCurve: "continuous",
          opacity: isDisabled ? 0.5 : 1,
          transform: [{ scale: state.pressed && !isDisabled ? 0.98 : 1 }],
        },
        button.shadow
          ? ({ boxShadow: button.shadow } satisfies ViewStyle)
          : undefined,
        state.pressed && !isDisabled
          ? ({ boxShadow: semanticTokens.shadow.pressed } satisfies ViewStyle)
          : undefined,
        typeof style === "function" ? style(state) : style,
      ]}
    >
      {button.blurIntensity > 0 ? (
        <BlurView
          experimentalBlurMethod="dimezisBlurView"
          intensity={button.blurIntensity}
          tint={button.blurTint as BlurTint}
          className="absolute inset-0"
        />
      ) : null}
      <View
        pointerEvents="none"
        className="absolute left-px right-px top-px h-1/2 bg-white/24"
      />

      {loading ? (
        <ActivityIndicator color={button.activityColor} />
      ) : (
        <>
          {leftIcon}
          {children ? (
            <Text
              {...textProps}
              numberOfLines={textProps?.numberOfLines ?? 1}
              adjustsFontSizeToFit={textProps?.adjustsFontSizeToFit ?? true}
              minimumFontScale={textProps?.minimumFontScale ?? 0.82}
              className={cn(
                "font-extrabold tracking-normal",
                buttonSize.textClassName,
                button.textClassName,
                textClassName,
              )}
            >
              {children}
            </Text>
          ) : null}
          {rightIcon}
        </>
      )}
    </Pressable>
  );
}
