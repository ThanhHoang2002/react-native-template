import { Link } from "expo-router";
import { View } from "react-native";

export default function App() {
  // return <AuthScreen />;
  return (
    <View className="flex-1 items-center justify-center">
      <Link href="/preview">Preview</Link>
    </View>
  );
}
