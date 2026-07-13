import { Image as RNImage } from "expo-image";
import React from "react";
import { StyleSheet } from "react-native";
import { useCssElement } from "react-native-css";
import Animated from "react-native-reanimated";

const AnimatedExpoImage = Animated.createAnimatedComponent(RNImage);

export type ImageProps = React.ComponentProps<typeof CSSImage> & {
  className?: string;
};

function CSSImage(props: React.ComponentProps<typeof AnimatedExpoImage>) {
  const flattened = StyleSheet.flatten(props.style) ?? {};
  const { objectFit, objectPosition, ...style } = flattened as typeof flattened & {
    objectFit?: React.ComponentProps<typeof AnimatedExpoImage>["contentFit"];
    objectPosition?: React.ComponentProps<typeof AnimatedExpoImage>["contentPosition"];
  };

  return (
    <AnimatedExpoImage
      contentFit={objectFit}
      contentPosition={objectPosition}
      {...props}
      source={
        typeof props.source === "string" ? { uri: props.source } : props.source
      }
      style={
        style as React.ComponentProps<typeof AnimatedExpoImage>["style"]
      }
    />
  );
}

export const Image = (
  props: React.ComponentProps<typeof CSSImage> & { className?: string }
) => {
  // @ts-expect-error useCssElement generic depth with expo-image
  return useCssElement(
    CSSImage as React.ComponentType<
      React.ComponentProps<typeof CSSImage> & { className?: string }
    >,
    props,
    { className: "style" }
  );
};

Image.displayName = "CSS(Image)";
