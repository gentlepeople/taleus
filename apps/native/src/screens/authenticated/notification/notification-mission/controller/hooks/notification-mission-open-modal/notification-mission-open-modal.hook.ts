import { useCallback } from 'react';
import { useModal } from '~/hooks';
import { ITimeSubmitModalParams } from '../../../notification-mission.type';

type INofication_MissionOpenModalInput = void;
type INofication_MissionOpenModalOutput = {
  openTimeSubmitModal: ({ formattedTime, onSubmit }: ITimeSubmitModalParams) => void;
};

export const useNotification_MissionOpenModal: Hook<
  INofication_MissionOpenModalInput,
  INofication_MissionOpenModalOutput
> = () => {
  const { openModal } = useModal();

  const openTimeSubmitModal = useCallback(
    ({ formattedTime, onSubmit }: ITimeSubmitModalParams) => {
      openModal('Dialog', {
        title: `${formattedTime}에 질문을 받아볼 수 있어요\n정말 이 시간으로 설정하시겠어요?`,
        buttonHorizontal: false,
        okayButton: {
          label: '확인',
          onPress: onSubmit,
        },
        cancelButton: {
          label: '다른 시간 선택하기',
        },
      });
    },
    [openModal],
  );

  return { openTimeSubmitModal };
};
