import { useNavigation } from '@react-navigation/native';
import { useCallback } from 'react';

import { Authentication_SignUpScreenNavigationProp } from '../../../authentication-sign-up.screen';

type IAuthentication_SignUpNavigationInput = void;
type IAuthentication_SignUpNavigationOutput = {
  goHome: () => void;
};

export const useAuthentication_SignUpNavigation: Hook<
  IAuthentication_SignUpNavigationInput,
  IAuthentication_SignUpNavigationOutput
> = () => {
  const navigation = useNavigation<Authentication_SignUpScreenNavigationProp>();

  const goHome = useCallback(() => {
    navigation.replace('AuthenticatedStack', {
      screen: 'PrimaryStack',
      params: {
        screen: 'Primary_HomeScreen',
      },
    });
  }, [navigation]);

  return { goHome };
};
