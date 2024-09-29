import { usePrimary_HomeMissionReminderMutation } from '@gentlepeople/taleus-codegen';
import { useCallback } from 'react';
import { useMutationIndicator } from '~/hooks';
import { useAuth } from '~/providers';

type IPrimary_HomeMissionReminderInput = {
  coupleMissionId: number;
};
type IPrimary_HomeMissionReminderOutput = {
  missionReminder: () => Promise<void>;
};

export const usePrimary_HomeMissionReminder: Hook<
  IPrimary_HomeMissionReminderInput,
  IPrimary_HomeMissionReminderOutput
> = ({ coupleMissionId }) => {
  const { currentUser } = useAuth();

  const [missionRemind, { loading: isReminding }] = usePrimary_HomeMissionReminderMutation({
    refetchQueries: 'active',
  });

  useMutationIndicator([isReminding]);

  const missionReminder = useCallback(async () => {
    const result = await missionRemind({
      variables: {
        userId: currentUser && currentUser.id,
        coupleMissionId,
      },
    });

    console.log(result.data.remindMissionPartner.message, 'message');
    console.log(result.data.remindMissionPartner.success, 'success');
    console.log(result.errors, 'errors');
  }, [missionRemind]);

  return { missionReminder };
};
