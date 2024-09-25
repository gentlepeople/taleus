import { useCallback } from 'react';

import { useMyPage_ConnectCoupleClipboardCopy, useMyPage_ConnectCoupleNavigation } from './hooks';

type IMyPage_ConnectCoupleControllerInput = void;
type IMyPage_ConnectCoupleControllerOutput = {
  copyUserCode: () => void;
  connect: () => Promise<void>;
};

export const useMyPage_ConnectCoupleController: Controller<
  IMyPage_ConnectCoupleControllerInput,
  IMyPage_ConnectCoupleControllerOutput
> = () => {
  const { copyToClipboard } = useMyPage_ConnectCoupleClipboardCopy();
  const { goConnectComplete } = useMyPage_ConnectCoupleNavigation();

  const userCode = 'XV821D';

  const copyUserCode = useCallback(() => {
    copyToClipboard(userCode);
  }, [copyToClipboard]);

  const connect = useCallback(async () => {
    goConnectComplete();
  }, [goConnectComplete]);

  return { copyUserCode, connect };
};
