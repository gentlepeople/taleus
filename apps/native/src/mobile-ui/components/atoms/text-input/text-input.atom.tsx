import { FC, ReactNode } from 'react';
import { StyleProp, TextStyle } from 'react-native';
import { TextInput as NativeTextInput } from 'react-native-paper';

import { palette, radius, size } from '../../../theme';
import { getTextColorStyle, getTextTypeStyle } from '../text';

export type ITextInputProps = {
  placeholder: string;
  currentValue: string;
  onChangeText?: (text: string) => void;
  editable?: boolean;
  right?: ReactNode;
  width?: number;
  textAlignCenter?: boolean;
  style?: StyleProp<TextStyle>;
  contentStyle?: StyleProp<TextStyle>;
  multiLine?: boolean;
  isLengthOvered?: boolean;
  maxLength?: number;
};

export const TextInput: FC<ITextInputProps> = ({
  placeholder,
  currentValue,
  onChangeText,
  editable = true,
  right,
  width,
  textAlignCenter,
  style,
  contentStyle,
  multiLine = false,
  isLengthOvered,
  maxLength,
}) => {
  const textTypeStyle = getTextTypeStyle('body/14/regular');
  const textColorStyle = getTextColorStyle(currentValue ? 'text-black' : 'gray-20');

  const handleChangeTextInput = (text: string) => {
    onChangeText(text);
  };

  return (
    <NativeTextInput
      mode="outlined"
      keyboardType="default"
      value={currentValue}
      onChangeText={(text: string) => {
        handleChangeTextInput(text);
      }}
      right={right}
      multiline={multiLine}
      placeholder={placeholder}
      contentStyle={[
        {
          ...textTypeStyle,
          ...textColorStyle,
          textAlign: textAlignCenter ? 'center' : 'auto',
        },
        contentStyle,
      ]}
      theme={{
        colors: { onSurfaceVariant: palette['text-black'] },
      }}
      style={[
        {
          backgroundColor: 'transparent',
          height: size['10-x'],
          width: width && width,
        },
        style,
      ]}
      outlineStyle={{ borderRadius: radius['4-x'] }}
      outlineColor={isLengthOvered ? palette['danger'] : palette['gray-20']}
      activeOutlineColor={isLengthOvered ? palette['danger'] : palette['primary']}
      editable={editable}
      maxLength={maxLength}
    />
  );
};
