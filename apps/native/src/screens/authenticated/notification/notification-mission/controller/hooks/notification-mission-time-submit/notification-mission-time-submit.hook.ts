import { useNotification_MissionTimeSubmitMutation } from '@gentlepeople/taleus-codegen';
import { useCallback } from 'react';
import { useMutationIndicator } from '~/hooks';
import { useAuth } from '~/providers';

type INotification_MissionTimeSubmitInput = {
  goHome: () => void;
};
type INotification_MissionTimeSubmitOutput = {
  submitMissionTime: (notificationTime: Date) => Promise<void>;
};

export const useNotification_MissionTimeSubmit: Hook<
  INotification_MissionTimeSubmitInput,
  INotification_MissionTimeSubmitOutput
> = ({ goHome }) => {
  const { currentUserId } = useAuth();

  // TODO:민기 화영님한테 notificationTime String! 으로 되어있는데 이렇게 넘기는거 맞는지? Date 객체일 필요 없는지?
  const [submitNotificationMissionTime, { loading: isSubmitting }] =
    useNotification_MissionTimeSubmitMutation({
      refetchQueries: 'active',
      onCompleted: goHome,
    });

  useMutationIndicator([isSubmitting]);

  const submitMissionTime = useCallback(
    async (notificationTime: Date) => {
      await submitNotificationMissionTime({
        variables: {
          userId: currentUserId,
          notificationTime: String(notificationTime),
        },
      });
    },
    [submitNotificationMissionTime],
  );

  return { submitMissionTime };
};
