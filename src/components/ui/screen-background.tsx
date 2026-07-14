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
    <View
      className={cn("relative flex-1 overflow-hidden bg-background", className)}
    >
      <View className="absolute inset-x-0 top-0 h-80 bg-background-soft" />
      <View className="absolute inset-x-0 top-24 h-32 border-y border-white/60 bg-accent/10" />
      <View className="absolute inset-x-0 top-52 h-24 border-y border-white/55 bg-primary/10" />
      <View className="absolute inset-x-0 bottom-0 h-80 bg-white/35" />

      <View className="absolute -left-24 top-16 h-[520px] w-28 rotate-12 bg-white/45" />
      <View className="absolute right-8 top-0 h-[620px] w-16 -rotate-12 bg-primary/10" />
      <View className="absolute left-1/2 top-8 h-[640px] w-px bg-white/60" />
      <View className="absolute inset-x-8 bottom-28 h-px bg-accent/20" />
      <View className="absolute inset-x-12 bottom-20 h-px bg-primary/18" />

      <View className={cn("relative flex-1", contentClassName)}>
        {children}
      </View>
    </View>
  );
}
