import { CompositeNavigationProp, RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { FC } from 'react';

import { MyPageStackNavigationProp, MyPageStackParamList } from '..';
import { Primary_MyPageLayout } from './my-page-push-notification.layout';
import { MyPage_PushNoficiation_ButtonView, MyPage_PushNoficiation_HeaderView } from './views';

export type MyPage_PushNotificationScreenNavigationProp = CompositeNavigationProp<
  StackNavigationProp<MyPageStackParamList, 'MyPage_PushNotificationScreen'>,
  MyPageStackNavigationProp
>;

export type MyPage_PushNotificationScreenRouteProp = RouteProp<
  MyPageStackParamList,
  'MyPage_PushNotificationScreen'
>;

export type IMyPage_PushNotificationScreenProps = {
  navigation: MyPage_PushNotificationScreenNavigationProp;
  route: MyPage_PushNotificationScreenRouteProp;
};

export const MyPage_PushNotificationScreen: FC<IMyPage_PushNotificationScreenProps> = () => {
  return (
    <Primary_MyPageLayout
      header={<MyPage_PushNoficiation_HeaderView />}
      content={<MyPage_PushNoficiation_ButtonView />}
    />
  );
};
