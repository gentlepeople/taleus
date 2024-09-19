import { Inject, Injectable } from '@nestjs/common';

import {
  UpdateCoupleStartDateUsecase,
  COUPLE_REPOSITORY,
  ICoupleRepository,
  IUserRepository,
  USER_REPOSITORY,
} from '@/ports';

@Injectable()
export class UpdateCoupleStartDateService implements UpdateCoupleStartDateUsecase {
  constructor(
    @Inject(COUPLE_REPOSITORY)
    private readonly coupleRepository: ICoupleRepository,
    @Inject(USER_REPOSITORY)
    private readonly userRepository: IUserRepository,
  ) {}

  async execute(coupleId: number, newCoupleStartDate: Date): Promise<void> {
    await this.coupleRepository.updateOne(coupleId, {
      startDate: newCoupleStartDate,
    });

    const { inviteeId, inviterId } = await this.coupleRepository.findOneByCoupleId(coupleId);
    await this.userRepository.updateCoupleStartDate(inviteeId, newCoupleStartDate);
    await this.userRepository.updateCoupleStartDate(inviterId, newCoupleStartDate);
  }
}
