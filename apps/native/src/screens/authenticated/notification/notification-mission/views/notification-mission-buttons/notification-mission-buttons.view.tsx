import { memo, useCallback } from 'react';

import { Box, PressableQuark, Stack, Text, palette, radius, size, spacing } from '~/mobile-ui';

type INotification_Mission_ButtonsViewProps = {
  onPress: () => void;
};

export const Notification_Mission_ButtonsView = memo<INotification_Mission_ButtonsViewProps>(
  ({ onPress }) => {
    const handlePressCTA = useCallback(() => {
      onPress();
    }, [onPress]);

    return (
      <Stack paddingX={spacing['4-x']}>
        <PressableQuark onPress={handlePressCTA}>
          <Box
            alignX="center"
            alignY="center"
            paddingY={spacing['3-x']}
            style={{
              backgroundColor: palette['primary'],
              borderRadius: radius['4-x'],
              height: size['12-x'],
            }}
          >
            <Text textType="header-2" color="white-100" textAlignment="center">
              {'우리 커플에게 맞는 시간 설정하기'}
            </Text>
          </Box>
        </PressableQuark>
      </Stack>
    );
  },
);
