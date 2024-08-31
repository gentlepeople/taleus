import { EnumGender } from '@gentlepeople/taleus-schema';
import { UserInputError } from '@nestjs/apollo';
import { Inject, Injectable } from '@nestjs/common';

import { removeNullFields } from '@/common';
import { UpdateUserUsecase, IUserRepository, USER_REPOSITORY } from '@/ports';

@Injectable()
export class UpdateUserService implements UpdateUserUsecase {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepository: IUserRepository,
  ) {}

  async execute(
    userId: string,
    data: Partial<{
      nickname: string;
      profileImageUrl: string;
      birthday: Date;
      gender: EnumGender;
    }>,
  ): Promise<void> {
    const sanitizedUserData = removeNullFields(data);
    const isEmptyUserData = Object.keys(sanitizedUserData).length === 0;

    if (isEmptyUserData) {
      throw new UserInputError('No valid fields provided to update.');
    }

    await this.userRepository.updateOne(userId, sanitizedUserData);
  }
}
