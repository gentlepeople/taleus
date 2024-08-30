import { FC, ReactNode } from 'react';
import { TextInput as NativeTextInput } from 'react-native-paper';

import { palette } from '../../../theme';

import { getTextColorStyle, getTextTypeStyle } from '../text';

export type ITextInputProps = {
  placeholder: string;
  currentValue: string;
  onChangeText?: (text: string) => void;
  editable: boolean;
  right?: ReactNode;
};

export const TextInput: FC<ITextInputProps> = ({
  placeholder,
  currentValue,
  onChangeText,
  editable,
  right,
}) => {
  const textTypeStyle = getTextTypeStyle('body-1');
  const textColorStyle = getTextColorStyle(currentValue ? 'textPrimary' : 'textSecondary');

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
      multiline={false}
      placeholder={placeholder}
      contentStyle={{
        ...textTypeStyle,
        ...textColorStyle,
      }}
      theme={{ colors: { onSurfaceVariant: palette['gray'] } }}
      style={{
        backgroundColor: 'transparent',
      }}
      outlineColor={palette['gray']}
      activeOutlineColor={palette['gray']}
      editable={editable}
    />
  );
};
