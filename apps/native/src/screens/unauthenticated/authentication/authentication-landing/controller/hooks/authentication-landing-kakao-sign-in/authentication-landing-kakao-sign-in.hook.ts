import { useAuthentication_LadingKaKaoSignInMutation } from '@gentlepeople/taleus-codegen';
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { KakaoOAuthToken, login as kakaoLogin } from '@react-native-seoul/kakao-login';
import { useAsyncCallback } from 'react-async-hook';

import { useMutationIndicator } from '~/hooks';
import { useApollo } from '~/providers';

type IAuthentication_LandingKakaoSignInInput = void;
type IAuthentication_LandingKakaoSignInOutput = {
  signInWithKakao: () => Promise<FirebaseAuthTypes.UserCredential>;
};

export const useAuthentication_LandingKakaoSignIn: Hook<
  IAuthentication_LandingKakaoSignInInput,
  IAuthentication_LandingKakaoSignInOutput
> = () => {
  const [getKakaoToken, { error }] = useAuthentication_LadingKaKaoSignInMutation();
  const { updateToken } = useApollo();
  // const { appsFlyer } = useAppsFlyer();
  // const { mixpanel } = useMixpanel();

  const { execute: signInWithKakao, loading: isSigningInWithKakao } = useAsyncCallback(
    async (): Promise<FirebaseAuthTypes.UserCredential> => {
      try {
        const kakaoResult = (await kakaoLogin()) as KakaoOAuthToken;
        const { accessToken } = kakaoResult;

        const customTokenData = await getKakaoToken({
          variables: {
            accessToken,
          },
        });

        const success = customTokenData.data?.kakaoLogin;
        if (success && success.customToken) {
          const customToken = success.customToken;

          return await auth().signInWithCustomToken(customToken);
        }

        throw new Error('Kakao login failed or no custom token returned.');
      } catch (e) {
        console.error('Error during Kakao login:', e);
        throw e;
      }
    },
    {
      onSuccess: async (user: FirebaseAuthTypes.UserCredential) => {
        const idToken = await user.user.getIdToken();
        await updateToken(idToken);
        // if (user) {
        //   await appsFlyer.track({
        //     eventName: EAppsFlyerEventType.AF_LOGIN,
        //     eventValues: {},
        //   });
        //   mixpanel.trackEvent({
        //     type: EMixpanelEventType.LOGIN,
        //     properties: {
        //       authType: Enum_Auth_Provider_Type.Kakao,
        //       isNewUser: user.additionalUserInfo.isNewUser,
        //     },
        //   });
        // }
      },
      onError: (e) => {
        console.log('kakaoError', e);
      },
    },
  );

  useMutationIndicator([isSigningInWithKakao]);

  return {
    signInWithKakao,
  };
};
