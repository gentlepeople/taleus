import { useMyPage_ConnectCouplePartnerDataLazyQuery } from '@gentlepeople/taleus-codegen';
import { useCallback } from 'react';
import { useAuth } from '~/providers';

type IMyPage_ConnectCouplePartnerDataInput = void;
type IMyPage_ConnectCouplePartnerDataOutput = {
  checkIsCoupled: () => Promise<boolean>;
};

export const useMyPage_ConnectCouplePartnerData: Hook<
  IMyPage_ConnectCouplePartnerDataInput,
  IMyPage_ConnectCouplePartnerDataOutput
> = () => {
  const { currentUserId } = useAuth();

  const [getPartnerData] = useMyPage_ConnectCouplePartnerDataLazyQuery({
    variables: {
      userId: currentUserId,
    },
  });

  const checkIsCoupled = useCallback(async () => {
    const { data } = await getPartnerData();

    const isCoupled = data.user.isCoupled;
    return isCoupled;
  }, [getPartnerData]);

  return { checkIsCoupled };
};
