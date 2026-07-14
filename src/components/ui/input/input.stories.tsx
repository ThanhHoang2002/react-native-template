import type { Meta, StoryObj } from "@storybook/react-native";
import { View } from "react-native";

import { Input } from "@/components/ui";

const meta = {
  title: "Design System/Input",
  component: Input,
  args: {
    label: "Số tiền",
    placeholder: "80000",
    helperText: "VND được lưu dạng số nguyên.",
    errorText: "",
    editable: true,
  },
} satisfies Meta<typeof Input>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  render: (args) => <Input {...args} />,
};

export const States: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => (
    <View className="gap-4">
      <Input label="Số tiền" placeholder="80000" helperText="VND được lưu dạng số nguyên." />
      <Input label="Mã chuyển khoản" value="QF7K9X2P" editable={false} />
      <Input label="Tên thành viên" value="Minh" errorText="Tên này đã tồn tại trong đội." />
    </View>
  ),
};
