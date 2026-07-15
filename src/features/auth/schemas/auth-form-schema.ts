import { z } from "zod";

import type { AuthFormValues, AuthMode, AuthSubmitValues } from "../types/auth";

const fullNameSchema = z
  .string()
  .trim()
  .min(2, "Nhập họ và tên từ 2 ký tự.");

const emailSchema = z
  .string()
  .trim()
  .min(1, "Nhập email của bạn.")
  .email("Email chưa đúng định dạng.");

const passwordSchema = z
  .string()
  .min(1, "Nhập mật khẩu.")
  .superRefine((value, context) => {
    if (value.includes(" ")) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Mật khẩu không được chứa khoảng trắng.",
      });
      return;
    }

    if (
      value.length < 8 ||
      value.length > 16 ||
      !/^(?=.*[A-Za-z])(?=.*\d)(?=.*[^A-Za-z\d]).{8,16}$/.test(value) ||
      /[À-ỹà-ỹ]/.test(value)
    ) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        message:
          "Mật khẩu phải có 8-16 ký tự, gồm chữ cái, số và ký tự đặc biệt.",
      });
    }
  });

export const loginSchema = z.object({
  confirmPassword: z.string().optional().default(""),
  email: emailSchema,
  fullName: z.string().optional().default(""),
  password: passwordSchema,
});

export const registerSchema = z
  .object({
    confirmPassword: z
      .string()
      .min(1, "Nhập lại mật khẩu để xác nhận."),
    email: emailSchema,
    fullName: fullNameSchema,
    password: passwordSchema,
  })
  .refine((values) => values.password === values.confirmPassword, {
    message: "Mật khẩu không trùng khớp, vui lòng thử lại.",
    path: ["confirmPassword"],
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
    confirmPassword:
      mode === "register" ? values.confirmPassword : undefined,
    email: values.email.trim(),
    fullName: mode === "register" ? values.fullName.trim() : undefined,
    password: values.password,
  };
}
