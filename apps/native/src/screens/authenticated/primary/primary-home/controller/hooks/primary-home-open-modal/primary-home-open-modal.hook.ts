import { useNavigation } from '@react-navigation/native';
import { useCallback } from 'react';
import { useModal } from '~/hooks';
import { Primary_HomeScreenNavigationProp } from '../../../primary-home.screen';
import { IOnboardingUserModalParams } from '../../../primary-home.type';

type IPrimary_HomeOpenModalInput = void;
type IPrimary_HomeOpenModalOutput = {
  openOnboardingUserModal: ({ onPressOkay }: IOnboardingUserModalParams) => void;
  openPreventMissionReminderModal: (title: string) => void;
};

export const usePrimary_HomeOpenModal: Hook<
  IPrimary_HomeOpenModalInput,
  IPrimary_HomeOpenModalOutput
> = () => {
  const { openModal } = useModal();
  const navigation = useNavigation<Primary_HomeScreenNavigationProp>();

  const openOnboardingUserModal = useCallback(
    ({ onPressOkay }: IOnboardingUserModalParams) => {
      openModal('Dialog', {
        title: '로그인을 해야 답변을 저장할 수 있어요\n작성해주신 답변은 임시 저장 할게요!',
        buttonHorizontal: true,
        okayButton: {
          label: '로그인하러 가기',
          onPress: () => {
            onPressOkay();

            navigation.navigate('UnauthenticatedStack', {
              screen: 'AuthenticationStack',
              params: {
                screen: 'Authentication_LandingScreen',
              },
            });
          },
        },
        cancelButton: {
          label: '더 둘러보기',
        },
      });
    },
    [openModal, navigation],
  );

  const openPreventMissionReminderModal = useCallback(
    (title: string) => {
      openModal('Dialog', {
        title,
        buttonHorizontal: false,
        okayButton: {
          label: '확인',
        },
      });
    },
    [openModal],
  );

  return { openOnboardingUserModal, openPreventMissionReminderModal };
};
