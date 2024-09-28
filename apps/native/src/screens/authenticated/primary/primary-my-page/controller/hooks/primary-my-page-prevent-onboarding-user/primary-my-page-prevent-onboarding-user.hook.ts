import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { useCallback } from 'react';
import { useModal } from '~/hooks';
import { useAuth } from '~/providers';
import { Primary_MyPageScreenNavigationProp } from '../../../primary-my-page.screen';

type IPrimary_MyPagePreventOnboardingUserInput = void;
type IPrimary_MyPagePreventOnboardingUserOutput = void;

export const usePrimary_MyPagePreventOnboardingUser: Hook<
  IPrimary_MyPagePreventOnboardingUserInput,
  IPrimary_MyPagePreventOnboardingUserOutput
> = () => {
  const { currentUser } = useAuth();
  const { openModal } = useModal();
  const navigation = useNavigation<Primary_MyPageScreenNavigationProp>();

  const openPreventModal = useCallback(() => {
    openModal('Dialog', {
      title: '로그인을 해야 이용할 수 있어요😄',
      buttonHorizontal: true,
      okayButton: {
        label: '로그인하러 가기',
        onClose: () => {
          navigation.replace('UnauthenticatedStack', {
            screen: 'AuthenticationStack',
            params: {
              screen: 'Authentication_LandingScreen',
            },
          });
        },
      },
      cancelButton: {
        label: '더 둘러볼래요',
        onClose: () => {
          navigation.navigate('Primary_HomeScreen');
        },
      },
    });
  }, [openModal]);

  useFocusEffect(
    useCallback(() => {
      if (!currentUser) {
        openPreventModal();
      }
    }, [currentUser, openPreventModal]),
  );
};
