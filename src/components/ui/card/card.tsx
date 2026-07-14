import type { PropsWithChildren, ReactNode } from "react";
import { View, type ViewProps } from "react-native";

import { Surface, SurfaceProps, Typography } from "@/components/ui";
import { cn } from "@/utils/cn";
export type CardProps = Omit<SurfaceProps, "variant"> & {
  variant?: SurfaceProps["variant"];
};

export function Card({
  variant = "default",
  contentClassName,
  ...props
}: CardProps) {
  return (
    <Surface
      {...props}
      variant={variant}
      contentClassName={cn("gap-4", contentClassName)}
    />
  );
}

type CardSectionProps = PropsWithChildren<ViewProps & { className?: string }>;

export function CardHeader({ className, ...props }: CardSectionProps) {
  return <View {...props} className={cn("gap-1.5", className)} />;
}

export function CardContent({ className, ...props }: CardSectionProps) {
  return <View {...props} className={cn("gap-3", className)} />;
}

export function CardFooter({ className, ...props }: CardSectionProps) {
  return <View {...props} className={cn("flex-row items-center gap-2", className)} />;
}

export type CardTitleProps = {
  children: ReactNode;
  className?: string;
};

export function CardTitle({ children, className }: CardTitleProps) {
  return (
    <Typography variant="title" className={className}>
      {children}
    </Typography>
  );
}

export type CardDescriptionProps = {
  children: ReactNode;
  className?: string;
};

export function CardDescription({ children, className }: CardDescriptionProps) {
  return (
    <Typography variant="body" className={className}>
      {children}
    </Typography>
  );
}
