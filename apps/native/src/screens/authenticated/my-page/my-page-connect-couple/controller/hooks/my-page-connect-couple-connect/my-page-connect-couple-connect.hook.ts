import { useMyPage_ConnectCoupleConnectMutation } from '@gentlepeople/taleus-codegen';
import { useCallback } from 'react';
import { useMutationIndicator } from '~/hooks';
import { useAuth } from '../../../../../../../providers';

type IMyPage_ConnectCoupleConnectInput = {
  goConnectComplete: () => void;
};
type IMyPage_ConnectCoupleConnectOuput = {
  connectCouple: (inviteePersonalCode: string) => Promise<void>;
};

export const useMyPage_ConnectCoupleConnect: Hook<
  IMyPage_ConnectCoupleConnectInput,
  IMyPage_ConnectCoupleConnectOuput
> = ({ goConnectComplete }) => {
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
    async (inviteePersonalCode: string) => {
      await connect({
        variables: {
          inviteePersonalCode,
          inviterId: userId,
        },
      });
    },
    [connect],
  );

  return { connectCouple };
};
