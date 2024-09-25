import { useCallback } from 'react';

import { useMyPage_EditUserInfoNavigation } from './hooks';

type IMyPage_EditUserInfoControllerInput = void;
type IMyPage_EditUserInfoControllerOutput = {
  editComplete: () => void;
};

export const MyPage_EditUserInfoController: Controller<
  IMyPage_EditUserInfoControllerInput,
  IMyPage_EditUserInfoControllerOutput
> = () => {
  const { goBackPrimaryMyPage } = useMyPage_EditUserInfoNavigation();

  const editComplete = useCallback(() => {
    goBackPrimaryMyPage();
  }, [goBackPrimaryMyPage]);

  return { editComplete };
};
