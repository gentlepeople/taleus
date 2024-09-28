import { useAuthentication_SignUpUpdateUserMutation } from '@gentlepeople/taleus-codegen';
import { useCallback } from 'react';
import { useMutationIndicator } from '~/hooks';
import { useAuth } from '~/providers';
import { IUpdateUserInfoParams } from '../../../authentication-sign-up.type';

type IAuthentication_SignUpUpdateUserInput = void;
type IAuthentication_SignUpUpdateUserOutput = {
  updateUserInfo: ({ userData }: IUpdateUserInfoParams) => Promise<void>;
};

export const useAuthentication_SignUpUpdateUser: Hook<
  IAuthentication_SignUpUpdateUserInput,
  IAuthentication_SignUpUpdateUserOutput
> = () => {
  const { currentUser } = useAuth();

  const [updateUser, { loading: isUpdatingUser }] = useAuthentication_SignUpUpdateUserMutation({
    refetchQueries: 'active',
  });

  useMutationIndicator([isUpdatingUser]);

  const updateUserInfo = useCallback(
    async ({ userData, onSuccess }: IUpdateUserInfoParams) => {
      const { nickname, gender, birthDate, coupleStartDate } = userData;

      const result = await updateUser({
        variables: {
          userId: currentUser.id,
          input: {
            nickname,
            gender,
            birthday: birthDate,
            coupleStartDate,
            isProfileCompleted: true,
          },
        },
      });

      if (result.data.updateUser.user.isProfileCompleted) {
        onSuccess();
      }
    },
    [updateUser],
  );

  return { updateUserInfo };
};
