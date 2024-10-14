import { memo, useCallback } from 'react';

import {
  Box,
  CustomCTA,
  PressableQuark,
  Stack,
  TALE_US_SMILE_LOGO,
  Text,
  palette,
  radius,
  size,
  spacing,
} from '~/mobile-ui';

type IMyPage_ConnectCouple_MyCodeViewProps = {
  personalCode: string;
  onPressCopy: () => void;
  onPressShare: () => Promise<void>;
};

export const MyPage_ConnectCouple_MyCodeView = memo<IMyPage_ConnectCouple_MyCodeViewProps>(
  ({ personalCode, onPressCopy, onPressShare }) => {
    const handlePressCopy = useCallback(() => {
      onPressCopy();
    }, [onPressCopy]);

    const handlePressShare = useCallback(() => {
      onPressShare();
    }, [onPressShare]);

    return (
      <Stack align="center" space={spacing['3-x']} paddingTop={spacing['10-x']}>
        <Stack space={spacing['2-x']}>
          <Text textType="biggest" color="text-black" textAlignment="center">
            {'커플 코드'}
          </Text>
          <PressableQuark onPress={handlePressCopy}>
            <Stack align="center" space={spacing['1-x']}>
              <Text textType="code" color="text-black" textAlignment="center">
                {personalCode}
              </Text>
              <Box
                style={{
                  width: size['27-x'],
                  height: size['1.25-x'],
                  backgroundColor: palette['code-divider'],
                }}
              />
            </Stack>
          </PressableQuark>
        </Stack>
        <Stack space={spacing['4-x']} paddingX={spacing['15-x']}>
          <CustomCTA
            borderRadius={radius['3-x']}
            buttons={[
              {
                label: '코드 복사하기',
                onPress: handlePressCopy,
                textColor: 'white-100',
                imageSource: TALE_US_SMILE_LOGO,
              },
              {
                label: '카카오 공유하기',
                onPress: handlePressShare,
                color: 'kakao-bg',
                iconName: 'kakao_logo',
              },
            ]}
          />
          <Box />
          <Box />
        </Stack>
      </Stack>
    );
  },
);
