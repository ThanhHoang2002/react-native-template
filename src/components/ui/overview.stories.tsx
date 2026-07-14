import { Ionicons } from "@expo/vector-icons";
import type { Meta, StoryObj } from "@storybook/react-native";
import { ScrollView, View } from "react-native";

import {
  Badge,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Input,
  Surface,
  Typography,
} from ".";

const meta = {
  title: "Design System/Overview",
  component: View,
  parameters: {
    controls: { disable: true },
  },
} satisfies Meta<typeof View>;

export default meta;

type Story = StoryObj<typeof meta>;

const badgeVariants = [
  "primary",
  "accent",
  "success",
  "warning",
  "destructive",
  "neutral",
] as const;
const buttonVariants = [
  "primary",
  "secondary",
  "outline",
  "ghost",
  "destructive",
] as const;
const surfaceVariants = ["muted", "default", "strong", "dark"] as const;

export const Foundation: Story = {
  render: () => (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerClassName="gap-5 pb-10"
    >
      <View className="gap-2">
        <Badge variant="primary">FC Anh Em</Badge>
        <Typography variant="display">
          Design System
        </Typography>
        <Typography variant="body">
          Components for football team finance, attendance and payment
          workflows.
        </Typography>
      </View>

      <Card variant="muted">
        <CardHeader>
          <CardTitle>Typography</CardTitle>
          <CardDescription>
            Display, title, body, label and caption styles.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Typography variant="display">
            Quỹ FC
          </Typography>
          <Typography variant="title">
            Trận kế tiếp
          </Typography>
          <Typography variant="body">
            Theo dõi quỹ, công nợ và đối soát chuyển khoản theo từng đội.
          </Typography>
          <Typography variant="label">
            Số dư quỹ hiện tại
          </Typography>
          <Typography variant="caption">
            Cập nhật 5 phút trước
          </Typography>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Buttons</CardTitle>
          <CardDescription>
            Primary actions, secondary surfaces and destructive states.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {buttonVariants.map((variant) => (
            <Button
              key={variant}
              variant={variant}
              leftIcon={<Ionicons name="football" size={18} color="#2dbe8f" />}
            >
              {variant}
            </Button>
          ))}
        </CardContent>
      </Card>

      <Card variant="dark">
        <CardHeader>
          <CardTitle className="text-white">Badges</CardTitle>
          <CardDescription className="text-white/72">
            Compact status labels for payment and attendance state.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex-row flex-wrap">
          {badgeVariants.map((variant) => (
            <Badge key={variant} variant={variant}>
              {variant}
            </Badge>
          ))}
        </CardContent>
      </Card>

      <Card variant="muted">
        <CardHeader>
          <CardTitle>Inputs</CardTitle>
          <CardDescription>
            Form fields with helper and error copy.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Input
            label="Số tiền"
            placeholder="80000"
            helperText="VND được lưu dạng số nguyên."
          />
          <Input label="Mã chuyển khoản" value="QF7K9X2P" editable={false} />
          <Input
            label="Tên thành viên"
            value="Minh"
            errorText="Tên này đã tồn tại trong đội."
          />
        </CardContent>
      </Card>

      <View className="gap-3">
        <Typography variant="title">
          Surfaces
        </Typography>
        {surfaceVariants.map((variant) => (
          <Surface key={variant} variant={variant}>
            <Typography
              variant="label"
              className={variant === "dark" ? "text-white" : undefined}
            >
              {variant}
            </Typography>
            <Typography
              variant="caption"
              className={variant === "dark" ? "text-white/68" : undefined}
            >
              Glass surface for cards, panels and dense workflow blocks.
            </Typography>
          </Surface>
        ))}
      </View>
    </ScrollView>
  ),
};
