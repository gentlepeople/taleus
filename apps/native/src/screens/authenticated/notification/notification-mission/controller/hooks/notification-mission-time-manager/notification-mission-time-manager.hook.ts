import dayjs from 'dayjs';
import { useCallback, useState } from 'react';
import { DEFAULT_NOTIFICATION_TIME } from '../../../notification-mission.const';

type INotification_MissionTimeManagerInput = void;
type INotification_MissionTimeManagerOutput = {
  notificationTime: Date;
  formattedTime: string;
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

  const formattedTime = dayjs(notificationTime).format('HH:mm');

  return { notificationTime, formattedTime, setMissionTime };
};
