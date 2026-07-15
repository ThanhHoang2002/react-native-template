import { ActivityIndicator, View } from "react-native";

import { ScreenBackground, Typography } from "@/components/ui";

export function LoadingScreen() {
  return (
    <ScreenBackground>
      <View className="flex-1 items-center justify-center gap-3 px-6">
        <ActivityIndicator color="#2dbe8f" />
        <Typography variant="caption">Đang kiểm tra phiên đăng nhập...</Typography>
      </View>
    </ScreenBackground>
  );
}
