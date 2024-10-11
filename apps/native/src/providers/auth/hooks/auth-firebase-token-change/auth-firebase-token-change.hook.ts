import auth from '@react-native-firebase/auth';
import { useState } from 'react';
import { OneSignal } from 'react-native-onesignal';
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
          console.log(user.uid);
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
