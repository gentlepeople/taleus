import { useCallback } from 'react';
import { useModal } from '~/hooks';

type IAuthentication_LandingOpenPreventBrowseModalInput = void;
type IAuthentication_LandingOpenPreventBrowseModalOutput = {
  openPreventBrowseModal: () => void;
};

export const useAuthentication_LandingOpenPreventBrowseModal: Hook<
  IAuthentication_LandingOpenPreventBrowseModalInput,
  IAuthentication_LandingOpenPreventBrowseModalOutput
> = () => {
  const { openModal } = useModal();

  const openPreventBrowseModal = useCallback(() => {
    openModal('Dialog', {
      title: '이미 답변을 작성했어요\n로그인 후 답변을 제출 해볼까요?',
      okayButton: {
        label: '확인',
      },
      buttonHorizontal: false,
    });
  }, [openModal]);

  return { openPreventBrowseModal };
};
