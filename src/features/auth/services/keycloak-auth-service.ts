import * as AuthSession from "expo-auth-session";
import {
  CodeChallengeMethod,
  ResponseType,
  TokenTypeHint,
} from "expo-auth-session";
import * as WebBrowser from "expo-web-browser";

import { env } from "@/config/env";

import type { AuthTokens } from "../types/auth";

WebBrowser.maybeCompleteAuthSession();

const authScopes = ["openid", "profile", "email", "offline_access"];

export const redirectUri = AuthSession.makeRedirectUri({
  path: "auth/callback",
  scheme: env.authRedirectScheme,
});

function toAuthTokens(response: AuthSession.TokenResponse): AuthTokens {
  return {
    accessToken: response.accessToken,
    expiresAt: (response.issuedAt + (response.expiresIn ?? 300)) * 1000,
    idToken: response.idToken,
    refreshToken: response.refreshToken ?? "",
    tokenType: response.tokenType,
  };
}

async function getDiscovery() {
  return AuthSession.fetchDiscoveryAsync(env.keycloakIssuer);
}

export async function signInWithKeycloak() {
  const discovery = await getDiscovery();
  const request = await AuthSession.loadAsync(
    {
      clientId: env.keycloakClientId,
      codeChallengeMethod: CodeChallengeMethod.S256,
      redirectUri,
      responseType: ResponseType.Code,
      scopes: authScopes,
      usePKCE: true,
    },
    discovery,
  );

  const result = await request.promptAsync(discovery);

  if (result.type !== "success") {
    throw new Error("Bạn đã hủy đăng nhập SSO.");
  }

  const tokenResponse = await AuthSession.exchangeCodeAsync(
    {
      clientId: env.keycloakClientId,
      code: result.params.code,
      extraParams: {
        code_verifier: request.codeVerifier ?? "",
      },
      redirectUri,
    },
    discovery,
  );

  const tokens = toAuthTokens(tokenResponse);

  if (!tokens.refreshToken) {
    throw new Error("Keycloak không trả refresh token cho mobile client.");
  }

  return tokens;
}

export async function refreshKeycloakTokens(refreshToken: string) {
  const discovery = await getDiscovery();
  const tokenResponse = await AuthSession.refreshAsync(
    {
      clientId: env.keycloakClientId,
      refreshToken,
      scopes: authScopes,
    },
    discovery,
  );

  return toAuthTokens(tokenResponse);
}

export async function revokeRefreshToken(refreshToken: string) {
  const discovery = await getDiscovery();

  if (!discovery.revocationEndpoint) {
    return false;
  }

  return AuthSession.revokeAsync(
    {
      clientId: env.keycloakClientId,
      token: refreshToken,
      tokenTypeHint: TokenTypeHint.RefreshToken,
    },
    { revocationEndpoint: discovery.revocationEndpoint },
  );
}
