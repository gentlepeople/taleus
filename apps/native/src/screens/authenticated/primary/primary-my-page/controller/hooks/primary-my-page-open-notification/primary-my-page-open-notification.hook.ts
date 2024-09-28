import notifee from '@notifee/react-native';
import { useCallback } from 'react';
import { Linking, Platform } from 'react-native';
import { getBundleId } from 'react-native-device-info';

type IPrimary_MyPageOpenNotificationInput = void;
type IPrimary_MyPageOpenNotificationOutput = {
  openNotificationSetting: () => void;
};

export const usePrimary_MyPageOpenNofication: Hook<
  IPrimary_MyPageOpenNotificationInput,
  IPrimary_MyPageOpenNotificationOutput
> = () => {
  const openNotificationSetting = useCallback(async () => {
    if (Platform.OS === 'android') {
      notifee.openNotificationSettings();
    }
    if (Platform.OS === 'ios') {
      Linking.openURL(`App-Prefs:NOTIFICATIONS_ID&path=${getBundleId()}`);
    }
  }, [notifee, getBundleId]);

  return { openNotificationSetting };
};
