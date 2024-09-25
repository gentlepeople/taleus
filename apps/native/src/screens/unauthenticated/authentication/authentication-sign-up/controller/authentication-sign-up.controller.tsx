import { useCallback } from 'react';
import { useAuthentication_SignUpNavigation } from './hooks';

type IAuthentication_SignUpControllerInput = void;
type IAuthentication_SignUpControllerOutput = {
  signUp: () => void;
};

export const useAuthentication_SignUpController: Controller<
  IAuthentication_SignUpControllerInput,
  IAuthentication_SignUpControllerOutput
> = () => {
  const { goHome } = useAuthentication_SignUpNavigation();

  const signUp = useCallback(() => {
    goHome();
  }, [goHome]);

  return { signUp };
};
