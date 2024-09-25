import { memo, useState } from 'react';
import { Stack, Text, TextInput, spacing } from '~/mobile-ui';

type IAuthentication_SignUp_NicknameViewProps = {};

export const Authentication_SignUp_NicknameView = memo<IAuthentication_SignUp_NicknameViewProps>(
  () => {
    const [test, setTest] = useState<string>('');

    return (
      <Stack paddingX={spacing['6-x']} space={spacing['2-x']}>
        <Text textType="body/14/medium" color="text-black">
          {'닉네임'}
        </Text>
        <TextInput
          placeholder="나의 애칭 또는 별명을 적어주세요."
          currentValue={test}
          onChangeText={setTest}
          editable
        />
      </Stack>
    );
  },
);
