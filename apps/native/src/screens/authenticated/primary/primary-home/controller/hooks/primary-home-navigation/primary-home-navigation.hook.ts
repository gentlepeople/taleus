import { useNavigation } from '@react-navigation/native';
import { useCallback } from 'react';
import { Primary_HomeScreenNavigationProp } from '../../../primary-home.screen';

type IPrimary_HomeNavigationInput = void;
type IPrimary_HomeNavigationOutput = {
  goConnectCouple: () => void;
  goNotificationMission: () => void;
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

  const goNotificationMission = useCallback(() => {
    navigation.navigate('NotificationStack', {
      screen: 'Notification_MissionScreen',
    });
  }, [navigation]);

  return { goConnectCouple, goNotificationMission };
};
