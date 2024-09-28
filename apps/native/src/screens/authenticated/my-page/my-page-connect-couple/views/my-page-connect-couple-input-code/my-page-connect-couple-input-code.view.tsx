import { memo, useCallback } from 'react';

import { Box, CustomCTA, Stack, Text, TextInput, radius, spacing } from '~/mobile-ui';

type IMyPage_ConnectCouple_InputCodeViewProps = {
  partnerPersonalCode: string;
  isCTADisabled: boolean;
  onChangeCode: (code: string) => void;
  onPressConnect: () => Promise<void>;
};

export const MyPage_ConnectCouple_InputCodeView = memo<IMyPage_ConnectCouple_InputCodeViewProps>(
  ({ partnerPersonalCode, isCTADisabled, onChangeCode, onPressConnect }) => {
    const handleChangeCode = useCallback(
      (code: string) => {
        onChangeCode(code);
      },
      [onChangeCode],
    );

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
            currentValue={partnerPersonalCode}
            onChangeText={handleChangeCode}
            editable
            contentStyle={{ textAlign: 'center' }}
            style={{ paddingVertical: spacing['1-x'] }}
            maxLength={8}
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
                disabled: isCTADisabled,
              },
            ]}
          />
        </Box>
      </Stack>
    );
  },
);
