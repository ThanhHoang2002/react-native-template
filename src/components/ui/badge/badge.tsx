import type { PropsWithChildren, ReactNode } from "react";
import { Text, View, type ViewProps } from "react-native";

import { cn } from "@/utils/cn";

const badgeVariants = {
  primary: "border-primary/30 bg-primary/14 text-primary",
  accent: "border-accent/30 bg-accent/14 text-accent",
  success: "border-success/30 bg-success/14 text-success",
  warning: "border-warning/35 bg-warning/18 text-foreground",
  destructive:
    "border-destructive/30 bg-destructive/14 text-destructive",
  neutral: "border-glass-border-strong bg-glass-surface-strong text-foreground",
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
      <Text
        className={cn(
          "text-[11px] font-semibold leading-[15px] tracking-normal",
          textClassName,
        )}
      >
        {children}
      </Text>
    </View>
  );
}
