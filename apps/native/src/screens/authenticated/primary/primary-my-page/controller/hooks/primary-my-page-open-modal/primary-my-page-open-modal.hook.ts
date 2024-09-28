import { useCallback } from 'react';
import { useModal } from '~/hooks';
import { IOpenDialogModalParams } from '../../../primary-my-page.type';

type IPrimary_MyPageOpenModalInput = void;
type IPrimary_MyPageOpenModalOutput = {
  openDialogModal: ({ title, onPressCancel }: IOpenDialogModalParams) => void;
};

export const usePrimary_MyPageOpenModal: Hook<
  IPrimary_MyPageOpenModalInput,
  IPrimary_MyPageOpenModalOutput
> = () => {
  const { openModal } = useModal();

  const openDialogModal = useCallback(
    ({ title, onPressCancel }: IOpenDialogModalParams) => {
      openModal('Dialog', {
        title,
        okayButton: {
          label: '안할래요',
        },
        cancelButton: {
          label: '할래요',
          onPress: onPressCancel,
        },
        buttonHorizontal: true,
      });
    },
    [openModal],
  );

  return { openDialogModal };
};
