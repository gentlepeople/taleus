import { ComponentProps } from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import ShimmerPlaceholder, { createShimmerPlaceholder } from 'react-native-shimmer-placeholder';
import { Merge } from 'type-fest';

export type ISkeletonProps = Merge<
  ComponentProps<typeof ShimmerPlaceholder>,
  {
    style?: StyleProp<ViewStyle>;
  }
>;

const NativeShimmerPlaceholder = createShimmerPlaceholder(LinearGradient);

export const Skeleton = ({ ...props }: ISkeletonProps) => {
  return <NativeShimmerPlaceholder {...props} />;
};
