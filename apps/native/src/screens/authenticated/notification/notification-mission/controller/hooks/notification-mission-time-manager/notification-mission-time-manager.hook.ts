import { useCallback, useState } from 'react';
import { DEFAULT_NOTIFICATION_TIME } from '../../../notification-mission.const';
import { IFormattedTime } from '../../../notification-mission.type';
import { formatTime } from '../../../notification-mission.util';

type INotification_MissionTimeManagerInput = void;
type INotification_MissionTimeManagerOutput = {
  notificationTime: Date;
  formattedTime: IFormattedTime;
  setMissionTime: (time: Date) => void;
};

export const useNotification_MissionTimeManager: Hook<
  INotification_MissionTimeManagerInput,
  INotification_MissionTimeManagerOutput
> = () => {
  const [notificationTime, setNotificationTime] = useState<Date>(DEFAULT_NOTIFICATION_TIME);

  const setMissionTime = useCallback(
    (time: Date) => {
      setNotificationTime(time);
    },
    [setNotificationTime],
  );

  const formattedTime = formatTime(notificationTime);

  return { notificationTime, formattedTime, setMissionTime };
};
