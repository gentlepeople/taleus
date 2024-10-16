import auth from '@react-native-firebase/auth';
import { useState } from 'react';
import { Platform } from 'react-native';
import Config from 'react-native-config';
import { OneSignal } from 'react-native-onesignal';
import Purchases from 'react-native-purchases';
import { useDidMount } from 'rooks';
import { useApollo } from '../../../apollo';

type IAuthFirebaseTokenChangeHookInput = void;
type IAuthFirebaseTokenChangeHookReturn = {
  userId: string | null;
  isFirebaseAuthenticating: boolean;
};

export const useAuthFirebaseTokenChange: Hook<
  IAuthFirebaseTokenChangeHookInput,
  IAuthFirebaseTokenChangeHookReturn
> = () => {
  const [userId, setUserId] = useState<string | null>(
    auth().currentUser ? auth().currentUser.uid : null,
  );
  const [isFirebaseAuthenticating, setIsFirebaseAuthenticating] = useState<boolean>(false);
  const { apolloClient } = useApollo();
  // const { i18n } = useTranslation();
  // const { mixpanel } = useMixpanel();
  // const language = i18n.language;

  // Listens for token changes
  useDidMount(() => {
    return auth().onAuthStateChanged(async (user) => {
      setIsFirebaseAuthenticating(true);
      try {
        if (!user) {
          await apolloClient.clearStore();
          OneSignal.logout();
          // 나중에 태그 추가하게 되면 삭제하도록
          // OneSignal.User.removeTags(['NICKNAME', 'YOB', 'ORGANIZATION_ID']);
          setUserId(null);
        } else {
          OneSignal.login(user.uid);
          Purchases.configure({
            apiKey: Platform.select({
              ios: Config.REVENUE_CAT_PUBLIC_API_KEY_IOS,
              android: Config.REVENUE_CAT_PUBLIC_API_KEY_ANDROID,
            }),
            appUserID: user.uid,
          });
          try {
            await Purchases.syncPurchases();
          } catch (e) {
            console.log('error syncing purchases', e);
          }
          setUserId(user.uid);
        }
      } catch (e) {}

      setIsFirebaseAuthenticating(false);
    });
  });

  return {
    userId,
    isFirebaseAuthenticating,
  };
};
