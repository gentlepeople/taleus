import { LinkingOptions } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { View } from 'react-native';
import { ValueOf } from 'type-fest';

import { palette } from '~/mobile-ui';

const Example = () => {
  return <View style={{ width: 100, height: 100, backgroundColor: palette['sub-blueSky'] }} />;
};

export type RootStackParamList = {
  Example: {};
};

const RootStackNavigator = createStackNavigator<RootStackParamList>();

export const RootStack = ({}) => {
  // mobile ui 만 어느정도 셋업하고 github에 올리기
  // 이후 다른 vscode 창에서 받고, 모니모니 과제 준비(test code, ui 등)

  return (
    <RootStackNavigator.Navigator
      screenOptions={{
        headerShown: false,
        presentation: 'card',
        animationEnabled: true,
      }}
    >
      <RootStackNavigator.Screen name="Example" component={Example} />
    </RootStackNavigator.Navigator>
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
