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

type IPrimary_MyPage_AppInfoViewProps = {
  onPresssDeleteUser: () => void;
  onPressSignOut: () => void;
};

export const Primary_MyPage_AppInfoView = memo<IPrimary_MyPage_AppInfoViewProps>(
  ({ onPresssDeleteUser, onPressSignOut }) => {
    const handlePressDeleteUser = useCallback(() => {
      onPresssDeleteUser();
    }, [onPresssDeleteUser]);

    const handlePressSignOut = useCallback(() => {
      onPressSignOut();
    }, [onPressSignOut]);

    return (
      <Stack space={spacing['8-x']} paddingX={spacing['4-x']} paddingTop={spacing['8-x']}>
        <Stack space={spacing['4-x']}>
          <Text textType="body/12/regular" color="disabled">
            {'앱 정보'}
          </Text>
          <PressableQuark onPress={() => {}}>
            <Columns alignY="center">
              <Column width="fluid">
                <Text textType="header-2" color="text-black">
                  {'앱 버전 정보'}
                </Text>
              </Column>
              <Column width="content">
                <Text textType="header-2" color="disabled">
                  {'v0.0.1'}
                </Text>
              </Column>
            </Columns>
          </PressableQuark>
        </Stack>
        <Stack space={spacing['4-x']}>
          <PressableQuark onPress={handlePressSignOut}>
            <Columns alignY="center">
              <Column width="fluid">
                <Text textType="header-2" color="text-black">
                  {'로그아웃'}
                </Text>
              </Column>
              <Column width="content">
                <Icon name="right-arrow" size={size['4-x']} color={palette['disabled']} />
              </Column>
            </Columns>
          </PressableQuark>
          <PressableQuark onPress={handlePressDeleteUser}>
            <Columns alignY="center">
              <Column width="fluid">
                <Text textType="header-2" color="text-black">
                  {'회원 탈퇴'}
                </Text>
              </Column>
              <Column width="content">
                <Icon name="right-arrow" size={size['4-x']} color={palette['disabled']} />
              </Column>
            </Columns>
          </PressableQuark>
        </Stack>
      </Stack>
    );
  },
);
