import { useCallback } from 'react';
import { useAuth } from '~/providers';

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
  formattedTime: string;
  changeDate: (time: Date) => void;
  submit: () => void;
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
    },
    [setMissionTime],
  );

  const submit = useCallback(() => {
    openTimeSubmitModal({
      formattedTime,
      onSubmit: async () => await submitMissionTime(notificationTime),
    });
  }, [formattedTime, notificationTime, openTimeSubmitModal, submitMissionTime]);

  return { nickname, notificationTime, formattedTime, changeDate, submit };
};
