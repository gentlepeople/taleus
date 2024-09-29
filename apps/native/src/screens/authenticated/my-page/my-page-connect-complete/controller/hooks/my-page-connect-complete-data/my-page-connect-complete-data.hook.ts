import { useMyPage_ConnectCompleteDataQuery } from '@gentlepeople/taleus-codegen';
import isUndefined from 'lodash/isUndefined';
import { useAuth } from '~/providers';
import { checkQueryInitialLoading } from '~/utils';

type IMyPage_ConnectCompleteDataInput = void;
type IMyPage_ConnectCompleteDataOutput = {
  isPartnerDataLoading: boolean;
  nickname: string;
  partnerNickname: string;
};

export const useMyPage_ConnectCompleteData: Hook<
  IMyPage_ConnectCompleteDataInput,
  IMyPage_ConnectCompleteDataOutput
> = () => {
  const {
    currentUserId,
    currentUser: { nickname },
  } = useAuth();

  const {
    data: currentData,
    previousData,
    networkStatus,
  } = useMyPage_ConnectCompleteDataQuery({
    variables: {
      userId: currentUserId,
    },
  });

  const hasNoPreviousData = isUndefined(previousData);
  const isInitialLoading = checkQueryInitialLoading({ networkStatus, hasNoPreviousData });
  if (isInitialLoading) {
    return {
      isPartnerDataLoading: true,
      nickname,
      partnerNickname: null,
    };
  }

  const partnerNickname = currentData.user.partner.nickname;

  return {
    isPartnerDataLoading: false,
    nickname,
    partnerNickname,
  };
};
