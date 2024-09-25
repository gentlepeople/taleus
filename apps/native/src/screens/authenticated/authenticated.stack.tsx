/**
 * This is the navigator you will modify to display the logged-in screens of your app.
 * You can use RootNavigator to also display an auth flow or other user flows.
 *
 * You'll likely spend most of your time in this file.
 */
import { NavigatorScreenParams, RouteProp } from '@react-navigation/native';
import { StackNavigationProp, createStackNavigator } from '@react-navigation/stack';

import { RootStackParamList } from '../root.stack';
import { FeedStack, FeedStackParamList } from './feed';
import { MyPageStack, MyPageStackParamList } from './my-page';
import { PrimaryStack, PrimaryStackParamList } from './primary';

// Primary stack 만드는거부터 진행 탭 스크린들

export type AuthenticatedStackParamList = {
  PrimaryStack: NavigatorScreenParams<PrimaryStackParamList>;
  FeedStack: NavigatorScreenParams<FeedStackParamList>;
  MyPageStack: NavigatorScreenParams<MyPageStackParamList>;
};

export type AuthenticatedStackNavigationProp = StackNavigationProp<
  RootStackParamList,
  'AuthenticatedStack'
>;

type AuthenticatedStackRouteProp = RouteProp<RootStackParamList, 'AuthenticatedStack'>;

// Documentation: https://github.com/software-mansion/react-native-screens/tree/master/native-stack
const AuthenticatedStackNavigator = createStackNavigator<AuthenticatedStackParamList>();

export type IAuthenticatedStackProps = {
  navigation: AuthenticatedStackNavigationProp;
  route: AuthenticatedStackRouteProp;
};

export const AuthenticatedStack = () => {
  return (
    <AuthenticatedStackNavigator.Navigator screenOptions={{ headerShown: false }}>
      <AuthenticatedStackNavigator.Screen name="PrimaryStack" component={PrimaryStack} />
      <AuthenticatedStackNavigator.Screen name="FeedStack" component={FeedStack} />
      <AuthenticatedStackNavigator.Screen name="MyPageStack" component={MyPageStack} />
    </AuthenticatedStackNavigator.Navigator>
  );
};

/**
 * A list of routes from which we're allowed to leave the app when
 * the user presses the back button on Android.
 *
 * Anything not on this list will be a standard `back` action in
 * react-navigation.
 *
 * `canExit` is used in ./app/app.tsx in the `useBackButtonHandler` hook.
 */
// const exitRoutes = ['welcome'];
// export const canExit = (routeName: string) => exitRoutes.includes(routeName);
