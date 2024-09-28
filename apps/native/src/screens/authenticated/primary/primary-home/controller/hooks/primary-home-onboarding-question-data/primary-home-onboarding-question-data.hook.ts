import { usePrimary_HomeOnboarindgQuestionDataQuery } from '@gentlepeople/taleus-codegen';
import isUndefined from 'lodash/isUndefined';
import { useAuth } from '~/providers';
import { checkQueryInitialLoading } from '~/utils';

type IPrimary_HomeOnboardingQuestionDataInput = void;
type IPrimary_HomeOnboardingQuestionDataOutput = {
  isOnboardingQuestionLoading: boolean;
};

export const usePrimary_HomeOnboardingQuestionData: Hook<
  IPrimary_HomeOnboardingQuestionDataInput,
  IPrimary_HomeOnboardingQuestionDataOutput
> = () => {
  const { currentUser } = useAuth();

  const {
    data: currentData,
    previousData,
    networkStatus,
  } = usePrimary_HomeOnboarindgQuestionDataQuery({
    variables: {
      missionId: 1,
    },
    skip: !!currentUser,
  });

  const hasNoPreviousData = isUndefined(previousData);
  const isInitialLoading = checkQueryInitialLoading({ networkStatus, hasNoPreviousData });
  if (isInitialLoading) {
    return {
      isOnboardingQuestionLoading: true,
    };
  }

  const data = currentData.mission;

  console.log(data);

  return { isOnboardingQuestionLoading: false };
};
