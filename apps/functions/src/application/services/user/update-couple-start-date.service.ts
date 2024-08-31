import { Inject, Injectable } from '@nestjs/common';

import { UpdateCoupleStartDateUsecase, COUPLE_REPOSITORY, ICoupleRepository } from '@/ports';

@Injectable()
export class UpdateCoupleStartDateService implements UpdateCoupleStartDateUsecase {
  constructor(
    @Inject(COUPLE_REPOSITORY)
    private readonly coupleRepository: ICoupleRepository,
  ) {}

  async execute(coupleId: number, newCoupleStartDate: Date): Promise<void> {
    await this.coupleRepository.updateOne(coupleId, {
      startDate: newCoupleStartDate,
    });
  }
}
