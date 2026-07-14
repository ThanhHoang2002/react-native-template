export const semanticTokens = {
  color: {
    foreground: "#102033",
    inverseForeground: "#ffffff",
    mutedForeground: "#64748b",
    primary: "#2dbe8f",
    accent: "#43b8f2",
    warning: "#f7c948",
    destructive: "#ef5a5a",
  },
  shadow: {
    surface: "0 24px 64px rgba(16, 32, 51, 0.12)",
    surfaceGlow:
      "0 0 0 1px rgba(255,255,255,0.72), 0 28px 80px rgba(67, 184, 242, 0.18), 0 12px 36px rgba(45, 190, 143, 0.12)",
    pressed: "0 10px 24px rgba(16, 32, 51, 0.12)",
    primary: "0 18px 44px rgba(45, 190, 143, 0.26)",
    destructive: "0 18px 42px rgba(239, 90, 90, 0.22)",
    input: "0 14px 36px rgba(16, 32, 51, 0.1)",
    inputError: "0 0 0 3px rgba(239, 90, 90, 0.14)",
  },
} as const;

export const designTokens = {
  semantic: semanticTokens,
} as const;

export type DesignTokens = typeof designTokens;
