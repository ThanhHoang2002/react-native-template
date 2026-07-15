import { useCallback, useState } from "react";
import {
  useForm,
  type Resolver,
  type ResolverResult,
} from "react-hook-form";

import {
  toAuthSubmitValues,
  validateAuthForm,
} from "../schemas/auth-form-schema";
import type {
  AuthFormValues,
  AuthMode,
  AuthSubmitHandler,
} from "../types/auth";

const authFormDefaultValues: AuthFormValues = {
  confirmPassword: "",
  email: "",
  fullName: "",
  password: "",
};

export function useAuthForm(initialMode: AuthMode) {
  const [mode, setMode] = useState<AuthMode>(initialMode);

  const resolver = useCallback<Resolver<AuthFormValues>>(
    async (values) => resolveAuthForm(mode, values),
    [mode],
  );

  const form = useForm<AuthFormValues>({
    defaultValues: authFormDefaultValues,
    mode: "onSubmit",
    reValidateMode: "onChange",
    resolver,
  });

  const isRegister = mode === "register";

  function changeMode(nextMode: AuthMode) {
    setMode(nextMode);
    form.clearErrors();

    if (nextMode === "login") {
      form.setValue("confirmPassword", "");
      form.setValue("fullName", "");
    }
  }

  function submit(onSubmit?: AuthSubmitHandler) {
    return form.handleSubmit((values) => {
      onSubmit?.(mode, toAuthSubmitValues(mode, values));
    });
  }

  return {
    control: form.control,
    errors: form.formState.errors,
    isRegister,
    mode,
    changeMode,
    submit,
  };
}

function resolveAuthForm(
  mode: AuthMode,
  values: AuthFormValues,
): ResolverResult<AuthFormValues> {
  const result = validateAuthForm(mode, values);

  if (result.success) {
    return {
      values: {
        confirmPassword: result.data.confirmPassword ?? "",
        email: result.data.email,
        fullName: result.data.fullName ?? "",
        password: result.data.password,
      },
      errors: {},
    };
  }

  return {
    values: {},
    errors: result.error.issues.reduce<ResolverResult<AuthFormValues>["errors"]>(
      (errors, issue) => {
        const fieldName = issue.path[0];

        if (typeof fieldName !== "string") {
          return errors;
        }

        errors[fieldName as keyof AuthFormValues] = {
          type: issue.code,
          message: issue.message,
        };

        return errors;
      },
      {},
    ),
  };
}
