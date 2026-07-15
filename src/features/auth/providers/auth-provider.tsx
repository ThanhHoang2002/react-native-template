import { useEffect, type PropsWithChildren } from "react";

import { useAuthStore } from "../stores/auth-store";

export function AuthProvider({ children }: PropsWithChildren) {
  const bootstrap = useAuthStore((state) => state.bootstrap);

  useEffect(() => {
    bootstrap();
  }, [bootstrap]);

  return children;
}
