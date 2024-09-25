import { memo, useCallback, useState } from 'react';
import { Switch } from 'react-native-paper';
import { Column, Columns, Text, spacing } from '~/mobile-ui';

type IMyPage_PushNotification_ButtonViewProps = {};

export const MyPage_PushNoficiation_ButtonView = memo<IMyPage_PushNotification_ButtonViewProps>(
  () => {
    const [isSwitchOn, setIsSwitchOn] = useState<boolean>(false);

    const onToggleSwitch = useCallback(() => {
      setIsSwitchOn((prev) => !prev);
    }, [setIsSwitchOn]);

    return (
      <Columns paddingX={spacing['4-x']} paddingTop={spacing['8-x']}>
        <Column width="fluid">
          <Text textType="biggest" color="text-black">
            {'알림'}
          </Text>
        </Column>
        <Column width="content">
          <Switch value={isSwitchOn} onValueChange={onToggleSwitch} />
        </Column>
      </Columns>
    );
  },
);
