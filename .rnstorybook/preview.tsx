import type { Preview } from "@storybook/react-native";
import { View } from "react-native";

import "../src/styles/global.css";
import { ScreenBackground } from "../src/components/ui";

const preview: Preview = {
  decorators: [
    (Story) => (
      <ScreenBackground>
        <View className="flex-1 px-5 py-10">
          <Story />
        </View>
      </ScreenBackground>
    ),
  ],
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
};

export default preview;
