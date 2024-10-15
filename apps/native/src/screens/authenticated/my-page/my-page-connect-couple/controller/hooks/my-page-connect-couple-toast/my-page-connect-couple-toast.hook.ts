import { useCallback } from 'react';
import { useToast } from '~/mobile-ui';

type IMyPage_ConnectCoupleToastInput = void;
type IMyPage_ConnectCoupleToastOutput = {
  showCopyCompletedToast: () => void;
  showPersonalCodeNotAvailableToast: () => void;
};

export const useMyPage_ConnectCoupleToast: Hook<
  IMyPage_ConnectCoupleToastInput,
  IMyPage_ConnectCoupleToastOutput
> = () => {
  const toast = useToast();

  const showCopyCompletedToast = useCallback(() => {
    toast.show('커플 코드가 복사 되었어요.', {
      type: 'success',
    });
  }, [toast]);

  const showPersonalCodeNotAvailableToast = useCallback(() => {
    toast.show('존재하지 않는 코드에요', {
      type: 'error',
    });
  }, [toast]);

  return {
    showCopyCompletedToast,
    showPersonalCodeNotAvailableToast,
  };
};
