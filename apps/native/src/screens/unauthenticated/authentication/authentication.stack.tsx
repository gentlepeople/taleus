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

import { Authentication_LandingScreen } from './authentication-landing';
import { Authentication_SignUpScreen } from './authentication-sign-up';

export type AuthenticationStackParamList = {
  Authentication_LandingScreen: {};
  Authentication_SignUpScreen: {};
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
