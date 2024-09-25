import { ComponentProps, FC, ReactNode } from 'react';
import { Pressable as NativePressable, ViewStyle } from 'react-native';
import { Merge } from 'type-fest';

type IPressableCustomProps = {
  children: ReactNode;
  style?: ViewStyle;
};

type IPressableQuarkProps = Merge<ComponentProps<typeof NativePressable>, IPressableCustomProps>;

export const PressableQuark: FC<IPressableQuarkProps> = ({ children, onPress, style, ...rest }) => {
  return (
    <NativePressable
      onPress={onPress}
      style={({ pressed }) => [{ opacity: pressed ? 0.6 : 1, ...style }]}
      {...rest}
    >
      {children}
    </NativePressable>
  );
};
