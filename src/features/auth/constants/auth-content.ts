import type { ComponentProps } from "react";

import type { Ionicons } from "@expo/vector-icons";

import type { AuthMode } from "../types/auth";

type IoniconName = ComponentProps<typeof Ionicons>["name"];

export const authCopy: Record<AuthMode, { title: string; description: string }> = {
  login: {
    title: "Đăng nhập Quỹ FC",
    description: "Vào đội của bạn để theo dõi quỹ, khoản cần thu và lịch trận.",
  },
  register: {
    title: "Tạo tài khoản đội bóng",
    description:
      "Bắt đầu quản lý quỹ, công nợ và thanh toán cho đội bóng của bạn.",
  },
};

export const authMetrics = [
  {
    value: "1",
    label: "đội đang chọn",
  },
  {
    value: "0đ",
    label: "không giữ tiền",
  },
  {
    value: "UTC",
    label: "lưu thời gian",
  },
];
