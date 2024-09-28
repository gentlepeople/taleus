import { useAuth } from '~/providers';

type IMyPage_EditUserInfoInput = void;
type IMyPage_EditUserInfoOutput = {};

export const useMyPage_EditUserInfo: Hook<
  IMyPage_EditUserInfoInput,
  IMyPage_EditUserInfoOutput
> = () => {
  const { currentUser } = useAuth();

  const { nickname, birthDate, gender } = currentUser;

  return {};
};
