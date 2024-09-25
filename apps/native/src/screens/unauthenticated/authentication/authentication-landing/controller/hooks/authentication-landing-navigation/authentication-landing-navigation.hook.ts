import { useNavigation } from '@react-navigation/native';
import { useCallback } from 'react';

import { Authentication_LandingScreenNavigationProp } from '../../../authentication-landing.screen';

type IAuthentication_LandingNavigationInput = void;
type IAuthentication_LandingNavigationOutput = {
  goHome: () => void;
  goSignUp: () => void;
};

export const useAuthentication_LandingNavigation: Hook<
  IAuthentication_LandingNavigationInput,
  IAuthentication_LandingNavigationOutput
> = () => {
  const navigation = useNavigation<Authentication_LandingScreenNavigationProp>();

  const goHome = useCallback(() => {
    navigation.replace('AuthenticatedStack', {
      screen: 'PrimaryStack',
      params: {
        screen: 'Primary_HomeScreen',
      },
    });
  }, [navigation]);

  const goSignUp = useCallback(() => {
    navigation.navigate('AuthenticationStack', {
      screen: 'Authentication_SignUpScreen',
    });
  }, [navigation]);

  return { goHome, goSignUp };
};
