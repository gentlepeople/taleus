import { ComponentProps, FC, ReactNode } from 'react';
import { ColorValue, Text as ReactNativeText, StyleProp, TextStyle } from 'react-native';
import { Merge } from 'type-fest';

import {
  ITextAligns,
  ITextColor,
  ITextTypes,
  getTextAlignStyle,
  getTextColorStyle,
  getTextTypeStyle,
} from './utils';

export type ITextColorProps =
  | {
      color?: ITextColor;
      customColor?: never;
    }
  | { color: 'custom'; customColor: ColorValue };

export type ITextProps = Merge<
  ComponentProps<typeof ReactNativeText>,
  {
    children: ReactNode;
    textType: ITextTypes;
    textAlignment?: ITextAligns;
  }
> &
  ITextColorProps;

export const Text: FC<ITextProps> = ({
  children,
  textType,
  textAlignment,
  color = 'primary',
  customColor,
  style,
  ...props
}) => {
  const textTypeStyle = getTextTypeStyle(textType);
  const textAlignStyle = getTextAlignStyle(textAlignment);
  const textColorStyle = getTextColorStyle(color, customColor);

  const augmentedStyle = {
    ...textAlignStyle,
    ...textColorStyle,
    ...textTypeStyle,
  } as StyleProp<TextStyle>;

  return (
    <ReactNativeText {...props} style={[augmentedStyle, style]}>
      {children}
    </ReactNativeText>
  );
};
