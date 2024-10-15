import { EnumGender } from '@gentlepeople/taleus-codegen';
import { useCallback } from 'react';

import { IUserData } from '../authentication-sign-up.type';

import {
  useAuthentication_SignUpMixpanel,
  useAuthentication_SignUpNavigation,
  useAuthentication_SignUpSignOut,
  useAuthentication_SignUpState,
  useAuthentication_SignUpUpdateUser,
} from './hooks';

type IAuthentication_SignUpControllerInput = void;
type IAuthentication_SignUpControllerOutput = {
  userData: IUserData;
  isCTADisabled: boolean;
  writeNickname: (nickname: string) => void;
  selectGender: (gender: EnumGender) => void;
  setBirthDate: (date: Date) => void;
  setCoupleStartDate: (date: Date) => void;
  checkPolicy: () => void;
  checkTerms: () => void;
  goPolicyWebView: () => void;
  goTermsWebView: () => void;
  signUp: () => Promise<void>;
  goBackLanding: () => Promise<void>;
};

export const useAuthentication_SignUpController: Controller<
  IAuthentication_SignUpControllerInput,
  IAuthentication_SignUpControllerOutput
> = () => {
  const { goHome, goPolicyWebView, goTermsWebView } = useAuthentication_SignUpNavigation();
  const {
    userData,
    isCTADisabled,
    writeNickname,
    selectGender,
    setBirthDate,
    setCoupleStartDate,
    checkPolicy,
    checkTerms,
  } = useAuthentication_SignUpState();
  const { updateUserInfo } = useAuthentication_SignUpUpdateUser();
  const { clickSignUpMixpanelEvent } = useAuthentication_SignUpMixpanel();
  const { signOut } = useAuthentication_SignUpSignOut();

  const signUp = useCallback(async () => {
    clickSignUpMixpanelEvent();
    await updateUserInfo({ userData, onSuccess: goHome });
  }, [userData, updateUserInfo, goHome, clickSignUpMixpanelEvent]);

  const goBackLanding = useCallback(async () => {
    await signOut();
  }, [signOut]);

  return {
    userData,
    isCTADisabled,
    writeNickname,
    selectGender,
    setBirthDate,
    setCoupleStartDate,
    checkPolicy,
    checkTerms,
    goPolicyWebView,
    goTermsWebView,
    signUp,
    goBackLanding,
  };
};
