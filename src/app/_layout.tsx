import { Stack } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import StorybookUIRoot from "../../.rnstorybook";
import { QueryProvider } from "@/components/providers/query-provider";
import { AuthProvider } from "@/features/auth/providers/auth-provider";
import "../styles/global.css";


export default function RootLayout() {
  if (process.env.EXPO_PUBLIC_STORYBOOK_ENABLED === "true") {
    return <StorybookUIRoot />;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <QueryProvider>
        <AuthProvider>
          <Stack
            screenOptions={{
              gestureEnabled: true,
              fullScreenGestureEnabled: true,
              headerShown: false,
            }}
          />
        </AuthProvider>
      </QueryProvider>
    </GestureHandlerRootView>
  );
}
