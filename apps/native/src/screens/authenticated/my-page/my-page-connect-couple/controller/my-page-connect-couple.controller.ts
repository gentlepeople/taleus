import { useCallback } from 'react';

import { useAuth } from '~/providers';
import {
  useMyPage_ConnectCoupleClipboardCopy,
  useMyPage_ConnectCoupleConnect,
  useMyPage_ConnectCoupleCopyCompletedToast,
  useMyPage_ConnectCoupleInputManager,
  useMyPage_ConnectCoupleKakaoShare,
  useMyPage_ConnectCoupleMixpanel,
  useMyPage_ConnectCoupleNavigation,
  useMyPage_ConnectCouplePartnerData,
} from './hooks';

type IMyPage_ConnectCoupleControllerInput = void;
type IMyPage_ConnectCoupleControllerOutput = {
  personalCode: string;
  partnerPersonalCode: string;
  isCTADisabled: boolean;
  changePartnerPersonalCode: (code: string) => void;
  copyUserCode: () => void;
  connect: () => Promise<void>;
  share: () => Promise<void>;
  exit: () => void;
};

export const useMyPage_ConnectCoupleController: Controller<
  IMyPage_ConnectCoupleControllerInput,
  IMyPage_ConnectCoupleControllerOutput
> = () => {
  const {
    currentUser: { personalCode },
  } = useAuth();

  const { goConnectComplete, goHome } = useMyPage_ConnectCoupleNavigation();
  const { copyToClipboard } = useMyPage_ConnectCoupleClipboardCopy();
  const { checkIsCoupled } = useMyPage_ConnectCouplePartnerData();
  const { connectCouple } = useMyPage_ConnectCoupleConnect({ goConnectComplete, checkIsCoupled });
  const { partnerPersonalCode, changePartnerPersonalCode } = useMyPage_ConnectCoupleInputManager();
  const { kakaoShare } = useMyPage_ConnectCoupleKakaoShare();
  const { copyCoupleCodeMixpanelEvent, shareCoupleCodeMixpanelEvent } =
    useMyPage_ConnectCoupleMixpanel();
  const { showCopyCompletedToast } = useMyPage_ConnectCoupleCopyCompletedToast();

  const isCTADisabled = partnerPersonalCode.length < 8;

  const copyUserCode = useCallback(() => {
    copyCoupleCodeMixpanelEvent(personalCode);
    copyToClipboard(personalCode);
    showCopyCompletedToast();
  }, [copyToClipboard, copyCoupleCodeMixpanelEvent, showCopyCompletedToast, personalCode]);

  const connect = useCallback(async () => {
    await connectCouple(partnerPersonalCode);
  }, [connectCouple, partnerPersonalCode]);

  const share = useCallback(async () => {
    shareCoupleCodeMixpanelEvent(personalCode);
    await kakaoShare(personalCode);
  }, [kakaoShare, shareCoupleCodeMixpanelEvent, personalCode]);

  const exit = useCallback(() => {
    goHome();
  }, [goHome]);

  return {
    personalCode,
    partnerPersonalCode,
    isCTADisabled,
    changePartnerPersonalCode,
    copyUserCode,
    connect,
    share,
    exit,
  };
};
