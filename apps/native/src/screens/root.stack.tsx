import { LinkingOptions, NavigatorScreenParams } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { ModalProvider } from 'react-native-modalfy';
import { ValueOf } from 'type-fest';

import { AuthenticatedStack, AuthenticatedStackParamList } from './authenticated';
import { CommonStack, CommonStackParamList } from './common';
import { modalStack } from './modal';
import { UnauthenticatedStack, UnauthenticatedStackParamList } from './unauthenticated';

export type RootStackParamList = {
  AuthenticatedStack: NavigatorScreenParams<AuthenticatedStackParamList>;
  UnauthenticatedStack: NavigatorScreenParams<UnauthenticatedStackParamList>;
  CommonStack: NavigatorScreenParams<CommonStackParamList>;
};

const RootStackNavigator = createStackNavigator<RootStackParamList>();

export const RootStack = ({}) => {
  return (
    <ModalProvider stack={modalStack}>
      <RootStackNavigator.Navigator
        screenOptions={{
          headerShown: false,
          presentation: 'card',
          animationEnabled: true,
        }}
      >
        <RootStackNavigator.Screen name="UnauthenticatedStack" component={UnauthenticatedStack} />
        <RootStackNavigator.Screen name="AuthenticatedStack" component={AuthenticatedStack} />
        <RootStackNavigator.Screen name="CommonStack" component={CommonStack} />
      </RootStackNavigator.Navigator>
    </ModalProvider>
  );
};

export const rootStackLinkingConfig: ValueOf<LinkingOptions<RootStackParamList>, 'config'> = {
  screens: {
    // UnauthenticatedStack: {
    //   screens: {
    //     InitialStack: {
    //       path: 'initial',
    //       screens: {
    //         InitialFontSizeScreen: {
    //           path: 'font-size',
    //         },
    //       },
    //     },
    //     AuthenticationStack: {
    //       path: 'auth',
    //       screens: {
    //         AuthenticationLandingScreen: {
    //           path: 'landing',
    //         },
    //         AuthenticationPhoneSignInScreen: {
    //           path: 'phone',
    //         },
    //       },
    //     },
    //   },
    // },
  },
};
