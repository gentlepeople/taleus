import auth from '@react-native-firebase/auth';
import { logout as kakaoLogout } from '@react-native-seoul/kakao-login';
import { useCallback } from 'react';
import { useAsyncCallback } from 'react-async-hook';
import { useMutationIndicator } from '~/hooks';

type IPrimary_MyPageSignOutInput = void;
type IPrimary_MyPageSignOutOutput = {
  signOut: () => Promise<void>;
};

export const usePrimary_MyPageSignOut: Hook<
  IPrimary_MyPageSignOutInput,
  IPrimary_MyPageSignOutOutput
> = () => {
  const { execute: signOutAuth, loading: isSigningOut } = useAsyncCallback(
    async () => {
      try {
        await kakaoLogout();
      } catch (e) {
        console.log('kakao: not signed in');
      }
      await auth().signOut();
    },
    // {
    //   onSuccess: () =>
    //     // mixpanel.trackEvent({
    //     //   type: EMixpanelEventType.LOG_OUT,
    //     //   properties: {},
    //     // }),
    // },
  );

  useMutationIndicator([isSigningOut]);

  const signOut = useCallback(async () => {
    await signOutAuth();
  }, [signOutAuth]);

  return { signOut };
};
