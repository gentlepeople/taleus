import { LinkingOptions, NavigatorScreenParams } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { ModalProvider } from 'react-native-modalfy';
import { ValueOf } from 'type-fest';

import { useAuth } from '~/providers';
import { AuthenticatedStack, AuthenticatedStackParamList } from './authenticated';
import { CommonStack, CommonStackParamList } from './common';
import { modalStack } from './modal';
import { UnauthenticatedStack, UnauthenticatedStackParamList } from './unauthenticated';

export type RootStackParamList = {
  UnauthenticatedStack: NavigatorScreenParams<UnauthenticatedStackParamList>;
  AuthenticatedStack: NavigatorScreenParams<AuthenticatedStackParamList>;
  CommonStack: NavigatorScreenParams<CommonStackParamList>;
};

const RootStackNavigator = createStackNavigator<RootStackParamList>();

export const RootStack = ({}) => {
  const { currentUser } = useAuth();

  return (
    <ModalProvider stack={modalStack}>
      <RootStackNavigator.Navigator
        screenOptions={{
          headerShown: false,
          presentation: 'card',
          animationEnabled: true,
        }}
      >
        {!currentUser?.isProfileCompleted && (
          <RootStackNavigator.Screen name="UnauthenticatedStack" component={UnauthenticatedStack} />
        )}
        <RootStackNavigator.Screen name="AuthenticatedStack" component={AuthenticatedStack} />
        <RootStackNavigator.Screen name="CommonStack" component={CommonStack} />
      </RootStackNavigator.Navigator>
    </ModalProvider>
  );
};

export const rootStackLinkingConfig: ValueOf<LinkingOptions<RootStackParamList>, 'config'> = {
  screens: {
    AuthenticatedStack: {
      screens: {
        MyPageStack: {
          path: 'my-page',
          screens: {
            MyPage_ConnectCoupleScreen: {
              path: 'connect-couple',
              parse: {
                partnerPersonalCode: String,
              },
            },
          },
        },
      },
    },
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
