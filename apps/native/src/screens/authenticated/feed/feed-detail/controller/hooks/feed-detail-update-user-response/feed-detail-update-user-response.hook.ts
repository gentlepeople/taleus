import { useFeed_DetailUpdateUserResponseMutation } from '@gentlepeople/taleus-codegen';
import { useCallback } from 'react';
import { useMutationIndicator } from '~/hooks';
import { useAuth } from '~/providers';
import { IUpdateUserResponseParams } from '../../../feed-detail.type';

type IFeed_DetailUpdateUserResponseInput = void;
type IFeed_DetailUpdateUserResponseOutput = {
  updateUserResponse: ({ responseId, newContent }: IUpdateUserResponseParams) => Promise<void>;
};

export const useFeed_DetailUpdateUserResponse: Hook<
  IFeed_DetailUpdateUserResponseInput,
  IFeed_DetailUpdateUserResponseOutput
> = () => {
  const { currentUserId } = useAuth();

  const [updateResponse, { loading: isUpdating }] = useFeed_DetailUpdateUserResponseMutation({
    refetchQueries: 'active',
  });

  useMutationIndicator([isUpdating]);

  const updateUserResponse = useCallback(
    async ({ responseId, newContent }: IUpdateUserResponseParams) => {
      await updateResponse({
        variables: {
          userId: currentUserId,
          responseId,
          newContent,
        },
      });
    },
    [updateResponse],
  );

  return { updateUserResponse };
};
