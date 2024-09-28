import { useCallback } from 'react';

import { useAuth } from '~/providers';
import {
  useMyPage_ConnectCoupleClipboardCopy,
  useMyPage_ConnectCoupleConnect,
  useMyPage_ConnectCoupleInputManager,
  useMyPage_ConnectCoupleKakaoShare,
  useMyPage_ConnectCoupleNavigation,
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
};

export const useMyPage_ConnectCoupleController: Controller<
  IMyPage_ConnectCoupleControllerInput,
  IMyPage_ConnectCoupleControllerOutput
> = () => {
  const {
    currentUser: { personalCode },
  } = useAuth();

  const { goConnectComplete } = useMyPage_ConnectCoupleNavigation();
  const { copyToClipboard } = useMyPage_ConnectCoupleClipboardCopy();
  const { connectCouple } = useMyPage_ConnectCoupleConnect({ goConnectComplete });
  const { partnerPersonalCode, changePartnerPersonalCode } = useMyPage_ConnectCoupleInputManager();
  const { kakaoShare } = useMyPage_ConnectCoupleKakaoShare();

  const isCTADisabled = partnerPersonalCode.length < 8;

  const copyUserCode = useCallback(() => {
    copyToClipboard(personalCode);
  }, [copyToClipboard]);

  const connect = useCallback(async () => {
    await connectCouple(partnerPersonalCode);
  }, [connectCouple, partnerPersonalCode]);

  const share = useCallback(async () => {
    await kakaoShare(personalCode);
  }, [kakaoShare, personalCode]);

  return {
    personalCode,
    partnerPersonalCode,
    isCTADisabled,
    changePartnerPersonalCode,
    copyUserCode,
    connect,
    share,
  };
};
