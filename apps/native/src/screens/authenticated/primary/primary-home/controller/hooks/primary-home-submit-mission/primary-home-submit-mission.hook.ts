import { usePrimary_HomeSubmitMissionMutation } from '@gentlepeople/taleus-codegen';
import { useCallback } from 'react';
import { useMutationIndicator } from '~/hooks';
import { useAuth } from '~/providers';
import { ISubmitAnswersParams } from '../../../primary-home.type';

type IPrimary_HomeSubmitMissionInput = void;
type IPrimary_HomeSubmitMissionOutput = {
  submitAnswers: ({ answers, coupleMissionId }: ISubmitAnswersParams) => Promise<void>;
};

export const usePrimary_HomeSubmitMission: Hook<
  IPrimary_HomeSubmitMissionInput,
  IPrimary_HomeSubmitMissionOutput
> = () => {
  const { currentUser } = useAuth();

  const [submitMission, { loading: isSubmitting }] = usePrimary_HomeSubmitMissionMutation({
    refetchQueries: 'active',
  });

  useMutationIndicator([isSubmitting]);

  const submitAnswers = useCallback(
    async ({ answers, missionId, coupleMissionId, onCompleted }: ISubmitAnswersParams) => {
      const result = await submitMission({
        variables: {
          userId: currentUser && currentUser.id,
          missionId,
          data: answers,
          coupleMissionId: coupleMissionId,
        },
      });

      if (result.data.submitMissionResponse.success) {
        onCompleted();
      }
    },
    [submitMission, currentUser],
  );

  return { submitAnswers };
};
