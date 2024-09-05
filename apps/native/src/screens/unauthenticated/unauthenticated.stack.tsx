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

export type UnauthenticatedStackParamList = {
  //   InitialStack: NavigatorScreenParams<InitialStackParamList>;
  //   AuthenticationStack: NavigatorScreenParams<AuthenticationStackParamList>;
  Example: {};
};

export type UnauthenticatedStackNavigationProp = StackNavigationProp<
  RootStackParamList,
  'UnauthenticatedStack'
>;

type UnauthenticatedStackRouteProp = RouteProp<RootStackParamList, 'UnauthenticatedStack'>;

// Documentation: https://github.com/software-mansion/react-native-screens/tree/master/native-stack
const UnauthenticatedStackNavigator = createStackNavigator<UnauthenticatedStackParamList>();

export type IUnauthenticatedStackProps = {
  navigation: UnauthenticatedStackNavigationProp;
  route: UnauthenticatedStackRouteProp;
};

export const UnauthenticatedStack = () => {
  return (
    <UnauthenticatedStackNavigator.Navigator screenOptions={{ headerShown: false }}>
      <UnauthenticatedStackNavigator.Screen name="Example" component={Example} />
    </UnauthenticatedStackNavigator.Navigator>
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
