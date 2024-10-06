import { CompositeNavigationProp, RouteProp } from '@react-navigation/native';
import { StackNavigationProp, createStackNavigator } from '@react-navigation/stack';
import { FC } from 'react';

import { AuthenticatedStackNavigationProp, AuthenticatedStackParamList } from '..';
import { Notification_MissionScreen } from './notification-mission';

export type NotificationStackParamList = {
  Notification_MissionScreen: {};
};

export type NotificationStackNavigationProp = CompositeNavigationProp<
  AuthenticatedStackNavigationProp,
  StackNavigationProp<AuthenticatedStackParamList, 'NotificationStack'>
>;

type NotificationStackRouteProp = RouteProp<AuthenticatedStackParamList, 'NotificationStack'>;

const Stack = createStackNavigator<NotificationStackParamList>();

export type INotificationStackProps = {
  navigation: NotificationStackNavigationProp;
  route: NotificationStackRouteProp;
};

export const NotificationStack: FC<INotificationStackProps> = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Notification_MissionScreen" component={Notification_MissionScreen} />
    </Stack.Navigator>
  );
};
