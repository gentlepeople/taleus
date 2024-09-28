import { memo, useCallback } from 'react';

import { Column, Columns, CustomCTA, Divider, Stack, Text, spacing } from '~/mobile-ui';

type IMyPage_ConnectComplete_ContentViewProps = {
  userName: string;
  partnerName: string;
  onPressCTA: () => void;
};

export const MyPage_ConnectComplete_ContentView = memo<IMyPage_ConnectComplete_ContentViewProps>(
  ({ userName, partnerName, onPressCTA }) => {
    const handlePressCTA = useCallback(() => {
      onPressCTA();
    }, [onPressCTA]);

    return (
      <Stack space={spacing['30-x']} paddingTop={spacing['16-x']}>
        <Stack paddingX={spacing['4-x']} space={spacing['8-x']}>
          <Text textType="button-2" color="text-black" textAlignment="center">
            {'커플 연결이 되었어요'}
          </Text>
          <Columns space={spacing['2-x']} alignY="center" alignX="center">
            <Column width="fluid">
              <Text textType="code" color="text-black" textAlignment="right">
                {userName}
              </Text>
            </Column>
            <Column width="content">
              <Text textType="code" color="text-black">
                {'💓'}
              </Text>
            </Column>
            <Column width="fluid">
              <Text textType="code" color="text-black">
                {partnerName}
              </Text>
            </Column>
          </Columns>
          <Divider />
        </Stack>
        <Stack space={spacing['4-x']}>
          <Text textType="body/15/bold" color="black-100" textAlignment="center">
            {'지금 바로\n대화를 통해\n서로를 더알아가보세요!❤️‍🔥✨'}
          </Text>
          <CustomCTA
            paddingX={spacing['4-x']}
            buttons={[
              {
                label: '홈으로 가기',
                onPress: handlePressCTA,
                textColor: 'white-100',
              },
            ]}
          />
        </Stack>
      </Stack>
    );
  },
);
