import { z } from "zod";

import type { AuthFormValues, AuthMode, AuthSubmitValues } from "../types/auth";

const emailSchema = z
  .string()
  .trim()
  .min(1, "Nhập email của bạn.")
  .email("Email chưa đúng định dạng.");

const passwordSchema = z
  .string()
  .min(1, "Nhập mật khẩu.")
  .min(8, "Mật khẩu cần ít nhất 8 ký tự.");

export const loginSchema = z.object({
  displayName: z.string().optional().default(""),
  email: emailSchema,
  password: passwordSchema,
});

export const registerSchema = z.object({
  displayName: z
    .string()
    .trim()
    .min(2, "Nhập tên hiển thị từ 2 ký tự."),
  email: emailSchema,
  password: passwordSchema,
});

export function validateAuthForm(mode: AuthMode, values: AuthFormValues) {
  const schema = mode === "register" ? registerSchema : loginSchema;

  return schema.safeParse(values);
}

export function toAuthSubmitValues(
  mode: AuthMode,
  values: AuthFormValues,
): AuthSubmitValues {
  return {
    displayName: mode === "register" ? values.displayName.trim() : undefined,
    email: values.email.trim(),
    password: values.password,
  };
}
