import { Stack } from "expo-router";

import StorybookUIRoot from "../../.rnstorybook";

export default function RootLayout() {
  if (process.env.EXPO_PUBLIC_STORYBOOK_ENABLED === "true") {
    return <StorybookUIRoot />;
  }

  return <Stack screenOptions={{ headerShown: false }} />;
}
