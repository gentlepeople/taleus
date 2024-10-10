import { useNotification_MissionTimeSubmitMutation } from '@gentlepeople/taleus-codegen';
import dayjs from 'dayjs';
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

  const [submitNotificationMissionTime, { loading: isSubmitting }] =
    useNotification_MissionTimeSubmitMutation({
      refetchQueries: 'active',
      onCompleted: goHome,
    });

  useMutationIndicator([isSubmitting]);

  const submitMissionTime = useCallback(
    async (notificationTime: Date) => {
      const formattedNotificationTime = dayjs(notificationTime).format('HH:mm');

      await submitNotificationMissionTime({
        variables: {
          userId: currentUserId,
          notificationTime: formattedNotificationTime,
        },
      });
    },
    [currentUserId, submitNotificationMissionTime],
  );

  return { submitMissionTime };
};
