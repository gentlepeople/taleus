import { useCallback } from 'react';
import { useToast } from '~/mobile-ui';

type IMyPage_ConnectCoupleCopyCompletedToastInput = void;
type IMyPage_ConnectCoupleCopyCompletedToastOutput = {
  showCopyCompletedToast: () => void;
};

export const useMyPage_ConnectCoupleCopyCompletedToast: Hook<
  IMyPage_ConnectCoupleCopyCompletedToastInput,
  IMyPage_ConnectCoupleCopyCompletedToastOutput
> = () => {
  const toast = useToast();

  const showCopyCompletedToast = useCallback(() => {
    toast.show('커플 코드가 복사 되었어요.', {
      type: 'success',
    });
  }, [toast]);

  return {
    showCopyCompletedToast,
  };
};
