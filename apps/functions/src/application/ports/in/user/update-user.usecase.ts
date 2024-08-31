import { EnumGender } from '@gentlepeople/taleus-schema';

export const UPDATE_USER_USECASE = Symbol('UPDATE_USER_USECASE');

export interface UpdateUserUsecase {
  execute(
    userId: string,
    data: Partial<{
      nickname: string;
      profileImageUrl: string;
      birthday: Date;
      gender: EnumGender;
    }>,
  ): Promise<void>;
}
