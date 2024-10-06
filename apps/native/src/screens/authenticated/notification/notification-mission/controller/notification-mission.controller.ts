import { useAuth } from '~/providers';
import {
  useNotification_MissionNavigation,
  useNotification_MissionTimeManager,
  useNotification_MissionTimeSubmit,
} from './hooks';

type INotification_MissionControllerInput = void;
type INotification_MissionControllerOutput = {
  nickname: string;
  notificationTime: Date;
  setMissionTime: (time: Date) => void;
};

export const useNotification_MissionController: Controller<
  INotification_MissionControllerInput,
  INotification_MissionControllerOutput
> = () => {
  const {
    currentUser: { nickname },
  } = useAuth();

  const {} = useNotification_MissionNavigation();
  const { notificationTime, setMissionTime } = useNotification_MissionTimeManager();
  const {} = useNotification_MissionTimeSubmit();
  console.log(notificationTime);
  return { nickname, notificationTime, setMissionTime };
};
