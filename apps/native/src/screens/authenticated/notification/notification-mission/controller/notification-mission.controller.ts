import { useCallback } from 'react';
import { useAuth } from '~/providers';
import { DEFAULT_NOTIFICATION_TIME } from '../notification-mission.const';
import { IFormattedTime } from '../notification-mission.type';
import { formatTime } from '../notification-mission.util';
import {
  useNotification_MissionNavigation,
  useNotification_MissionOpenModal,
  useNotification_MissionTimeManager,
  useNotification_MissionTimeSubmit,
} from './hooks';

type INotification_MissionControllerInput = void;
type INotification_MissionControllerOutput = {
  nickname: string;
  notificationTime: Date;
  formattedTime: IFormattedTime;
  changeDate: (time: Date) => void;
  submitWithDefaultTime: () => void;
};

export const useNotification_MissionController: Controller<
  INotification_MissionControllerInput,
  INotification_MissionControllerOutput
> = () => {
  const {
    currentUser: { nickname },
  } = useAuth();

  const { goHome } = useNotification_MissionNavigation();
  const { notificationTime, formattedTime, setMissionTime } = useNotification_MissionTimeManager();
  const { openTimeSubmitModal } = useNotification_MissionOpenModal();
  const { submitMissionTime } = useNotification_MissionTimeSubmit({ goHome });

  const changeDate = useCallback(
    (time: Date) => {
      setMissionTime(time);

      openTimeSubmitModal({
        formattedTime: formatTime(time),
        onSubmit: async () => await submitMissionTime(time),
      });
    },
    [setMissionTime, openTimeSubmitModal, submitMissionTime],
  );

  const submitWithDefaultTime = useCallback(() => {
    const time = DEFAULT_NOTIFICATION_TIME;

    setMissionTime(time);

    openTimeSubmitModal({
      formattedTime: formatTime(time),
      onSubmit: async () => await submitMissionTime(time),
    });
  }, [setMissionTime, openTimeSubmitModal, submitMissionTime]);

  return { nickname, notificationTime, formattedTime, changeDate, submitWithDefaultTime };
};
