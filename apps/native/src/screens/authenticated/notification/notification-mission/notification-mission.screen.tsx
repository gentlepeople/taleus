import { CompositeNavigationProp, RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { FC } from 'react';

import { Stack, spacing } from '~/mobile-ui';
import { NotificationStackNavigationProp, NotificationStackParamList } from '../notification.stack';
import { useNotification_MissionController } from './controller';
import { Notification_MissionLayout } from './notification-mission.layout';
import { Notification_Mission_ButtonsView, Notification_Mission_ContentView } from './views';

export type Notification_MissionScreenNavigationProp = CompositeNavigationProp<
  StackNavigationProp<NotificationStackParamList, 'Notification_MissionScreen'>,
  NotificationStackNavigationProp
>;

export type Notification_MissionScreenRouteProp = RouteProp<
  NotificationStackParamList,
  'Notification_MissionScreen'
>;

export type INotification_MissionScreenProps = {
  navigation: Notification_MissionScreenNavigationProp;
  route: Notification_MissionScreenRouteProp;
};

export const Notification_MissionScreen: FC<INotification_MissionScreenProps> = () => {
  const { nickname, notificationTime, setMissionTime } = useNotification_MissionController();

  const renderContent = () => {
    return (
      <Stack space={spacing['15-x']} style={{ flex: 1, justifyContent: 'center' }}>
        <Notification_Mission_ContentView nickname={nickname} notificationTime={notificationTime} />
        <Notification_Mission_ButtonsView
          notificationTime={notificationTime}
          onChangeDate={setMissionTime}
        />
      </Stack>
    );
  };

  return <Notification_MissionLayout content={renderContent()} />;
};
