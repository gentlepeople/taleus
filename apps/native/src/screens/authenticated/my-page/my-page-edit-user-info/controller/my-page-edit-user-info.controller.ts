import { useCallback } from 'react';

import { EnumGender } from '@gentlepeople/taleus-codegen';
import { IUserData } from '../my-page-edit-user-info.type';
import {
  useMyPage_EditUserInfo,
  useMyPage_EditUserInfoNavigation,
  useMyPage_EditUserUpdateUser,
} from './hooks';

type IMyPage_EditUserInfoControllerInput = void;
type IMyPage_EditUserInfoControllerOutput = {
  userData: IUserData;
  isCTADisabled: boolean;
  writeNickname: (nickname: string) => void;
  selectGender: (gender: EnumGender) => void;
  setBirthDate: (date: Date) => void;
  setCoupleStartDate: (date: Date) => void;
  editComplete: () => void;
};

export const MyPage_EditUserInfoController: Controller<
  IMyPage_EditUserInfoControllerInput,
  IMyPage_EditUserInfoControllerOutput
> = () => {
  const { userData, isCTADisabled, writeNickname, selectGender, setBirthDate, setCoupleStartDate } =
    useMyPage_EditUserInfo();
  const { updateUser } = useMyPage_EditUserUpdateUser();
  const { goBackPrimaryMyPage } = useMyPage_EditUserInfoNavigation();

  const editComplete = useCallback(async () => {
    await updateUser({ userData, onSuccess: goBackPrimaryMyPage });
  }, [goBackPrimaryMyPage]);

  return {
    userData,
    isCTADisabled,
    writeNickname,
    selectGender,
    setBirthDate,
    setCoupleStartDate,
    editComplete,
  };
};
