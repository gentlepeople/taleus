import { EnumGender } from '@gentlepeople/taleus-schema';
import { UserInputError } from '@nestjs/apollo';
import { Inject, Injectable } from '@nestjs/common';

import { removeNullFields } from '@/common';
import {
  UpdateUserUsecase,
  IUserRepository,
  USER_REPOSITORY,
  COUPLE_REPOSITORY,
  ICoupleRepository,
} from '@/ports';

@Injectable()
export class UpdateUserService implements UpdateUserUsecase {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepository: IUserRepository,
    @Inject(COUPLE_REPOSITORY)
    private readonly coupleRepository: ICoupleRepository,
  ) {}

  async execute(
    userId: string,
    data: Partial<{
      nickname: string;
      profileImageUrl: string;
      gender: EnumGender;
      birthday: Date;
      coupleStartDate: Date;
      isProfileCompleted: boolean;
    }>,
  ): Promise<void> {
    const sanitizedUserData = removeNullFields(data);
    const isEmptyUserData = Object.keys(sanitizedUserData).length === 0;

    if (isEmptyUserData) {
      throw new UserInputError('No valid fields provided to update.');
    }

    await this.userRepository.updateOne(userId, sanitizedUserData);

    const findCouple = await this.coupleRepository.findOneByUserId(userId);
    if (findCouple && data.coupleStartDate) {
      const { coupleId, inviterId, inviteeId } = findCouple;
      await this.coupleRepository.updateOne(coupleId, {
        startDate: data.coupleStartDate,
      });

      const partnerId = userId === inviterId ? inviteeId : inviterId;
      await this.userRepository.updateCoupleStartDate(partnerId, data.coupleStartDate);
    }
  }
}
