import { Ionicons } from "@expo/vector-icons";

import { Button } from "@/components/ui";

type GoogleSignInButtonProps = {
  disabled?: boolean;
  onPress?: () => void;
};

export function GoogleSignInButton({
  disabled,
  onPress,
}: GoogleSignInButtonProps) {
  return (
    <Button
      disabled={disabled}
      fullWidth
      variant="secondary"
      onPress={onPress}
      leftIcon={<Ionicons name="logo-google" size={19} color="#4285f4" />}
    >
      Đăng nhập bằng SSO
    </Button>
  );
}
