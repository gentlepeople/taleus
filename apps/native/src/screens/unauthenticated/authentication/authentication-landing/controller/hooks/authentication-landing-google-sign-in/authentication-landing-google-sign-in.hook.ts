import { useAuthentication_LandingGoogleSignInMutation } from '@gentlepeople/taleus-codegen';
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { useAsyncCallback } from 'react-async-hook';
import Config from 'react-native-config';

import { useMutationIndicator } from '~/hooks';
import { useApollo } from '~/providers';

type IAuthentication_LandingGoogleSignInInput = void;
type IAuthentication_LandingGoogleSignInOutput = {
  signInWithGoogle: () => Promise<FirebaseAuthTypes.UserCredential>;
};

export const useAuthentication_LandingGoogleSignIn: Hook<
  IAuthentication_LandingGoogleSignInInput,
  IAuthentication_LandingGoogleSignInOutput
> = () => {
  const [getGoogleToken] = useAuthentication_LandingGoogleSignInMutation();
  const { updateToken } = useApollo();
  //   const { mixpanel } = useMixpanel();
  //   const { appsFlyer } = useAppsFlyer();

  const { execute: signInWithGoogle, loading: isSigningInWithGoogle } = useAsyncCallback(
    async (): Promise<FirebaseAuthTypes.UserCredential> => {
      try {
        GoogleSignin.configure({
          webClientId: Config.GOOGLE_SIGNIN_WEB_CLIENT_ID,
        });
      } catch (e) {
        console.log('google configure', e);
      }
      try {
        await GoogleSignin.revokeAccess();
      } catch (e) {
        console.log('google revoke access');
      }
      try {
        await GoogleSignin.hasPlayServices();
        // Get the users ID token
        await GoogleSignin.signIn();
        const { idToken } = await GoogleSignin.getTokens();

        const customTokenData = await getGoogleToken({
          variables: {
            idToken: idToken,
          },
        });
        const success = customTokenData.data?.googleLogin;

        if (success && success.customToken) {
          const customToken = success.customToken as string;
          return await auth().signInWithCustomToken(customToken);
        }

        throw new Error('Google login failed or no custom token returned.');
      } catch (e) {
        console.log('google auth e', e);
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
        //       authType: Enum_Auth_Provider_Type.Google,
        //       isNewUser: user.additionalUserInfo.isNewUser,
        //     },
        //   });
        // }
      },
      onError: (e) => {
        console.log('googleError', e);
      },
    },
  );

  useMutationIndicator([isSigningInWithGoogle]);

  return {
    signInWithGoogle,
  };
};
