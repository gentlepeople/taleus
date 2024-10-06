import dayjs from 'dayjs';
import { useCallback, useState } from 'react';

type INotification_MissionTimeManagerInput = void;
type INotification_MissionTimeManagerOutput = {
  notificationTime: Date;
  setMissionTime: (time: Date) => void;
};

export const useNotification_MissionTimeManager: Hook<
  INotification_MissionTimeManagerInput,
  INotification_MissionTimeManagerOutput
> = () => {
  const [notificationTime, setNotificationTime] = useState<Date>(
    dayjs().hour(10).minute(0).second(0).millisecond(0).toDate(),
  );

  const setMissionTime = useCallback(
    (time: Date) => {
      setNotificationTime(time);
    },
    [setNotificationTime],
  );

  return { notificationTime, setMissionTime };
};
