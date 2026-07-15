export type AuthMode = "login" | "register";

export type AuthFormValues = {
  confirmPassword: string;
  email: string;
  fullName: string;
  password: string;
};

export type AuthSubmitValues = {
  confirmPassword?: string;
  email: string;
  fullName?: string;
  password: string;
};

export type AuthSubmitHandler = (
  mode: AuthMode,
  values: AuthSubmitValues,
) => Promise<void> | void;

export type AuthResource = {
  id: string;
  subject: string;
};

export type AuthUser = {
  id?: number | string;
  uid?: number;
  public_id?: string;
  email: string;
  display_name?: string;
  name?: string | null;
  username?: string;
  avatar?: string | null;
  admin?: boolean;
};

export type AuthMetaData = {
  maxCapacity?: number;
  unitCapacity?: string;
  maxUser?: number;
  totalCapacity?: number;
  totalUser?: number;
  planExpiryDate?: string;
  planType?: string;
};

export type MeResponse = {
  user: AuthUser;
  resources: AuthResource[];
  metaData?: AuthMetaData;
};

export type ApiResponse<T> = {
  status: string;
  code: number;
  message?: string;
  data?: T;
  errors?: Record<string, string>;
};

export type AuthTokens = {
  accessToken: string;
  refreshToken: string;
  expiresAt: number;
  idToken?: string;
  tokenType?: string;
};
