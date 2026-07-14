import { Ionicons } from "@expo/vector-icons";
import { View } from "react-native";

import { Badge, Typography } from "@/components/ui";

import { authCopy } from "../constants/auth-content";
import type { AuthMode } from "../types/auth";

type AuthHeroProps = {
  mode: AuthMode;
};

export function AuthHero({ mode }: AuthHeroProps) {
  const copy = authCopy[mode];

  return (
    <View className="gap-5">
      <View className="flex-row items-center justify-between">
        <View className="h-14 w-14 items-center justify-center rounded-glass-lg border border-primary/35 bg-primary/16">
          <Ionicons name="football-outline" size={28} color="#2dbe8f" />
        </View>
        <Badge variant="primary">Quỹ FC</Badge>
      </View>

      <View className="gap-3">
        <Typography variant="display">
          {copy.title}
        </Typography>
        <Typography variant="body" className="max-w-[340px]">
          {copy.description}
        </Typography>
      </View>
    </View>
  );
}
