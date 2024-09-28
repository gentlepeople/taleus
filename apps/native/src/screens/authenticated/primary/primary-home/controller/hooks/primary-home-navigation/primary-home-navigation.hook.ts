import { useNavigation } from '@react-navigation/native';
import { useCallback } from 'react';
import { Primary_HomeScreenNavigationProp } from '../../../primary-home.screen';

type IPrimary_HomeNavigationInput = void;
type IPrimary_HomeNavigationOutput = {
  goConnectCouple: () => void;
};

export const usePrimary_HomeNavigation: Hook<
  IPrimary_HomeNavigationInput,
  IPrimary_HomeNavigationOutput
> = () => {
  const navigation = useNavigation<Primary_HomeScreenNavigationProp>();

  const goConnectCouple = useCallback(() => {
    navigation.navigate('MyPageStack', {
      screen: 'MyPage_ConnectCoupleScreen',
    });
  }, [navigation]);

  return { goConnectCouple };
};
