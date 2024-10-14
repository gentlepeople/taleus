import { useCallback } from 'react';
import { EAuthType } from '~/providers';

import { SharedValue, useSharedValue } from 'react-native-reanimated';
import {
  useAuthenticationLandingContentSignInApple,
  useAuthentication_LandingCheckOnboardingCompleted,
  useAuthentication_LandingGoogleSignIn,
  useAuthentication_LandingKakaoSignIn,
  useAuthentication_LandingMixpanel,
  useAuthentication_LandingNavigation,
  useAuthentication_LandingOpenPreventBrowseModal,
} from './hooks';

type IAuthentication_LandingControllerInput = void;
type IAuthentication_LandingControllerOutput = {
  browseApp: () => void;
  kakaoSignUp: () => Promise<void>;
  googleSignUp: () => Promise<void>;
  appleSignUp: () => Promise<void>;

  progress: SharedValue<number>;
};

export const useAuthentication_LandingController: Controller<
  IAuthentication_LandingControllerInput,
  IAuthentication_LandingControllerOutput
> = () => {
  const progress = useSharedValue<number>(0);

  const { goHome } = useAuthentication_LandingNavigation();
  const { signInWithKakao } = useAuthentication_LandingKakaoSignIn();
  const { signInWithGoogle } = useAuthentication_LandingGoogleSignIn();
  const { signInWithApple } = useAuthenticationLandingContentSignInApple();
  const { hasOnboardingData } = useAuthentication_LandingCheckOnboardingCompleted();
  const { openPreventBrowseModal } = useAuthentication_LandingOpenPreventBrowseModal();
  const { clickLoginMixpanelEvent, clickViewMoreMixpanelEvent } =
    useAuthentication_LandingMixpanel();

  const browseApp = useCallback(() => {
    if (hasOnboardingData) {
      openPreventBrowseModal();
      return;
    }

    clickViewMoreMixpanelEvent();
    goHome();
  }, [goHome, hasOnboardingData, openPreventBrowseModal, clickViewMoreMixpanelEvent]);

  const kakaoSignUp = useCallback(async () => {
    await signInWithKakao();
    clickLoginMixpanelEvent(EAuthType.KAKAO);
  }, [signInWithKakao, clickLoginMixpanelEvent]);

  const googleSignUp = useCallback(async () => {
    await signInWithGoogle();
    clickLoginMixpanelEvent(EAuthType.GOOGLE);
  }, [signInWithGoogle, clickLoginMixpanelEvent]);

  const appleSignUp = useCallback(async () => {
    await signInWithApple();
    clickLoginMixpanelEvent(EAuthType.APPLE);
  }, [signInWithApple, clickLoginMixpanelEvent]);

  return {
    browseApp,
    kakaoSignUp,
    googleSignUp,
    appleSignUp,
    progress,
  };
};
