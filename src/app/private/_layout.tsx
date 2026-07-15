import { Redirect, Stack } from "expo-router";

import { LoadingScreen } from "@/features/auth/components/loading-screen";
import {
  selectIsAuthenticated,
  useAuthStore,
} from "@/features/auth/stores/auth-store";

const PrivateLayout = () => {
  const isAuthenticated = useAuthStore(selectIsAuthenticated);
  const status = useAuthStore((state) => state.status);

  if (status === "loading") {
    return <LoadingScreen />;
  }

  if (!isAuthenticated) {
    return <Redirect href="/login" />;
  }

  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    />
  );
};

export default PrivateLayout;
