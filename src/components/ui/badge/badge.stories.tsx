import type { Meta, StoryObj } from "@storybook/react-native";
import { View } from "react-native";

import { Badge } from "@/components/ui";

const meta = {
  title: "Design System/Badge",
  component: Badge,
  args: {
    children: "Đã thu",
    variant: "success",
  },
  argTypes: {
    variant: {
      control: "select",
      options: ["primary", "accent", "success", "warning", "destructive", "neutral"],
    },
  },
} satisfies Meta<typeof Badge>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  render: (args) => <Badge {...args} />,
};

export const StatusSet: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => (
    <View className="flex-row flex-wrap gap-2">
      <Badge variant="primary">Treasurer</Badge>
      <Badge variant="accent">VietQR</Badge>
      <Badge variant="success">Đã thu</Badge>
      <Badge variant="warning">Chờ SePay</Badge>
      <Badge variant="destructive">Quá hạn</Badge>
      <Badge variant="neutral">Ledger</Badge>
    </View>
  ),
};
