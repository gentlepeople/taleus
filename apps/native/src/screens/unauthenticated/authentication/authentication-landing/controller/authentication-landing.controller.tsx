import { useCallback } from 'react';

import {
  useAuthenticationLandingContentSignInApple,
  useAuthentication_LandingCheckOnboardingCompleted,
  useAuthentication_LandingGoogleSignIn,
  useAuthentication_LandingKakaoSignIn,
  useAuthentication_LandingNavigation,
  useAuthentication_LandingOpenPreventBrowseModal,
} from './hooks';

type IAuthentication_LandingControllerInput = void;
type IAuthentication_LandingControllerOutput = {
  browseApp: () => void;
  kakaoSignUp: () => Promise<void>;
  googleSignUp: () => Promise<void>;
  appleSignUp: () => Promise<void>;
};

export const useAuthentication_LandingController: Controller<
  IAuthentication_LandingControllerInput,
  IAuthentication_LandingControllerOutput
> = () => {
  const { goHome } = useAuthentication_LandingNavigation();
  const { signInWithKakao } = useAuthentication_LandingKakaoSignIn();
  const { signInWithGoogle } = useAuthentication_LandingGoogleSignIn();
  const { signInWithApple } = useAuthenticationLandingContentSignInApple();
  const { hasOnboardingData } = useAuthentication_LandingCheckOnboardingCompleted();
  const { openPreventBrowseModal } = useAuthentication_LandingOpenPreventBrowseModal();

  const browseApp = useCallback(() => {
    if (hasOnboardingData) {
      openPreventBrowseModal();
      return;
    }

    goHome();
  }, [goHome, hasOnboardingData, openPreventBrowseModal]);

  const kakaoSignUp = useCallback(async () => {
    await signInWithKakao();
  }, [signInWithKakao]);

  const googleSignUp = useCallback(async () => {
    await signInWithGoogle();
  }, [signInWithGoogle]);

  const appleSignUp = useCallback(async () => {
    await signInWithApple();
  }, [signInWithApple]);

  return { browseApp, kakaoSignUp, googleSignUp, appleSignUp };
};
