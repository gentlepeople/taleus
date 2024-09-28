import { usePrimary_HomeOnboarindgQuestionDataQuery } from '@gentlepeople/taleus-codegen';
import isUndefined from 'lodash/isUndefined';
import { useAuth } from '~/providers';
import { checkQueryInitialLoading } from '~/utils';
import { IQuestions } from '../../../primary-home.type';

type IPrimary_HomeOnboardingQuestionDataInput = void;
type IPrimary_HomeOnboardingQuestionDataOutput = {
  isOnboardingQuestionLoading: boolean;
  isOnboarindgUserWritable: boolean;
  onboardingQuestions: IQuestions;
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
      isOnboarindgUserWritable: null,
      onboardingQuestions: null,
    };
  }

  if (isUndefined(currentData)) {
    return {
      isOnboardingQuestionLoading: false,
      isOnboarindgUserWritable: null,
      onboardingQuestions: null,
    };
  }

  const isOnboarindgUserWritable = !currentUser;
  const data = currentData.mission;
  const onboardingQuestions = data.questions.map(({ questionId, questionOrder, content }) => {
    return {
      questionId,
      questionOrder,
      question: content,
    };
  }) as IQuestions;

  return { isOnboardingQuestionLoading: false, isOnboarindgUserWritable, onboardingQuestions };
};
