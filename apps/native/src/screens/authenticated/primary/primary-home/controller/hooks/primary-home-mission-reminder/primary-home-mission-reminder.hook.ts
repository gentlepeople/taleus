import { usePrimary_HomeMissionReminderMutation } from '@gentlepeople/taleus-codegen';
import { useCallback } from 'react';
import { useMutationIndicator } from '~/hooks';
import { useAuth } from '~/providers';

type IPrimary_HomeMissionReminderInput = void;
type IPrimary_HomeMissionReminderOutput = {
  missionReminder: (coupleMissionId: number) => Promise<void>;
};

export const usePrimary_HomeMissionReminder: Hook<
  IPrimary_HomeMissionReminderInput,
  IPrimary_HomeMissionReminderOutput
> = () => {
  const { currentUser } = useAuth();

  const [missionRemind, { loading: isReminding }] = usePrimary_HomeMissionReminderMutation({
    refetchQueries: 'active',
  });

  useMutationIndicator([isReminding]);

  const missionReminder = useCallback(
    async (coupleMissionId: number) => {
      const result = await missionRemind({
        variables: {
          userId: currentUser && currentUser.id,
          coupleMissionId,
        },
      });
    },
    [missionRemind],
  );

  return { missionReminder };
};
