import type { Meta, StoryObj } from "@storybook/react-native";
import { View } from "react-native";

import { Typography } from "./typography";

const meta = {
  title: "Design System/Typography",
  component: Typography,
  args: {
    children: "Theo dõi quỹ, công nợ và đối soát chuyển khoản.",
    variant: "body",
  },
  argTypes: {
    variant: {
      control: "select",
      options: ["display", "title", "body", "label", "caption"],
    },
  },
} satisfies Meta<typeof Typography>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  render: (args) => <Typography {...args} className="text-white" />,
};

export const Scale: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => (
    <View className="gap-3">
      <Typography variant="display" className="text-white">
        Quỹ FC
      </Typography>
      <Typography variant="title" className="text-white">
        Trận kế tiếp
      </Typography>
      <Typography variant="body" className="text-white/76">
        Theo dõi quỹ, công nợ và đối soát chuyển khoản theo từng đội.
      </Typography>
      <Typography variant="label" className="text-white">
        Số dư quỹ hiện tại
      </Typography>
      <Typography variant="caption" className="text-white/64">
        Cập nhật 5 phút trước
      </Typography>
    </View>
  ),
};
