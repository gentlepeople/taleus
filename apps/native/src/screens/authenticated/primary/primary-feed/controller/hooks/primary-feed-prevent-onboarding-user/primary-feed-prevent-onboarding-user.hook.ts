import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { useCallback } from 'react';
import { useModal } from '~/hooks';
import { useAuth } from '~/providers';
import { Primary_FeedScreenNavigationProp } from '../../../primary-feed.screen';

type IPrimary_FeedPreventOnboardingUserInput = void;
type IPrimary_FeedPreventOnboardingUserOutput = void;

export const usePrimary_FeedPreventOnboardingUser: Hook<
  IPrimary_FeedPreventOnboardingUserInput,
  IPrimary_FeedPreventOnboardingUserOutput
> = () => {
  const { currentUser } = useAuth();
  const { openModal } = useModal();
  const navigation = useNavigation<Primary_FeedScreenNavigationProp>();

  const openPreventModal = useCallback(() => {
    openModal('Dialog', {
      title: '로그인을 해야 이용할 수 있어요😄',
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
