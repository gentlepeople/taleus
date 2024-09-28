import { EnumGender } from '@gentlepeople/taleus-codegen';
import isEmpty from 'lodash/isEmpty';
import { useCallback, useState } from 'react';
import { useAuth } from '~/providers';
import { IUserData } from '../../../my-page-edit-user-info.type';

type IMyPage_EditUserInfoInput = void;
type IMyPage_EditUserInfoOutput = {
  userData: IUserData;
  isCTADisabled: boolean;
  writeNickname: (nickname: string) => void;
  selectGender: (gender: EnumGender) => void;
  setBirthDate: (date: Date) => void;
  setCoupleStartDate: (date: Date) => void;
};

export const useMyPage_EditUserInfo: Hook<
  IMyPage_EditUserInfoInput,
  IMyPage_EditUserInfoOutput
> = () => {
  const { currentUser } = useAuth();

  const { nickname, birthDate, coupleStartDate, gender } = currentUser;

  const [userData, setUserData] = useState<IUserData>({
    nickname,
    gender,
    birthDate: birthDate,
    coupleStartDate: coupleStartDate,
  });

  const isCTADisabled =
    (userData.nickname === nickname &&
      userData.gender === gender &&
      userData.birthDate === birthDate &&
      userData.coupleStartDate === coupleStartDate) ||
    isEmpty(nickname);

  const writeNickname = useCallback(
    (nickname: string) => {
      setUserData((prev) => {
        return {
          ...prev,
          nickname,
        };
      });
    },
    [setUserData],
  );

  const selectGender = useCallback(
    (gender: EnumGender) => {
      setUserData((prev) => {
        return {
          ...prev,
          gender,
        };
      });
    },
    [setUserData],
  );

  const setBirthDate = useCallback(
    (date: Date) => {
      setUserData((prev) => {
        return {
          ...prev,
          birthDate: date,
        };
      });
    },
    [setUserData],
  );

  const setCoupleStartDate = useCallback(
    (date: Date) => {
      setUserData((prev) => {
        return {
          ...prev,
          coupleStartDate: date,
        };
      });
    },
    [setUserData],
  );

  return { userData, isCTADisabled, writeNickname, selectGender, setBirthDate, setCoupleStartDate };
};
