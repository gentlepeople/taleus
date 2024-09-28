import { memo, useCallback } from 'react';

import {
  Column,
  Columns,
  Icon,
  PressableQuark,
  Stack,
  Text,
  palette,
  size,
  spacing,
} from '~/mobile-ui';

type IPrimary_MyPage_SettingsViewProps = {
  onPressInquiry: () => void;
  onPressEditUserInfo: () => void;
  onPressConnectCouple: () => void;
  onPressPushNotification: () => void;
};

export const Primary_MyPage_SettingsView = memo<IPrimary_MyPage_SettingsViewProps>(
  ({ onPressInquiry, onPressEditUserInfo, onPressConnectCouple, onPressPushNotification }) => {
    const handlePressInquiry = useCallback(() => {
      onPressInquiry();
    }, [onPressInquiry]);

    const handlePressEditUserInfo = useCallback(() => {
      onPressEditUserInfo();
    }, [onPressEditUserInfo]);

    const handlePressConnectCouple = useCallback(() => {
      onPressConnectCouple();
    }, [onPressConnectCouple]);

    const handlePressPushNotification = useCallback(() => {
      onPressPushNotification();
    }, [onPressPushNotification]);

    return (
      <Stack space={spacing['5-x']} paddingX={spacing['4-x']} paddingTop={spacing['6-x']}>
        <PressableQuark onPress={handlePressInquiry}>
          <Columns alignY="center">
            <Column width="fluid">
              <Text textType="header-2" color="text-black">
                {'피드백 / 문의하기'}
              </Text>
            </Column>
            <Column width="content">
              <Icon name="right-arrow" size={size['4-x']} color={palette['disabled']} />
            </Column>
          </Columns>
        </PressableQuark>
        <PressableQuark onPress={handlePressEditUserInfo}>
          <Columns alignY="center">
            <Column width="fluid">
              <Text textType="header-2" color="text-black">
                {'개인정보 수정'}
              </Text>
            </Column>
            <Column width="content">
              <Icon name="right-arrow" size={size['4-x']} color={palette['disabled']} />
            </Column>
          </Columns>
        </PressableQuark>
        <PressableQuark onPress={handlePressConnectCouple}>
          <Columns alignY="center">
            <Column width="fluid">
              <Text textType="header-2" color="text-black">
                {'커플 연결'}
              </Text>
            </Column>
            <Column width="content">
              <Icon name="right-arrow" size={size['4-x']} color={palette['disabled']} />
            </Column>
          </Columns>
        </PressableQuark>
        <PressableQuark onPress={handlePressPushNotification}>
          <Columns alignY="center">
            <Column width="fluid">
              <Text textType="header-2" color="text-black">
                {'푸쉬 알림 설정'}
              </Text>
            </Column>
            <Column width="content">
              <Icon name="right-arrow" size={size['4-x']} color={palette['disabled']} />
            </Column>
          </Columns>
        </PressableQuark>
      </Stack>
    );
  },
);
