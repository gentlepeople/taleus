import auth from '@react-native-firebase/auth';
import { useState } from 'react';
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
          setUserId(null);
        } else {
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
