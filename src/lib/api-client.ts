import type { ApiEndpoint } from "@/features/auth/api/auth-endpoints";
import {
  ApiRequestError,
  buildApiUrl,
} from "@/features/auth/api/auth-api";
import { getFirebaseIdToken } from "@/features/auth/services/firebase-auth-service";
import type { ApiResponse } from "@/features/auth/types/auth";

type CallApiOptions = {
  body?: unknown;
  headers?: Record<string, string>;
  retryOnUnauthorized?: boolean;
};

async function getAuthHeaders(forceRefresh = false): Promise<Record<string, string>> {
  const accessToken = await getFirebaseIdToken(forceRefresh);

  return accessToken ? { Authorization: `Bearer ${accessToken}` } : {};
}

export async function callApi<T>(
  endpoint: ApiEndpoint,
  options: CallApiOptions = {},
): Promise<ApiResponse<T>> {
  const authHeaders = await getAuthHeaders();
  const headers: Record<string, string> = {
    Accept: "application/json",
    ...(options.body ? { "Content-Type": "application/json" } : {}),
    ...authHeaders,
    ...options.headers,
  };

  const response = await fetch(buildApiUrl(endpoint.url), {
    method: endpoint.method,
    headers,
    body: options.body ? JSON.stringify(options.body) : undefined,
  });

  if (response.status === 401 && options.retryOnUnauthorized !== false) {
    const refreshedAuthHeaders = await getAuthHeaders(true);

    if (!refreshedAuthHeaders.Authorization) {
      throw new ApiRequestError("Phiên đăng nhập đã hết hạn.", 401);
    }

    return callApi<T>(endpoint, {
      ...options,
      headers: {
        ...options.headers,
        ...refreshedAuthHeaders,
      },
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
