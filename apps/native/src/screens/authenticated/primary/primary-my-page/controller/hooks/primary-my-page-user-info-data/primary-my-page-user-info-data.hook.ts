import { usePrimary_MyPageUserInfoDataQuery } from '@gentlepeople/taleus-codegen';
import isUndefined from 'lodash/isUndefined';
import { useAuth } from '~/providers';
import { checkQueryInitialLoading } from '~/utils';

type IPrimary_MyPageUserInfoDataInput = void;
type IPrimary_MyPageUserInfoDataOutput = {
  isUserInfoDataLoading: boolean;
  nickname: string;
  isCoupled: boolean;
  coupleData?: {
    relationshipDays: number;
    completedMissionCount: number;
  };
};

export const usePrimary_MyPageUserInfoData: Hook<
  IPrimary_MyPageUserInfoDataInput,
  IPrimary_MyPageUserInfoDataOutput
> = () => {
  const {
    currentUserId,
    currentUser: { nickname },
  } = useAuth();

  const {
    data: currentData,
    previousData,
    networkStatus,
  } = usePrimary_MyPageUserInfoDataQuery({
    variables: {
      userId: currentUserId,
    },
  });

  const hasNoPreviousData = isUndefined(previousData);
  const isInitialLoading = checkQueryInitialLoading({ networkStatus, hasNoPreviousData });
  if (isInitialLoading) {
    return {
      isUserInfoDataLoading: true,
      nickname,
      isCoupled: null,
      coupleData: null,
    };
  }

  const user = currentData.user;
  const isCoupled = user.isCoupled;
  const coupleData = isCoupled && {
    relationshipDays: user.couple.relationshipDays,
    completedMissionCount: user.couple.completedMissionCount,
  };

  return {
    isUserInfoDataLoading: false,
    nickname,
    isCoupled,
    coupleData,
  };
};
