import { EnumMissionCategory, useFeed_DetailDataQuery } from '@gentlepeople/taleus-codegen';
import { useRoute } from '@react-navigation/native';
import dayjs from 'dayjs';
import isUndefined from 'lodash/isUndefined';
import { useAuth } from '~/providers';
import { checkQueryInitialLoading } from '~/utils';
import { Feed_DetailScreenRouteProp } from '../../../feed-detail.screen';
import { IAnswers } from '../../../feed-detail.type';

type IFeed_DetailDataInput = void;
type IFeed_DetailDataOutput = {
  isFeedDataLoading: boolean;
  answers: IAnswers;
  submittedDate: string;
  nickname: string;
  partnerNickname: string;
  missionId: number;
  category: EnumMissionCategory;
  recentDate: Date;
};

export const useFeed_DetailData: Hook<IFeed_DetailDataInput, IFeed_DetailDataOutput> = () => {
  const {
    params: { coupleMissionId },
  } = useRoute<Feed_DetailScreenRouteProp>();
  const { currentUserId, currentUser } = useAuth();

  const {
    data: currentData,
    previousData,
    networkStatus,
  } = useFeed_DetailDataQuery({
    variables: {
      userId: currentUserId,
      coupleMissionId,
    },
  });

  const hasNoPreviousData = isUndefined(previousData);
  const isInitialLoading = checkQueryInitialLoading({ networkStatus, hasNoPreviousData });
  if (isInitialLoading) {
    return {
      isFeedDataLoading: true,
      answers: [],
      submittedDate: null,
      nickname: '',
      partnerNickname: '',
      missionId: null,
      category: null,
      recentDate: null,
    };
  }

  const missionData = currentData.completedCoupleMission.data;
  const missionId = currentData.completedCoupleMission.mission.missionId;
  const category = currentData.completedCoupleMission.mission.category;

  const answers = missionData.map(({ question, partnerResponse, userResponse }) => {
    const { content: questionTitle, questionId, questionOrder } = question;
    const { content: partnerAnswer } = partnerResponse;
    const { content: userAnswer, responseId } = userResponse;

    return {
      questionId,
      questionOrder,
      questionTitle,
      partnerAnswer,
      userAnswer,
      userResponseId: responseId,
    };
  }) as IAnswers;

  const partnerCreatedAt = missionData[0].partnerResponse.createdAt;
  const userCreatedAt = missionData[0].userResponse.createdAt;
  const recentDate = dayjs(partnerCreatedAt).isAfter(dayjs(userCreatedAt))
    ? (partnerCreatedAt as Date)
    : (userCreatedAt as Date);
  const submittedDate = dayjs(recentDate).format('YYYY년 MM월 DD일');

  const nickname = currentUser.nickname;
  const partnerNickname = currentUser.partnerNickname;

  return {
    isFeedDataLoading: false,
    answers,
    submittedDate,
    nickname,
    partnerNickname,
    missionId,
    category,
    recentDate,
  };
};
