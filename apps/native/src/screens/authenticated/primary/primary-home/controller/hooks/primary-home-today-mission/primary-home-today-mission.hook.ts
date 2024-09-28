import { usePrimary_HomeTodayMissionQuery } from '@gentlepeople/taleus-codegen';
import isUndefined from 'lodash/isUndefined';
import { useAuth } from '~/providers';
import { checkQueryInitialLoading } from '~/utils';
import { IQuestions, IUserAnswers } from '../../../primary-home.type';

type IPrimary_HomeTodayMissionInput = void;
type IPrimary_HomeTodayMissionOutput = {
  isTodayMissionLoading: boolean;
  isTodayWritable: boolean;
  todayMissionId: number;
  todayQuestions: IQuestions;
  todayAnswers: IUserAnswers;
};

export const usePrimary_HomeTodayMission: Hook<
  IPrimary_HomeTodayMissionInput,
  IPrimary_HomeTodayMissionOutput
> = () => {
  const { currentUser } = useAuth();

  const {
    data: currentData,
    previousData,
    networkStatus,
  } = usePrimary_HomeTodayMissionQuery({
    variables: {
      userId: currentUser?.id,
    },
    skip: !currentUser,
  });

  const hasNoPreviousData = isUndefined(previousData);
  const isInitialLoading = checkQueryInitialLoading({ networkStatus, hasNoPreviousData });
  if (isInitialLoading) {
    return {
      isTodayMissionLoading: true,
      isTodayWritable: null,
      todayMissionId: null,
      todayQuestions: null,
      todayAnswers: null,
    };
  }

  if (isUndefined(currentData)) {
    return {
      isTodayMissionLoading: false,
      isTodayWritable: null,
      todayMissionId: null,
      todayQuestions: null,
      todayAnswers: null,
    };
  }

  const isTodayWritable = !currentData.todayMission.userResponse.isCompleted;
  const data = currentData.todayMission.mission;
  const todayMissionId = data.missionId;
  const todayQuestions = data.questions.map(({ questionId, questionOrder, content }) => {
    return {
      questionId,
      questionOrder,
      question: content,
    };
  }) as IQuestions;

  const todayAnswersCompleted = !isTodayWritable;
  const todayAnswers =
    todayAnswersCompleted &&
    (currentData.todayMission.userResponse.data.map(({ questionId, content }) => {
      return {
        questionId,
        content,
      };
    }) as IUserAnswers);

  return {
    isTodayMissionLoading: false,
    isTodayWritable,
    todayMissionId,
    todayQuestions,
    todayAnswers,
  };
};
