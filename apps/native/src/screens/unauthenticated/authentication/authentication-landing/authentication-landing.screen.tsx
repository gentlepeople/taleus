import { CompositeNavigationProp, RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { FC } from 'react';

import { AuthenticationStackNavigationProp, AuthenticationStackParamList } from '..';

import { Stack, spacing } from '../../../../mobile-ui';
import { Authentication_LandingLayout } from './authentication-landing.layout';
import { useAuthentication_LandingController } from './controller';
import {
  Authentication_Landing_CTAView,
  Authentication_Landing_IntroView,
  Authentication_Landing_ProgressDotsView,
} from './views';

export type Authentication_LandingScreenNavigationProp = CompositeNavigationProp<
  AuthenticationStackNavigationProp,
  StackNavigationProp<AuthenticationStackParamList, 'Authentication_LandingScreen'>
>;

export type Authentication_LandingScreenRouteProp = RouteProp<
  AuthenticationStackParamList,
  'Authentication_LandingScreen'
>;

export type IAuthentication_LandingScreenProps = {
  navigation: Authentication_LandingScreenNavigationProp;
  route: Authentication_LandingScreenRouteProp;
};

export const Authentication_LandingScreen: FC<IAuthentication_LandingScreenProps> = ({}) => {
  const { browseApp, kakaoSignUp, googleSignUp, appleSignUp, progress } =
    useAuthentication_LandingController();

  return (
    <Authentication_LandingLayout
      content={<Authentication_Landing_IntroView progress={progress} />}
      footer={
        <Stack space={spacing['10-x']}>
          <Authentication_Landing_ProgressDotsView progress={progress} />
          <Authentication_Landing_CTAView
            onPressBrowse={browseApp}
            onPressKakao={kakaoSignUp}
            onPressGoogle={googleSignUp}
            onPressApple={appleSignUp}
          />
        </Stack>
      }
    />
  );
};
