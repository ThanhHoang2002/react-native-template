import { View } from "react-native";

import { Typography } from "@/components/ui";

import { authMetrics } from "../constants/auth-content";

export function AuthMetricsRow() {
  return (
    <View className="flex-row gap-3">
      {authMetrics.map((metric) => (
        <AuthMetric key={metric.label} value={metric.value} label={metric.label} />
      ))}
    </View>
  );
}

type AuthMetricProps = {
  value: string;
  label: string;
};

function AuthMetric({ value, label }: AuthMetricProps) {
  return (
    <View className="min-h-20 flex-1 justify-center rounded-glass-md border border-white/12 bg-white/8 px-3">
      <Typography variant="label" className="text-white">
        {value}
      </Typography>
      <Typography variant="caption" className="text-white/62">
        {label}
      </Typography>
    </View>
  );
}
