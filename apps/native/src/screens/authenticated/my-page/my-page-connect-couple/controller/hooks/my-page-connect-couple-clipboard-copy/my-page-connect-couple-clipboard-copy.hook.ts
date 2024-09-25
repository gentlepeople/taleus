import Clipboard from '@react-native-clipboard/clipboard';
import { useCallback } from 'react';

type IMyPage_ConnectCoupleClipboardCopyInput = void;
type IMyPage_ConnectCoupleClipboardCopyOutput = {
  copyToClipboard: (userCode: string) => void;
};

export const useMyPage_ConnectCoupleClipboardCopy: Hook<
  IMyPage_ConnectCoupleClipboardCopyInput,
  IMyPage_ConnectCoupleClipboardCopyOutput
> = () => {
  const copyToClipboard = useCallback(
    (userCode: string) => {
      Clipboard.setString(userCode);
    },
    [Clipboard],
  );

  return { copyToClipboard };
};
