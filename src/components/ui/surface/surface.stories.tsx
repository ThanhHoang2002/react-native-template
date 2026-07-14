import type { Meta, StoryObj } from "@storybook/react-native";
import { View } from "react-native";

import { Card, CardContent, CardDescription, CardHeader, CardTitle, Surface, Typography } from "@/components/ui";

const meta = {
  title: "Design System/Surface",
  component: Surface,
  args: {
    variant: "default",
    padded: true,
  },
  argTypes: {
    variant: {
      control: "select",
      options: ["muted", "default", "strong", "dark"],
    },
  },
} satisfies Meta<typeof Surface>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  render: (args) => (
    <Surface {...args}>
      <Typography variant="title" className="text-white">
        Số dư quỹ
      </Typography>
      <Typography variant="body" className="text-white/72">
        Glass surface dùng cho dashboard, form và summary blocks.
      </Typography>
    </Surface>
  ),
};

export const Cards: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => (
    <View className="gap-4">
      {(["muted", "default", "strong", "dark"] as const).map((variant) => (
        <Card key={variant} variant={variant}>
          <CardHeader>
            <CardTitle className="text-white">{variant}</CardTitle>
            <CardDescription className="text-white/72">
              Card surface for finance and attendance workflows.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Typography variant="caption" className="text-white/64">
              Border, blur and glow are bundled into the component.
            </Typography>
          </CardContent>
        </Card>
      ))}
    </View>
  ),
};
