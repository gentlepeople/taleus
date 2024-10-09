import { useNavigation } from '@react-navigation/native';
import { useCallback } from 'react';
import { Notification_MissionScreenNavigationProp } from '../../../notification-mission.screen';

type INotification_MissionNavigationInput = void;
type INotification_MissionNavigationOutput = {
  goHome: () => void;
};

export const useNotification_MissionNavigation: Hook<
  INotification_MissionNavigationInput,
  INotification_MissionNavigationOutput
> = () => {
  const navigation = useNavigation<Notification_MissionScreenNavigationProp>();

  const goHome = useCallback(() => {
    navigation.replace('PrimaryStack', {
      screen: 'Primary_HomeScreen',
    });
  }, [navigation]);

  return { goHome };
};
