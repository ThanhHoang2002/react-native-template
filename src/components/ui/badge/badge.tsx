import type { PropsWithChildren, ReactNode } from "react";
import { Text, View, type ViewProps } from "react-native";

import { cn } from "@/utils/cn";

const badgeVariants = {
  primary: "border-primary/70 bg-primary/88 text-background",
  accent: "border-accent/70 bg-accent/88 text-background",
  success: "border-success/70 bg-success/88 text-background",
  warning: "border-warning/70 bg-warning/90 text-background",
  destructive: "border-destructive/70 bg-destructive/90 text-destructive-foreground",
  neutral: "border-white/28 bg-white/16 text-foreground",
} as const;

export type BadgeVariant = keyof typeof badgeVariants;

export type BadgeProps = PropsWithChildren<
  ViewProps & {
    variant?: BadgeVariant;
    icon?: ReactNode;
    className?: string;
    textClassName?: string;
  }
>;

export function Badge({
  variant = "neutral",
  icon,
  children,
  className,
  textClassName,
  ...props
}: BadgeProps) {
  return (
    <View
      {...props}
      className={cn(
        "self-start flex-row items-center gap-1.5 rounded-full border px-2.5 py-1",
        badgeVariants[variant],
        className,
      )}
    >
      {icon}
      <Text className={cn("text-[11px] font-semibold leading-[15px] tracking-normal", textClassName)}>
        {children}
      </Text>
    </View>
  );
}
