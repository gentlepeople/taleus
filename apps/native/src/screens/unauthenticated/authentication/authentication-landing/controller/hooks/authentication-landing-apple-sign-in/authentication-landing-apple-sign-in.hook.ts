import { useAuthentication_LandingAppleSignInMutation } from '@gentlepeople/taleus-codegen';
import { appleAuth } from '@invertase/react-native-apple-authentication';
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { useAsyncCallback } from 'react-async-hook';
import { Alert } from 'react-native';

import { useMutationIndicator } from '~/hooks';
import { useApollo } from '~/providers';

type IAuthentication_LandingAppleSignInInput = void;
type IAuthentication_LandingAppleSignInOutput = {
  signInWithApple: () => Promise<FirebaseAuthTypes.UserCredential>;
};

export const useAuthenticationLandingContentSignInApple: Hook<
  IAuthentication_LandingAppleSignInInput,
  IAuthentication_LandingAppleSignInOutput
> = () => {
  const [getAppleToken] = useAuthentication_LandingAppleSignInMutation();
  const { updateToken } = useApollo();
  //   const { mixpanel } = useMixpanel();
  //   const { appsFlyer } = useAppsFlyer();

  const { execute: signInWithApple, loading: isSigningInWithApple } = useAsyncCallback(
    async (): Promise<FirebaseAuthTypes.UserCredential> => {
      if (!appleAuth.isSupported) {
        Alert.alert('Apple Auth is not supported on this device.');
      }
      const appleAuthRequestResponse = await appleAuth.performRequest({
        requestedOperation: appleAuth.Operation.LOGIN,
        requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
      });
      // Ensure Apple returned a user identityToken
      if (!appleAuthRequestResponse.identityToken) {
        throw 'Apple Sign-In failed - no identify token returned';
      }

      // Create a Firebase credential from the response
      const { identityToken, nonce } = appleAuthRequestResponse;

      const customTokenData = await getAppleToken({
        variables: {
          idToken: identityToken,
          nonce,
        },
      });

      const success = customTokenData.data?.appleLogin;
      if (success && success.customToken) {
        const customToken = success.customToken;
        return await auth().signInWithCustomToken(customToken);
      }

      throw new Error('Apple login failed or no custom token returned.');
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
        //       authType: Enum_Auth_Provider_Type.Apple,
        //       isNewUser: user.additionalUserInfo.isNewUser,
        //     },
        //   });
        // }
      },
      onError: (e) => {
        console.log('apple error', e);
      },
    },
  );

  useMutationIndicator([isSigningInWithApple]);

  return {
    signInWithApple,
  };
};
