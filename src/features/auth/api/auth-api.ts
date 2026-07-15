import { env } from "@/config/env";

import { AuthEndpoints, type ApiEndpoint } from "./auth-endpoints";
import type {
  ApiResponse,
  AuthSubmitValues,
  AuthTokens,
  MeResponse,
} from "../types/auth";

type RequestOptions = {
  accessToken?: string;
  body?: unknown;
  headers?: Record<string, string>;
};

export class ApiRequestError extends Error {
  data?: ApiResponse<unknown>;
  fieldErrors?: Record<string, string>;
  status: number;

  constructor(message: string, status: number, data?: ApiResponse<unknown>) {
    super(message);
    this.name = "ApiRequestError";
    this.status = status;
    this.data = data;
    this.fieldErrors = data?.errors;
  }
}

export function buildApiUrl(url: string) {
  const normalizedUrl = url.replace(":", "");
  const separator = normalizedUrl.startsWith("/") ? "" : "/";

  return `${env.apiUrl}${separator}${normalizedUrl}`;
}

export async function requestApi<T>(
  endpoint: ApiEndpoint,
  options: RequestOptions = {},
) {
  const headers = {
    Accept: "application/json",
    ...(options.body ? { "Content-Type": "application/json" } : {}),
    ...(options.accessToken
      ? { Authorization: `Bearer ${options.accessToken}` }
      : {}),
    ...options.headers,
  };

  const response = await fetch(buildApiUrl(endpoint.url), {
    method: endpoint.method,
    headers,
    body: options.body ? JSON.stringify(options.body) : undefined,
  });

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

export async function registerAccount(values: AuthSubmitValues) {
  return requestApi<unknown>(AuthEndpoints.register, {
    body: {
      email: values.email,
      fullName: values.fullName,
      password: values.password,
    },
  });
}

export async function syncUser(accessToken: string) {
  return requestApi<void>(AuthEndpoints.syncUser, { accessToken });
}

export async function getMe(accessToken: string) {
  return requestApi<MeResponse>(AuthEndpoints.me, { accessToken });
}

export async function logoutSso(tokens: AuthTokens) {
  return requestApi<unknown>(AuthEndpoints.logoutSso, {
    accessToken: tokens.accessToken,
    body: { refreshToken: tokens.refreshToken },
  });
}
