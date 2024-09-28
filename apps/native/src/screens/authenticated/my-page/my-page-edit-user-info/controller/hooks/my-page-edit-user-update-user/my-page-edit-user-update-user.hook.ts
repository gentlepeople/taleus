import { useMyPage_EditUserUpdateUserMutation } from '@gentlepeople/taleus-codegen';
import { useCallback } from 'react';
import { useMutationIndicator } from '~/hooks';
import { useAuth } from '~/providers';
import { IUpdateUserInfoParams } from '../../../my-page-edit-user-info.type';

type IMyPage_EditUserUpdateUserInput = void;
type IMyPage_EditUserUpdateUserOutput = {
  updateUser: ({ userData, onSuccess }: IUpdateUserInfoParams) => Promise<void>;
};

export const useMyPage_EditUserUpdateUser: Hook<
  IMyPage_EditUserUpdateUserInput,
  IMyPage_EditUserUpdateUserOutput
> = () => {
  const { currentUser } = useAuth();

  const [updateUserInfo, { loading: isUpdating }] = useMyPage_EditUserUpdateUserMutation({
    refetchQueries: 'active',
  });

  useMutationIndicator([isUpdating]);

  const updateUser = useCallback(
    async ({ userData, onSuccess }: IUpdateUserInfoParams) => {
      const { nickname, gender, birthDate, coupleStartDate } = userData;

      const result = await updateUserInfo({
        variables: {
          userId: currentUser.id,
          input: {
            nickname,
            gender,
            birthday: birthDate,
            coupleStartDate,
          },
        },
      });

      if (result.data.updateUser.user) {
        onSuccess();
      }
    },
    [updateUserInfo],
  );

  return { updateUser };
};
