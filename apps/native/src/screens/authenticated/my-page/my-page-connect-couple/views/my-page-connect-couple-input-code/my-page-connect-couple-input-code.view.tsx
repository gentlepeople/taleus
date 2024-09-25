import { memo, useCallback, useState } from 'react';
import { Box, CustomCTA, Stack, Text, TextInput, radius, spacing } from '~/mobile-ui';

type IMyPage_ConnectCouple_InputCodeViewProps = {
  onPressConnect: () => Promise<void>;
  disabled: boolean;
};

export const MyPage_ConnectCouple_InputCodeView = memo<IMyPage_ConnectCouple_InputCodeViewProps>(
  ({ onPressConnect, disabled }) => {
    const [test, setTest] = useState<string>('');

    const handlePressConnect = useCallback(async () => {
      await onPressConnect();
    }, [onPressConnect]);

    return (
      <Stack space={spacing['4-x']}>
        <Text textType="title/18/bold" color="text-black" textAlignment="center">
          {'커플 코드 입력하기'}
        </Text>
        <Box paddingX={spacing['14-x']}>
          <TextInput
            placeholder="내 연인의 코드를 입력해주세요"
            currentValue={test}
            onChangeText={setTest}
            editable
            contentStyle={{ textAlign: 'center' }}
            style={{ paddingVertical: spacing['1-x'] }}
          />
        </Box>
        <Box paddingX={spacing['15-x']}>
          <CustomCTA
            borderRadius={radius['3-x']}
            buttons={[
              {
                label: '연결하기',
                textColor: 'white-100',
                onPress: handlePressConnect,
                disabled,
              },
            ]}
          />
        </Box>
      </Stack>
    );
  },
);
