import type { PropsWithChildren } from "react";
import { View } from "react-native";

import { cn } from "@/utils/cn";

export type ScreenBackgroundProps = PropsWithChildren<{
  className?: string;
  contentClassName?: string;
}>;

export function ScreenBackground({
  children,
  className,
  contentClassName,
}: ScreenBackgroundProps) {
  return (
    <View className={cn("relative flex-1 overflow-hidden bg-background", className)}>
      <View className="absolute inset-x-0 top-0 h-72 bg-background-soft/90" />
      <View className="absolute inset-x-0 top-28 h-28 border-y border-white/8 bg-accent/10" />
      <View className="absolute inset-x-0 top-56 h-20 border-y border-primary/12 bg-primary/8" />
      <View className="absolute inset-x-0 bottom-0 h-72 bg-surface-dark/70" />

      <View className="absolute -left-20 top-20 h-96 w-24 rotate-12 bg-white/8" />
      <View className="absolute right-8 top-0 h-[560px] w-16 -rotate-12 bg-primary/10" />
      <View className="absolute left-1/2 top-8 h-[620px] w-px bg-white/12" />
      <View className="absolute inset-x-8 bottom-28 h-px bg-accent/25" />
      <View className="absolute inset-x-12 bottom-20 h-px bg-primary/20" />

      <View className="absolute inset-0 bg-black/10" />
      <View className={cn("relative flex-1", contentClassName)}>{children}</View>
    </View>
  );
}
