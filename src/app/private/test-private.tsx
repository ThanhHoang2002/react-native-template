import { ScrollView, View } from "react-native";

import {
  Badge,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  ScreenBackground,
  Typography,
} from "@/components/ui";
import { usePermissionCheck } from "@/features/auth/hooks/use-permission-check";
import { useAuthStore } from "@/features/auth/stores/auth-store";

const TestPrivate = () => {
  const { hasAnyPermission } = usePermissionCheck();
  const isSubmitting = useAuthStore((state) => state.isSubmitting);
  const resources = useAuthStore((state) => state.resources);
  const signOut = useAuthStore((state) => state.signOut);
  const user = useAuthStore((state) => state.user);
  const displayName = user?.display_name ?? user?.name ?? user?.email;

  return (
    <ScreenBackground>
      <ScrollView
        className="flex-1"
        contentContainerClassName="min-h-full gap-5 px-5 pb-8 pt-16"
      >
        <View className="gap-3">
          <Badge variant="primary">Firebase authenticated</Badge>
          <Typography variant="display">Quỹ FC</Typography>
          <Typography variant="body">
            Phiên đăng nhập đã được xác thực bằng Firebase và đồng bộ với
            backend `/me`.
          </Typography>
        </View>

        <Card variant="muted">
          <CardHeader>
            <CardTitle>{displayName}</CardTitle>
            <CardDescription>{user?.email}</CardDescription>
          </CardHeader>
          <CardContent>
            <View className="flex-row gap-3">
              <View className="flex-1 rounded-glass-md border border-glass-border-strong bg-glass-surface-muted p-3">
                <Typography variant="caption">Resources</Typography>
                <Typography variant="title">{resources.length}</Typography>
              </View>
              <View className="flex-1 rounded-glass-md border border-glass-border-strong bg-glass-surface-muted p-3">
                <Typography variant="caption">Permission</Typography>
                <Typography variant="title">
                  {hasAnyPermission() ? "Có" : "Chưa có"}
                </Typography>
              </View>
            </View>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Resource-based UI</CardTitle>
            <CardDescription>
              Mobile dùng `resources[].subject` để ẩn hoặc hiện UI. Backend vẫn
              phải kiểm tra quyền ở từng API.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {resources.slice(0, 5).map((resource) => (
              <Badge key={resource.id} variant="neutral">
                {resource.subject}
              </Badge>
            ))}
            {resources.length === 0 ? (
              <Typography variant="caption">
                `/me` chưa trả resource nào cho tài khoản này.
              </Typography>
            ) : null}
          </CardContent>
        </Card>

        <Button
          fullWidth
          loading={isSubmitting}
          variant="destructive"
          onPress={signOut}
        >
          Đăng xuất
        </Button>
      </ScrollView>
    </ScreenBackground>
  );
};

export default TestPrivate;
