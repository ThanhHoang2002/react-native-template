export const semanticTokens = {
  color: {
    inverseForeground: "#ffffff",
    mutedForeground: "#c4d8d4",
    primary: "#35e58b",
  },
  shadow: {
    surface: "0 28px 72px rgba(0, 0, 0, 0.36)",
    surfaceGlow: "0 0 0 1px rgba(218,255,247,0.18), 0 34px 86px rgba(53, 229, 139, 0.16)",
    pressed: "0 12px 30px rgba(0, 0, 0, 0.28)",
    primary: "0 18px 48px rgba(53, 229, 139, 0.3)",
    destructive: "0 18px 42px rgba(241, 85, 94, 0.25)",
    input: "0 14px 36px rgba(0, 0, 0, 0.22)",
    inputError: "0 0 0 3px rgba(241, 85, 94, 0.12)",
  },
} as const;

export const designTokens = {
  semantic: semanticTokens,
} as const;

export type DesignTokens = typeof designTokens;
