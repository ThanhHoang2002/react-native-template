import { Stack } from "expo-router";
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import StorybookUIRoot from "../../.rnstorybook";
import "../styles/global.css";


export default function RootLayout() {
  if (process.env.EXPO_PUBLIC_STORYBOOK_ENABLED === "true") {
    return <StorybookUIRoot />;
  }

  return (
    <GestureHandlerRootView  style={{ flex: 1 }}>
      <Stack
        screenOptions={{
          gestureEnabled: true,
          fullScreenGestureEnabled: true,
          headerShown: false
        }}
      />
    </GestureHandlerRootView>
  );}
