import isArray from 'lodash/isArray';
import { createContext, ReactNode, useCallback, useContext, useEffect, useState } from 'react';
import { Platform } from 'react-native';

import Config from 'react-native-config';
import { LogLevel, NotificationWillDisplayEvent, OneSignal } from 'react-native-onesignal';

import { Suspender } from '../../mobile-ui/common/suspender';
import { useMixpanel } from '../mixpanel';

export type IOneSignalContext = {
  requestPermission: () => Promise<boolean>;
  getNotificationPermission: () => boolean;
  setMixpanelNotificationUserProperty: (permission: boolean) => void;
};

export const OneSignalContext = createContext<IOneSignalContext | null>(null);

type IOneSignalProviderProps = {
  children: ReactNode;
};

export const OneSignalProvider = ({ children }: IOneSignalProviderProps) => {
  const { mixpanel } = useMixpanel();
  const [isOneSignalReady, setIsOneSignalReady] = useState<boolean>(false);

  const setMixpanelNotificationUserProperty = useCallback((permission: boolean) => {
    // mixpanel.getPeople().set('notification', permission);
  }, []);

  const requestPermission = useCallback(async () => {
    const isSucceed = await OneSignal.Notifications.requestPermission(true);

    if (Platform.OS === 'ios') {
      // https://github.com/OneSignal/react-native-onesignal/issues/1655
      // It is returning a Promise<boolean[]> on iOS (bug)
      const isSucceedResultArray = isArray(isSucceed);

      return isSucceedResultArray ? isSucceed[0] : isSucceed;
    }

    return isSucceed;
  }, []);

  const getNotificationPermission = useCallback(() => {
    return OneSignal.Notifications.hasPermission();
  }, []);

  useEffect(() => {
    //OneSignal Init Code
    OneSignal.Debug.setLogLevel(LogLevel.Verbose);
    OneSignal.initialize(Config.ONESIGNAL_MASTER_APP_ID);
    //END OneSignal Init Code

    //Event for handling notifications received while app in foreground
    const onForegroundWillDisplay = (event: NotificationWillDisplayEvent) => {
      console.log('OneSignal: notification will show in foreground:', event);
      event.preventDefault();
      const notification = event.notification;
      console.log('notification: ', notification);
      const data = notification.additionalData;
      console.log('additionalData: ', data);

      event.getNotification().display();
    };

    //Event for handling notifications opened
    // const onClickNotification = (event: NotificationClickEvent) => {
    //   const { notification } = event;
    //   console.log('OneSignal: notification opened:', notification);
    //   mixpanel.trackEvent({
    //     type: EMixpanelEventType.ONE_SIGNAL_OPEN,
    //     properties: notification,
    //   });
    // };

    // Event for handling permission change
    const onPermissionChanged = (granted: boolean) => {
      setMixpanelNotificationUserProperty(granted);
    };

    OneSignal.Notifications.addEventListener('foregroundWillDisplay', onForegroundWillDisplay);
    // OneSignal.Notifications.addEventListener('click', onClickNotification);
    OneSignal.Notifications.addEventListener('permissionChange', onPermissionChanged);

    setIsOneSignalReady(true);
    return () => {
      OneSignal.Notifications.removeEventListener('foregroundWillDisplay', onForegroundWillDisplay);
      //   OneSignal.Notifications.removeEventListener('click', onClickNotification);
      OneSignal.Notifications.removeEventListener('permissionChange', onPermissionChanged);
    };
  }, []);

  if (!isOneSignalReady) {
    return <Suspender />;
  }

  return (
    <OneSignalContext.Provider
      value={{
        requestPermission,
        getNotificationPermission,
        setMixpanelNotificationUserProperty,
      }}
    >
      {children}
    </OneSignalContext.Provider>
  );
};

export const useOneSignal = () => {
  const context = useContext(OneSignalContext);

  if (!context) {
    throw new Error('useOneSignal must be used within a OneSignalProvider');
  }
  return context;
};
