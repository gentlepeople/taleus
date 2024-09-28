import { usePrimary_MyPageSignoutMutation } from '@gentlepeople/taleus-codegen';
import auth from '@react-native-firebase/auth';
import { useCallback } from 'react';
import { useAsyncCallback } from 'react-async-hook';
import { useAuth } from '~/providers';
import { useMutationIndicator } from '../../../../../../../hooks';

type IPrimary_MyPageDeleteUserInput = {
  goLanding: () => void;
};
type IPrimary_MyPageDeleteUserOutput = {
  deleteUser: () => Promise<void>;
};

export const usePrimary_MyPageDeleteUser: Hook<
  IPrimary_MyPageDeleteUserInput,
  IPrimary_MyPageDeleteUserOutput
> = ({ goLanding }) => {
  const { currentUserId } = useAuth();

  const [deleteUserMutation, { loading: isDeletingUser }] = usePrimary_MyPageSignoutMutation({
    onCompleted: (result) => {
      if (result.deleteUser.success) {
        goLanding();
      }
    },
  });

  const { execute: deleteAccount, loading: isDeletingAccount } = useAsyncCallback(async () => {
    try {
      await deleteUserMutation({ variables: { userId: currentUserId } });
      await auth().signOut();
    } catch (e) {
      console.error('error: ', e);
    }
  });

  useMutationIndicator([isDeletingUser, isDeletingAccount]);

  const deleteUser = useCallback(async () => {
    await deleteAccount();
  }, [deleteAccount, currentUserId]);

  return { deleteUser };
};
