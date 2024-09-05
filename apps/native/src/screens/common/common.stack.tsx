/**
 * This is the navigator you will modify to display the logged-in screens of your app.
 * You can use RootNavigator to also display an auth flow or other user flows.
 *
 * You'll likely spend most of your time in this file.
 */
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp, createStackNavigator } from '@react-navigation/stack';
import { FC } from 'react';

import { RootStackParamList } from '../root.stack';

import { WebViewScreen } from './web-view';

export type CommonStackParamList = {
  WebViewScreen: {
    title: string;
    linkUrl: string;
  };
};

export type CommonStackNavigationProp = StackNavigationProp<RootStackParamList, 'CommonStack'>;

type CommonStackRouteProp = RouteProp<RootStackParamList, 'CommonStack'>;

// Documentation: https://github.com/software-mansion/react-native-screens/tree/master/native-stack
const Stack = createStackNavigator<CommonStackParamList>();

export type ICommonStackProps = {
  navigation: CommonStackNavigationProp;
  route: CommonStackRouteProp;
};

export const CommonStack: FC<ICommonStackProps> = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="WebViewScreen" component={WebViewScreen} />
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
