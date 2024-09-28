import { useCallback } from 'react';
import { DELETE_USER_DIALOG_TITLE, SIGN_OUT_DIALOG_TITLE } from '../primary-my-page.const';
import {
  usePrimary_MyPageDeleteUser,
  usePrimary_MyPageNavigation,
  usePrimary_MyPageOpenModal,
  usePrimary_MyPageOpenNofication,
  usePrimary_MyPagePreventOnboardingUser,
  usePrimary_MyPageResetOnboardingAnswer,
  usePrimary_MyPageSignOut,
  usePrimary_MyPageUserInfoData,
} from './hooks';

type IPrimary_MyPageControllerInput = void;
type IPrimary_MyPageControllerOutput = {
  isUserInfoDataLoading: boolean;
  nickname: string;
  isCoupled: boolean;
  coupleData?: {
    relationshipDays: number;
    completedMissionCount: number;
  };
  goEditUserInfo: () => void;
  goConnectCouple: () => void;
  deleteUserModal: () => void;
  signOutModal: () => void;
  openFeedbackAndInquiry: () => void;
  openPolicy: () => void;
  openTerms: () => void;
  openNotificationSetting: () => void;
};

export const usePrimary_MyPageController: Controller<
  IPrimary_MyPageControllerInput,
  IPrimary_MyPageControllerOutput
> = () => {
  const { isUserInfoDataLoading, nickname, isCoupled, coupleData } =
    usePrimary_MyPageUserInfoData();
  const { goWebView, goEditUserInfo, goConnectCouple, goLanding } = usePrimary_MyPageNavigation();
  const { signOut } = usePrimary_MyPageSignOut();
  const { deleteUser } = usePrimary_MyPageDeleteUser();
  const { openDialogModal } = usePrimary_MyPageOpenModal();
  const { openNotificationSetting } = usePrimary_MyPageOpenNofication();
  const { resetOnboardingAnswer } = usePrimary_MyPageResetOnboardingAnswer();
  usePrimary_MyPagePreventOnboardingUser();

  const deleteUserModal = useCallback(() => {
    openDialogModal({
      title: DELETE_USER_DIALOG_TITLE,
      onPressCancel: async () => {
        resetOnboardingAnswer();
        await deleteUser();
      },
    });
  }, [deleteUser, openDialogModal, resetOnboardingAnswer]);

  const signOutModal = useCallback(() => {
    openDialogModal({ title: SIGN_OUT_DIALOG_TITLE, onPressCancel: signOut });
  }, [signOut, openDialogModal]);

  const openFeedbackAndInquiry = useCallback(() => {
    goWebView({ title: '피드백 / 문의하기', uri: 'www.naver.com' });
  }, [goWebView]);

  const openPolicy = useCallback(() => {
    goWebView({ title: '이용약관', uri: 'www.naver.com' });
  }, [goWebView]);

  const openTerms = useCallback(() => {
    goWebView({ title: '개인정보 처리 방침', uri: 'www.naver.com' });
  }, [goWebView]);

  return {
    isUserInfoDataLoading,
    nickname,
    isCoupled,
    coupleData,
    goEditUserInfo,
    goConnectCouple,
    deleteUserModal,
    signOutModal,
    openFeedbackAndInquiry,
    openPolicy,
    openTerms,
    openNotificationSetting,
  };
};
