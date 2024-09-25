import { CompositeNavigationProp, RouteProp } from '@react-navigation/native';
import { StackNavigationProp, createStackNavigator } from '@react-navigation/stack';
import { FC } from 'react';
import { AuthenticatedStackNavigationProp, AuthenticatedStackParamList } from '..';
import { MyPage_ConnectCompleteScreen } from './my-page-connect-complete';
import { MyPage_ConnectCoupleScreen } from './my-page-connect-couple';
import { MyPage_EditUserInfoScreen } from './my-page-edit-user-info';
import { MyPage_PushNotificationScreen } from './my-page-push-notification';

export type MyPageStackParamList = {
  MyPage_ConnectCoupleScreen: {};
  MyPage_ConnectCompleteScreen: {};
  MyPage_EditUserInfoScreen: {};
  MyPage_PushNotificationScreen: {};
};

export type MyPageStackNavigationProp = CompositeNavigationProp<
  AuthenticatedStackNavigationProp,
  StackNavigationProp<AuthenticatedStackParamList, 'MyPageStack'>
>;

type MyPageStackRouteProp = RouteProp<AuthenticatedStackParamList, 'MyPageStack'>;

const Stack = createStackNavigator<MyPageStackParamList>();

export type IMyPageStackProps = {
  navigation: MyPageStackNavigationProp;
  route: MyPageStackRouteProp;
};

export const MyPageStack: FC<IMyPageStackProps> = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="MyPage_ConnectCoupleScreen" component={MyPage_ConnectCoupleScreen} />
      <Stack.Screen name="MyPage_ConnectCompleteScreen" component={MyPage_ConnectCompleteScreen} />
      <Stack.Screen name="MyPage_EditUserInfoScreen" component={MyPage_EditUserInfoScreen} />
      <Stack.Screen
        name="MyPage_PushNotificationScreen"
        component={MyPage_PushNotificationScreen}
      />
    </Stack.Navigator>
  );
};
