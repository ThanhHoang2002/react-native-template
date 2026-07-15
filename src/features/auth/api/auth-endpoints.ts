export const AuthEndpoints = {
  register: { url: "/auth/register", method: "POST" },
  syncUser: { url: "/auth/callback_sso", method: "POST" },
  logoutSso: { url: "/auth/logout_sso", method: "POST" },
  me: { url: "hrm-api:/api/v1/auth/permissions/me", method: "POST" },
} as const;

export type ApiEndpoint = {
  method: string;
  url: string;
};
