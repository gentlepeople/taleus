import { useNavigation } from '@react-navigation/native';
import { useCallback } from 'react';

import { MyPage_EditUserInfoScreenNavigationProp } from '../../../my-page-edit-user-info.screen';

type IMyPage_EditUserInfoNavigationInput = void;
type IMyPage_EditUserInfoNavigationOutput = {
  goBackPrimaryMyPage: () => void;
};

export const useMyPage_EditUserInfoNavigation: Hook<
  IMyPage_EditUserInfoNavigationInput,
  IMyPage_EditUserInfoNavigationOutput
> = () => {
  const navigation = useNavigation<MyPage_EditUserInfoScreenNavigationProp>();

  const goBackPrimaryMyPage = useCallback(() => {
    navigation.popToTop();
  }, [navigation]);

  return { goBackPrimaryMyPage };
};
