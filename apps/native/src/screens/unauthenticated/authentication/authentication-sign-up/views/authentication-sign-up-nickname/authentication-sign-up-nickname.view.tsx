import { memo } from 'react';

import { Stack, Text, TextInput, spacing } from '~/mobile-ui';

type IAuthentication_SignUp_NicknameViewProps = {
  value: string;
  onChangeText: (text: string) => void;
};

export const Authentication_SignUp_NicknameView = memo<IAuthentication_SignUp_NicknameViewProps>(
  ({ value, onChangeText }) => {
    return (
      <Stack paddingX={spacing['6-x']} space={spacing['2-x']}>
        <Text textType="body/14/medium" color="text-black">
          {'닉네임'}
        </Text>
        <TextInput
          placeholder="나의 애칭 또는 별명을 적어주세요."
          currentValue={value}
          onChangeText={onChangeText}
          editable
        />
      </Stack>
    );
  },
);
