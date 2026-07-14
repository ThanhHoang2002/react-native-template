import { View } from "react-native";

import { Typography } from "@/components/ui";

import { authMetrics } from "../constants/auth-content";

export function AuthMetricsRow() {
  return (
    <View className="flex-row gap-3">
      {authMetrics.map((metric) => (
        <AuthMetric
          key={metric.label}
          value={metric.value}
          label={metric.label}
        />
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
    <View className="min-h-20 flex-1 justify-center rounded-glass-md border border-glass-border-strong bg-glass-surface-muted px-3">
      <Typography variant="label">
        {value}
      </Typography>
      <Typography variant="caption">
        {label}
      </Typography>
    </View>
  );
}
