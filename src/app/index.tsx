import { Redirect } from "expo-router";

import { LoadingScreen } from "@/features/auth/components/loading-screen";
import {
  selectIsAuthenticated,
  useAuthStore,
} from "@/features/auth/stores/auth-store";

export default function App() {
  const isAuthenticated = useAuthStore(selectIsAuthenticated);
  const status = useAuthStore((state) => state.status);

  if (status === "loading") {
    return <LoadingScreen />;
  }

  return (
    <Redirect href={isAuthenticated ? "/private/test-private" : "/login"} />
  );
}
