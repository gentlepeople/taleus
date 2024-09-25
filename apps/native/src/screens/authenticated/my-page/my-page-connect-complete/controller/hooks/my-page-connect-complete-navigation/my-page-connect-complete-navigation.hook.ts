import { useNavigation } from '@react-navigation/native';
import { useCallback } from 'react';

import { MyPage_ConnectCompleteScreenNavigationProp } from '../../../my-page-connect-complete.screen';

type IMyPage_ConnectCompleteNavigationInput = void;
type IMyPage_ConnectCompleteNavigationOutput = {
  goHome: () => void;
};

export const useMyPage_ConnectCompleteNavigation: Hook<
  IMyPage_ConnectCompleteNavigationInput,
  IMyPage_ConnectCompleteNavigationOutput
> = () => {
  const navigation = useNavigation<MyPage_ConnectCompleteScreenNavigationProp>();

  const goHome = useCallback(() => {
    navigation.replace('PrimaryStack', {
      screen: 'Primary_HomeScreen',
    });
  }, [navigation]);

  return { goHome };
};
