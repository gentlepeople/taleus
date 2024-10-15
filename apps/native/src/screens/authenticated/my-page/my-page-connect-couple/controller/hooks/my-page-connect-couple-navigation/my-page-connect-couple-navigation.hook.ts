import { useNavigation } from '@react-navigation/native';
import { useCallback } from 'react';

import { MyPage_ConnectCoupleScreenNavigationProp } from '../../../my-page-connect-couple.screen';

type IMyPage_ConnectCoupleNavigationInput = void;
type IMyPage_ConnectCoupleNavigationOutput = {
  goConnectComplete: () => void;
  goHome: () => void;
};

export const useMyPage_ConnectCoupleNavigation: Hook<
  IMyPage_ConnectCoupleNavigationInput,
  IMyPage_ConnectCoupleNavigationOutput
> = () => {
  const navigation = useNavigation<MyPage_ConnectCoupleScreenNavigationProp>();

  const goConnectComplete = useCallback(() => {
    navigation.replace('MyPage_ConnectCompleteScreen');
  }, [navigation]);

  const goHome = useCallback(() => {
    navigation.replace('PrimaryStack', {
      screen: 'Primary_HomeScreen',
    });
  }, [navigation]);

  return { goConnectComplete, goHome };
};
