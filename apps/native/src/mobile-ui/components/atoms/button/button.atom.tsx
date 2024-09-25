import { ComponentProps } from 'react';
import { TextStyle } from 'react-native';
import { Button as PaperButton } from 'react-native-paper';
import { Merge, ValueOf } from 'type-fest';

import { palette, radius, spacing } from '../../../theme';
import { ITextColor, ITextTypes, Text } from '../text';

export type IButtonProps = Merge<
  Omit<ComponentProps<typeof PaperButton>, 'loading'>,
  {
    size?: 'smallest' | 'small' | 'medium' | 'large' | 'xLarge';
    textColor?: ITextColor;
    textType?: ITextTypes;
    textStyle?: TextStyle;
    isFullWidth?: boolean;
    isTopBorder?: boolean;
    isBottomBorder?: boolean;
  }
>;

export const Button = ({
  size = 'medium',
  buttonColor,
  style,
  textColor,
  textType = 'button',
  textStyle,
  contentStyle,
  labelStyle,
  onPress,
  isFullWidth = false,
  isTopBorder = false,
  isBottomBorder = false,
  ...rest
}: IButtonProps) => {
  const handlePaddingVertical = (size: ValueOf<IButtonProps, 'size'>) => {
    switch (size) {
      case 'smallest':
        return spacing['1.25-x'];
      case 'small':
        return spacing['2-x'];
      case 'medium':
        return spacing['2.5-x'];
      case 'large':
        return spacing['3.5-x'];
      case 'xLarge':
        return spacing['4.5-x'];
      default:
        return spacing['4-x'];
    }
  };

  const getPaddingHorizontal = (size: ValueOf<IButtonProps, 'size'>) => {
    switch (size) {
      case 'smallest':
        return spacing['3-x'];
      case 'small':
        return spacing['2.5-x'];
      case 'medium':
        return spacing['4-x'];
      case 'large':
        return spacing['5.5-x'];
      case 'xLarge':
        return spacing['5.5-x'];
      default:
        return spacing['4-x'];
    }
  };

  const getBorderStyle = () => {
    if (isFullWidth) {
      return { borderRadius: 0 };
    }

    if (isTopBorder) {
      return {
        borderTopLeftRadius: radius['4-x'],
        borderTopRightRadius: radius['4-x'],
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
      };
    }

    if (isBottomBorder) {
      return {
        borderTopLeftRadius: 0,
        borderTopRightRadius: 0,
        borderBottomLeftRadius: radius['4-x'],
        borderBottomRightRadius: radius['4-x'],
      };
    }

    return { borderRadius: radius['4-x'] };
  };

  return (
    <PaperButton
      buttonColor={buttonColor}
      onPress={onPress}
      contentStyle={[
        {
          paddingVertical: handlePaddingVertical(size),
          paddingHorizontal: getPaddingHorizontal(size),
        },
        contentStyle,
      ]}
      style={[
        {
          elevation: 0,
          ...getBorderStyle(),
          borderWidth: 1,
          backgroundColor: palette['primary'],
          ...(rest.disabled && { backgroundColor: palette['disabled'] }),
          ...(rest.mode === 'outlined'
            ? { borderColor: palette['gray-300'] }
            : { borderColor: palette['transparent'] }),
        },
        style,
      ]}
      labelStyle={[{ marginVertical: 0, ...(!rest.icon && { marginHorizontal: 0 }) }, labelStyle]}
      {...rest}
    >
      <Text style={{ ...textStyle }} textType={textType} color={textColor} textAlignment="center">
        {rest.children}
      </Text>
    </PaperButton>
  );
};
