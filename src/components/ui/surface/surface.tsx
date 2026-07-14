import { BlurView, type BlurTint } from "expo-blur";
import { View, type ViewProps } from "react-native";

import { cn } from "@/utils/cn";

import { semanticTokens } from "../../../styles/tokens";

const surfaceVariants = {
  muted: {
    className: "border-glass-border bg-glass-surface-muted",
    blurIntensity: 58,
    blurTint: "light",
  },
  default: {
    className: "border-glass-border bg-glass-surface",
    blurIntensity: 72,
    blurTint: "light",
  },
  strong: {
    className: "border-glass-border bg-glass-surface-strong",
    blurIntensity: 90,
    blurTint: "extraLight",
  },
  dark: {
    className: "border-white/20 bg-surface-dark/78",
    blurIntensity: 84,
    blurTint: "dark",
  },
} as const;

export type SurfaceVariant = keyof typeof surfaceVariants;

export type SurfaceProps = ViewProps & {
  variant?: SurfaceVariant;
  padded?: boolean;
  blurIntensity?: number;
  contentClassName?: string;
  className?: string;
};

export function Surface({
  children,
  variant = "default",
  padded = true,
  blurIntensity,
  className,
  contentClassName,
  style,
  ...props
}: SurfaceProps) {
  const surface = surfaceVariants[variant];

  return (
    <View
      {...props}
      className={cn(
        "relative overflow-hidden rounded-glass-lg border",
        padded && "p-5",
        surface.className,
        className,
      )}
      style={[
        {
          borderCurve: "continuous",
          boxShadow: semanticTokens.shadow.surfaceGlow,
        },
        style,
      ]}
    >
      {surface.blurIntensity > 0 ? (
        <BlurView
          experimentalBlurMethod="dimezisBlurView"
          intensity={blurIntensity ?? surface.blurIntensity}
          tint={surface.blurTint as BlurTint}
          className="absolute inset-0"
        />
      ) : null}
      <View
        pointerEvents="none"
        className="absolute left-px right-px top-px h-1/2 rounded-t-glass-lg bg-white/25"
      />
      <View
        pointerEvents="none"
        className="absolute inset-x-4 bottom-0 h-px bg-white/35"
      />
      <View className={cn("relative", contentClassName)}>{children}</View>
    </View>
  );
}
