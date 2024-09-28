/**
 * This is the navigator you will modify to display the logged-in screens of your app.
 * You can use RootNavigator to also display an Authentication flow or other user flows.
 *
 * You'll likely spend most of your time in this file.
 */
import { CompositeNavigationProp, RouteProp } from '@react-navigation/native';
import { StackNavigationProp, createStackNavigator } from '@react-navigation/stack';

import { useAuth } from '~/providers';

import { UnauthenticatedStackNavigationProp, UnauthenticatedStackParamList } from '..';

import { FC } from 'react';
import { Box } from '../../../mobile-ui';
import { Authentication_LandingScreen } from './authentication-landing';
import { Authentication_SignUpScreen } from './authentication-sign-up';

export type AuthenticationStackParamList = {
  Authentication_LandingScreen: {};
  Authentication_SignUpScreen: {};
  Authentication_DeperecatedScreen: {};
};

const Authentication_DeperecatedScreen: FC = () => {
  // TODO:민기 추후에 시간 있을 때 이거 지우고 Authenticated Stack으로 sign up -> onboarding 으로 이름 바꾸면서 옮기기
  // 그리고 currentUser 로 rootStack 에서 컨트롤 하기 unauthenticated부터 여기까진 조건부 처리 없이
  return <Box />;
};

export type AuthenticationStackNavigationProp = CompositeNavigationProp<
  UnauthenticatedStackNavigationProp,
  StackNavigationProp<UnauthenticatedStackParamList, 'AuthenticationStack'>
>;

type AuthenticationStackRouteProp = RouteProp<UnauthenticatedStackParamList, 'AuthenticationStack'>;

// Documentation: https://github.com/software-mansion/react-native-screens/tree/master/native-stack
const Stack = createStackNavigator<AuthenticationStackParamList>();

export type IAuthenticationStackProps = {
  navigation: AuthenticationStackNavigationProp;
  route: AuthenticationStackRouteProp;
};

export const AuthenticationStack = () => {
  const { currentUser } = useAuth();

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {!currentUser && (
        <Stack.Screen
          name="Authentication_LandingScreen"
          component={Authentication_LandingScreen}
        />
      )}
      {currentUser && !currentUser.isProfileCompleted && (
        <Stack.Screen name="Authentication_SignUpScreen" component={Authentication_SignUpScreen} />
      )}
      <Stack.Screen
        name="Authentication_DeperecatedScreen"
        component={Authentication_DeperecatedScreen}
      />
    </Stack.Navigator>
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
