/**
 * This is the navigator you will modify to display the logged-in screens of your app.
 * You can use RootNavigator to also display an auth flow or other user flows.
 *
 * You'll likely spend most of your time in this file.
 */
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp, createStackNavigator } from '@react-navigation/stack';
import { View } from 'react-native';

import { palette } from '~/mobile-ui';

import { RootStackParamList } from '../root.stack';

const Example = () => {
  return (
    <View
      style={{
        width: 100,
        height: 100,
        backgroundColor: palette['sub-blueSky'],
      }}
    />
  );
};

export type AuthenticatedStackParamList = {
  //   InitialStack: NavigatorScreenParams<InitialStackParamList>;
  //   AuthenticationStack: NavigatorScreenParams<AuthenticationStackParamList>;
  Example: {};
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
      <AuthenticatedStackNavigator.Screen name="Example" component={Example} />
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
