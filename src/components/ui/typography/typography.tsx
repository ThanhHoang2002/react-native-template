import { Text, type TextProps } from "react-native";

import { cn } from "@/utils/cn";

const typographyVariants = {
  display: "text-[34px] font-extrabold leading-10 text-foreground",
  title: "text-2xl font-extrabold leading-[30px] text-foreground",
  body: "text-base font-medium leading-6 text-muted-foreground",
  label: "text-sm font-bold leading-5 text-foreground",
  caption: "text-xs font-bold leading-4 text-muted-foreground",
} as const;

export type TypographyVariant = keyof typeof typographyVariants;

export type TypographyProps = TextProps & {
  variant?: TypographyVariant;
  className?: string;
};

export function Typography({
  variant = "body",
  className,
  ...props
}: TypographyProps) {
  return (
    <Text
      {...props}
      className={cn("tracking-normal", typographyVariants[variant], className)}
    />
  );
}
