import { useMyPage_ConnectCoupleConnectMutation } from '@gentlepeople/taleus-codegen';
import { useCallback } from 'react';
import { useMutationIndicator } from '~/hooks';
import { useAuth } from '../../../../../../../providers';
import { IConnectCoupleParams } from '../../../my-page-connect-couple.type';

type IMyPage_ConnectCoupleConnectInput = {
  goConnectComplete: () => void;
  checkIsCoupled: () => Promise<boolean>;
};
type IMyPage_ConnectCoupleConnectOuput = {
  connectCouple: (params: IConnectCoupleParams) => Promise<void>;
};

export const useMyPage_ConnectCoupleConnect: Hook<
  IMyPage_ConnectCoupleConnectInput,
  IMyPage_ConnectCoupleConnectOuput
> = ({ goConnectComplete, checkIsCoupled }) => {
  const {
    currentUser: { id: userId },
  } = useAuth();

  const [connect, { loading: isConnecting }] = useMyPage_ConnectCoupleConnectMutation({
    refetchQueries: 'active',
    onCompleted: (result) => {
      if (result.registerCouple.success) {
        goConnectComplete();
      }
    },
  });

  useMutationIndicator([isConnecting]);

  const connectCouple = useCallback(
    async ({ inviteePersonalCode, onBlock, onFailed }: IConnectCoupleParams) => {
      const isCoupled = await checkIsCoupled();
      if (isCoupled) {
        onBlock();
        return;
      }

      const result = await connect({
        variables: {
          inviteePersonalCode,
          inviterId: userId,
        },
      });

      const isFailed =
        !result.data.registerCouple.success && result.data.registerCouple.code === 'INVALID_CODE';
      if (isFailed) {
        onFailed();
      }
    },
    [connect, checkIsCoupled, goConnectComplete],
  );

  return { connectCouple };
};
