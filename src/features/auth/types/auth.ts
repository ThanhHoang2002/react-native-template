export type AuthMode = "login" | "register";

export type AuthFormValues = {
  displayName: string;
  email: string;
  password: string;
};

export type AuthSubmitValues = {
  displayName?: string;
  email: string;
  password: string;
};

export type AuthSubmitHandler = (
  mode: AuthMode,
  values: AuthSubmitValues,
) => void;
