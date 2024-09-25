import { useCallback } from 'react';
import { useAuthentication_LandingKakaoSignIn, useAuthentication_LandingNavigation } from './hooks';

type IAuthentication_LandingControllerInput = void;
type IAuthentication_LandingControllerOutput = {
  browseApp: () => void;
  kakaoSignUp: () => void;
};

export const useAuthentication_LandingController: Controller<
  IAuthentication_LandingControllerInput,
  IAuthentication_LandingControllerOutput
> = () => {
  const { goHome, goSignUp } = useAuthentication_LandingNavigation();
  const {} = useAuthentication_LandingKakaoSignIn();

  const browseApp = useCallback(() => {
    goHome();
  }, [goHome]);

  const kakaoSignUp = useCallback(() => {
    goSignUp();
  }, [goSignUp]);

  return { browseApp, kakaoSignUp };
};
