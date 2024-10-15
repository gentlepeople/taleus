import auth from '@react-native-firebase/auth';
import { logout as kakaoLogout } from '@react-native-seoul/kakao-login';
import { useCallback } from 'react';
import { useAsyncCallback } from 'react-async-hook';
import { useMutationIndicator } from '~/hooks';

type IAuthentication_SignUpSignOutInput = void;
type IAuthentication_SignUpSignOutOutput = {
  signOut: () => Promise<void>;
};

export const useAuthentication_SignUpSignOut: Hook<
  IAuthentication_SignUpSignOutInput,
  IAuthentication_SignUpSignOutOutput
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
