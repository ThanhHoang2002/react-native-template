import { Ionicons } from "@expo/vector-icons";
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
  ScreenBackground,
  Typography,
} from "@/components/ui";

const fundBars = [
  "h-12",
  "h-20",
  "h-16",
  "h-28",
  "h-24",
  "h-32",
  "h-28",
  "h-36",
] as const;

const memberDebts = [
  {
    name: "Minh",
    amount: "80k",
    status: "Quá hạn",
    variant: "destructive" as const,
  },
  {
    name: "Hoàng",
    amount: "80k",
    status: "Chờ SePay",
    variant: "warning" as const,
  },
  { name: "Long", amount: "0đ", status: "Đã thu", variant: "success" as const },
];

export default function App() {
  return (
    <ScreenBackground>
      <ScrollView
        className="flex-1"
        contentInsetAdjustmentBehavior="automatic"
        contentContainerClassName="min-h-full gap-5 px-5 pb-8 pt-16"
      >
        <View className="flex-row items-center justify-between">
          <View className="flex-1 gap-2 pr-4">
            <Badge variant="primary">FC Anh Em • Treasurer</Badge>
            <Typography variant="display">
              Quỹ FC
            </Typography>
            <Typography variant="body">
              Theo dõi quỹ, công nợ và đối soát chuyển khoản theo từng đội.
            </Typography>
          </View>
          <View className="h-12 w-12 items-center justify-center rounded-full border border-glass-border-strong bg-glass-surface-strong">
            <Typography variant="label">
              FC
            </Typography>
          </View>
        </View>

        <Card
          variant="muted"
          className="border-glass-border-strong"
          contentClassName="gap-6"
        >
          <View className="gap-3">
            <View className="flex-row items-start justify-between gap-4">
              <View className="flex-1 gap-2">
                <Typography variant="caption">
                  Số dư quỹ hiện tại
                </Typography>
                <Typography variant="display">
                  2.450.000đ
                </Typography>
              </View>
              <Badge variant="success">+12% tháng này</Badge>
            </View>
            <View className="h-2 overflow-hidden rounded-full bg-foreground/10">
              <View className="h-full w-[72%] rounded-full bg-primary" />
            </View>
          </View>

          <View className="flex-row rounded-glass-md border border-glass-border-strong bg-glass-surface-muted p-3">
            <View className="flex-1 gap-1">
              <Typography variant="caption">
                Đã thu
              </Typography>
              <Typography variant="label">
                1.600.000đ
              </Typography>
            </View>
            <View className="mx-3 w-px bg-foreground/10" />
            <View className="flex-1 gap-1">
              <Typography variant="caption">
                Còn nợ
              </Typography>
              <Typography variant="label">
                850.000đ
              </Typography>
            </View>
            <View className="mx-3 w-px bg-foreground/10" />
            <View className="flex-1 gap-1">
              <Typography variant="caption">
                Review
              </Typography>
              <Typography variant="label">
                2 giao dịch
              </Typography>
            </View>
          </View>

          <View className="gap-3">
            <View className="flex-row items-center justify-between">
              <View>
                <Typography variant="title">
                  Dòng tiền 8 tuần
                </Typography>
                <Typography variant="caption">
                  Thu quỹ, tiền sân và chi phí trận
                </Typography>
              </View>
              <Badge variant="neutral">Ledger</Badge>
            </View>

            <View className="h-56 justify-end overflow-hidden rounded-glass-lg border border-glass-border-strong bg-glass-surface-muted p-5">
              <View className="absolute inset-x-5 top-6 h-px bg-foreground/8" />
              <View className="absolute inset-x-5 top-20 h-px bg-foreground/8" />
              <View className="absolute inset-x-5 top-36 h-px bg-foreground/8" />
              <View className="flex-row items-end justify-between">
                {fundBars.map((height, index) => (
                  <View key={index} className="items-center gap-2">
                    <View className={`w-3 rounded-full bg-primary ${height}`} />
                    <View className="h-1.5 w-1.5 rounded-full bg-accent/60" />
                  </View>
                ))}
              </View>
            </View>
          </View>

          <Button
            fullWidth
            size="lg"
            leftIcon={<Ionicons name="add-circle" size={20} color="#ffffff" />}
          >
            Tạo khoản thu trận mới
          </Button>
        </Card>

        <View className="flex-row gap-4">
          <Card variant="default" className="flex-1">
            <CardHeader>
              <View className="h-10 w-10 items-center justify-center rounded-full border border-accent/30 bg-accent/14">
                <Ionicons name="qr-code" size={20} color="#43b8f2" />
              </View>
              <Badge variant="accent">VietQR</Badge>
              <Typography variant="title">
                12
              </Typography>
              <Typography variant="caption">
                giao dịch
              </Typography>
            </CardHeader>
          </Card>
          <Card variant="default" className="flex-1">
            <CardHeader>
              <View className="h-10 w-10 items-center justify-center rounded-full border border-warning/30 bg-warning/14">
                <Ionicons name="hourglass" size={20} color="#f9ca49" />
              </View>
              <Badge variant="warning">Chờ thu</Badge>
              <Typography variant="title">
                7
              </Typography>
              <Typography variant="caption">
                thành viên
              </Typography>
            </CardHeader>
          </Card>
        </View>

        <Card variant="dark" contentClassName="gap-5">
          <CardHeader>
            <View className="flex-row items-center justify-between">
              <View className="gap-1">
                <CardTitle className="text-white">Trận kế tiếp</CardTitle>
                <CardDescription className="text-white/72">
                  Kèo tối thứ Tư • Sân Phương Đông
                </CardDescription>
              </View>
              <Badge variant="primary">18:30</Badge>
            </View>
          </CardHeader>
          <CardContent>
            <View className="flex-row gap-3">
              <View className="flex-1 rounded-glass-md border border-white/12 bg-white/8 p-3">
                <Typography variant="caption" className="text-white/70">
                  Đi đá
                </Typography>
                <Typography variant="title" className="text-white">
                  14
                </Typography>
              </View>
              <View className="flex-1 rounded-glass-md border border-white/12 bg-white/8 p-3">
                <Typography variant="caption" className="text-white/70">
                  Tổng chi
                </Typography>
                <Typography variant="title" className="text-white">
                  1.120k
                </Typography>
              </View>
              <View className="flex-1 rounded-glass-md border border-white/12 bg-white/8 p-3">
                <Typography variant="caption" className="text-white/70">
                  Chia đều
                </Typography>
                <Typography variant="title" className="text-white">
                  80k
                </Typography>
              </View>
            </View>
            <Button variant="secondary" fullWidth>
              Xem preview chia tiền
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Đối soát SePay</CardTitle>
            <CardDescription>
              Kiểm tra giao dịch theo mã chuyển khoản duy nhất của từng khoản
              phải thu.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Input
              label="Số tiền"
              placeholder="80000"
              helperText="VND được lưu dạng số nguyên."
            />
            <Input
              label="Mã chuyển khoản"
              placeholder="QF7K9X2P"
              helperText="Mã rõ ràng để tự động khớp VietQR."
            />
          </CardContent>
        </Card>

        <Card variant="muted" contentClassName="gap-4">
          <CardHeader>
            <CardTitle>Công nợ thành viên</CardTitle>
            <CardDescription>
              Thành viên chỉ thấy khoản của mình, thủ quỹ thấy toàn đội.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {memberDebts.map((member) => (
              <View
                key={member.name}
                className="flex-row items-center justify-between rounded-glass-md border border-glass-border-strong bg-glass-surface-muted p-3"
              >
                <View className="flex-row items-center gap-3">
                  <View className="h-9 w-9 items-center justify-center rounded-full bg-primary/14">
                    <Typography variant="caption" className="text-primary">
                      {member.name.slice(0, 1)}
                    </Typography>
                  </View>
                  <View>
                    <Typography variant="label">
                      {member.name}
                    </Typography>
                    <Typography variant="caption">
                      Cần thu: {member.amount}
                    </Typography>
                  </View>
                </View>
                <Badge variant={member.variant}>{member.status}</Badge>
              </View>
            ))}
          </CardContent>
        </Card>
      </ScrollView>
    </ScreenBackground>
  );
}
