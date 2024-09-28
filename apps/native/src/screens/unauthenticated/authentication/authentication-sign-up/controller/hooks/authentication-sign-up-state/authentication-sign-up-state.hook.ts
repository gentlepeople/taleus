import { EnumGender } from '@gentlepeople/taleus-codegen';
import { useCallback, useState } from 'react';

import dayjs from 'dayjs';
import isEmpty from 'lodash/isEmpty';
import { useAuth } from '~/providers';
import { IUserData } from '../../../authentication-sign-up.type';

type IAuthentication_SignUpStateInput = void;
type IAuthentication_SignUpStateOutput = {
  userData: IUserData;
  isCTADisabled: boolean;
  writeNickname: (nickname: string) => void;
  selectGender: (gender: EnumGender) => void;
  setBirthDate: (date: Date) => void;
  setCoupleStartDate: (date: Date) => void;
  checkPolicy: () => void;
  checkTerms: () => void;
};

export const useAuthentication_SignUpState: Hook<
  IAuthentication_SignUpStateInput,
  IAuthentication_SignUpStateOutput
> = () => {
  const { currentUser } = useAuth();

  const [userData, setUserData] = useState<IUserData>({
    nickname: currentUser.nickname ? currentUser.nickname : '',
    gender: EnumGender.UNKNOWN,
    birthDate: dayjs('1990-11-11').toDate(),
    coupleStartDate: dayjs('2024-01-01').toDate(),
    consentToCollectPersonalInformation: false,
    termsOfServiceAgreement: false,
  });

  const { nickname, consentToCollectPersonalInformation, termsOfServiceAgreement } = userData;

  const isCTADisabled =
    isEmpty(nickname) || !consentToCollectPersonalInformation || !termsOfServiceAgreement;

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

  const checkPolicy = useCallback(() => {
    setUserData((prev) => {
      return {
        ...prev,
        consentToCollectPersonalInformation: !prev.consentToCollectPersonalInformation,
      };
    });
  }, [setUserData]);

  const checkTerms = useCallback(() => {
    setUserData((prev) => {
      return {
        ...prev,
        termsOfServiceAgreement: !prev.termsOfServiceAgreement,
      };
    });
  }, [setUserData]);

  return {
    userData,
    isCTADisabled,
    writeNickname,
    selectGender,
    setBirthDate,
    setCoupleStartDate,
    checkPolicy,
    checkTerms,
  };
};
