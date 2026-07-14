import { Ionicons } from "@expo/vector-icons";
import type { Meta, StoryObj } from "@storybook/react-native";
import { View } from "react-native";

import { Button } from "@/components/ui";

const meta = {
  title: "Design System/Button",
  component: Button,
  args: {
    children: "Tạo khoản thu",
    variant: "primary",
    size: "md",
    fullWidth: false,
    loading: false,
    disabled: false,
  },
  argTypes: {
    variant: {
      control: "select",
      options: ["primary", "secondary", "outline", "ghost", "destructive"],
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg", "icon"],
    },
  },
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  render: (args) => <Button {...args} />,
};

export const WithIcons: Story = {
  args: {
    children: "Gửi nhắc nợ",
    fullWidth: true,
  },
  render: (args) => (
    <Button
      {...args}
      leftIcon={<Ionicons name="send" size={18} color="#ffffff" />}
      rightIcon={<Ionicons name="chevron-forward" size={18} color="#ffffff" />}
    />
  ),
};

export const AllVariants: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => (
    <View className="gap-3">
      {(
        ["primary", "secondary", "outline", "ghost", "destructive"] as const
      ).map((variant) => (
        <Button key={variant} variant={variant} fullWidth>
          {variant}
        </Button>
      ))}
    </View>
  ),
};
