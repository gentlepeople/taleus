import { usePrimary_HomeTodayMissionQuery } from '@gentlepeople/taleus-codegen';
import isNull from 'lodash/isNull';
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
  isCoupled: boolean;
  todayAnswersCompleted: boolean;
  partnerTodayAnswersCompleted: boolean;
  partnerTodayAnswers: IUserAnswers;
  nickname: string;
  partnerNickname: string;
  isPartnerDeleted: boolean;
  coupleMissionId: number;
  isPremiumUser: boolean;
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
      isCoupled: null,
      todayAnswersCompleted: null,
      partnerTodayAnswersCompleted: null,
      partnerTodayAnswers: null,
      nickname: '',
      partnerNickname: '',
      isPartnerDeleted: null,
      coupleMissionId: null,
      isPremiumUser: null,
    };
  }

  if (isUndefined(currentData)) {
    return {
      isTodayMissionLoading: false,
      isTodayWritable: null,
      todayMissionId: null,
      todayQuestions: null,
      todayAnswers: null,
      isCoupled: null,
      todayAnswersCompleted: null,
      partnerTodayAnswersCompleted: null,
      partnerTodayAnswers: null,
      nickname: '',
      partnerNickname: '',
      isPartnerDeleted: null,
      coupleMissionId: null,
      isPremiumUser: null,
    };
  }

  const todayMission = currentData.todayMission;
  const isTodayWritable = !todayMission.userResponse.isCompleted;
  const todayMissionData = todayMission.mission;
  const todayMissionId = todayMissionData.missionId;
  const todayQuestions = todayMissionData.questions.map(
    ({ questionId, questionOrder, content }) => {
      return {
        questionId,
        questionOrder,
        question: content,
      };
    },
  ) as IQuestions;

  const todayAnswersCompleted = !isTodayWritable;
  const todayAnswers =
    todayAnswersCompleted &&
    (todayMission.userResponse.data.map(({ questionId, content }) => {
      return {
        questionId,
        content,
      };
    }) as IUserAnswers);

  const isCoupled = currentUser && currentUser.isCoupled;
  const partnerTodayAnswersCompleted =
    isCoupled && todayMission.partnerResponse && todayMission.partnerResponse.isCompleted;
  const partnerTodayAnswers =
    partnerTodayAnswersCompleted &&
    (todayMission.partnerResponse.data.map(({ questionId, content }) => {
      return {
        questionId,
        content,
      };
    }) as IUserAnswers);

  const coupleMission = todayMission.coupleMission;
  const coupleMissionId = !isNull(coupleMission) && coupleMission.coupleMissionId;

  const nickname = currentUser.nickname;
  const partnerNickname = currentUser.partnerNickname;
  const isPartnerDeleted = currentUser.isPartnerDeleted;
  const isPremiumUser = false;

  return {
    isTodayMissionLoading: false,
    isTodayWritable,
    todayMissionId,
    todayQuestions,
    todayAnswers,
    isCoupled,
    todayAnswersCompleted,
    partnerTodayAnswersCompleted,
    partnerTodayAnswers,
    nickname,
    partnerNickname,
    isPartnerDeleted,
    coupleMissionId,
    isPremiumUser,
  };
};
