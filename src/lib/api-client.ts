import type { ApiEndpoint } from "@/features/auth/api/auth-endpoints";
import {
  ApiRequestError,
  buildApiUrl,
} from "@/features/auth/api/auth-api";
import {
  clearStoredAuthTokens,
  getStoredAuthTokens,
  isTokenExpired,
  saveAuthTokens,
} from "@/features/auth/lib/token-storage";
import { refreshKeycloakTokens } from "@/features/auth/services/keycloak-auth-service";
import type { ApiResponse } from "@/features/auth/types/auth";

type CallApiOptions = {
  body?: unknown;
  headers?: Record<string, string>;
  retryOnUnauthorized?: boolean;
};

async function getFreshTokens() {
  const tokens = await getStoredAuthTokens();

  if (!tokens) {
    return null;
  }

  if (!isTokenExpired(tokens)) {
    return tokens;
  }

  const refreshedTokens = await refreshKeycloakTokens(tokens.refreshToken);
  await saveAuthTokens(refreshedTokens);

  return refreshedTokens;
}

export async function callApi<T>(
  endpoint: ApiEndpoint,
  options: CallApiOptions = {},
): Promise<ApiResponse<T>> {
  const tokens = await getFreshTokens();
  const headers = {
    Accept: "application/json",
    ...(options.body ? { "Content-Type": "application/json" } : {}),
    ...(tokens?.accessToken
      ? { Authorization: `Bearer ${tokens.accessToken}` }
      : {}),
    ...options.headers,
  };

  const response = await fetch(buildApiUrl(endpoint.url), {
    method: endpoint.method,
    headers,
    body: options.body ? JSON.stringify(options.body) : undefined,
  });

  if (response.status === 401 && options.retryOnUnauthorized !== false) {
    if (!tokens?.refreshToken) {
      await clearStoredAuthTokens();
      throw new ApiRequestError("Phiên đăng nhập đã hết hạn.", 401);
    }

    const refreshedTokens = await refreshKeycloakTokens(tokens.refreshToken);
    await saveAuthTokens(refreshedTokens);

    return callApi<T>(endpoint, {
      ...options,
      retryOnUnauthorized: false,
    });
  }

  const data = (await response.json().catch(() => undefined)) as
    | ApiResponse<T>
    | undefined;

  if (!response.ok) {
    throw new ApiRequestError(
      data?.message ?? response.statusText,
      response.status,
      data as ApiResponse<unknown> | undefined,
    );
  }

  if (data?.code && data.code >= 400) {
    throw new ApiRequestError(
      data.message ?? "Yêu cầu không thành công.",
      data.code,
      data as ApiResponse<unknown>,
    );
  }

  return data as ApiResponse<T>;
}
