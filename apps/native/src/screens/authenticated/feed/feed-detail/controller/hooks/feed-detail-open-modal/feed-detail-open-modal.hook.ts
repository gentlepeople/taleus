import { useCallback } from 'react';
import { useModal } from '~/hooks';
import { IOpenCheckEditModalParams } from '../../../feed-detail.type';

type IFeed_DetailOpenModalInput = void;
type IFeed_DetailOpenModalOutput = {
  openCheckEditModal: ({ onCancel, onComplete }: IOpenCheckEditModalParams) => void;
  openCheckSwipeModal: (onCancel: () => void) => void;
};

export const useFeed_DetailOpenModal: Hook<
  IFeed_DetailOpenModalInput,
  IFeed_DetailOpenModalOutput
> = () => {
  const { openModal } = useModal();

  const openCheckEditModal = useCallback(
    ({ onCancel, onComplete }: IOpenCheckEditModalParams) => {
      openModal('Dialog', {
        title: '정말 수정하시겠습니까?',
        buttonHorizontal: true,
        okayButton: {
          label: '수정하기',
          onPress: async () => await onComplete(),
        },
        cancelButton: {
          label: '취소',
          onPress: onCancel,
        },
      });
    },
    [openModal],
  );

  const openCheckSwipeModal = useCallback(
    (onCancel: () => void) => {
      openModal('Dialog', {
        title: '답변 수정이 끝나지 않았어요\n계속 수정하겠습니까?',
        buttonHorizontal: true,
        okayButton: {
          label: '네',
        },
        cancelButton: {
          label: '아니요',
          onPress: onCancel,
        },
      });
    },
    [openModal],
  );

  return { openCheckEditModal, openCheckSwipeModal };
};
