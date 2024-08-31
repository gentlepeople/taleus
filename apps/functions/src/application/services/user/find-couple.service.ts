import { Inject, Injectable } from '@nestjs/common';

import { Couple } from '@/domain';
import { COUPLE_REPOSITORY, FindCoupleUsecase, ICoupleRepository } from '@/ports';

@Injectable()
export class FindCoupleService implements FindCoupleUsecase {
  constructor(
    @Inject(COUPLE_REPOSITORY)
    private readonly coupleRepository: ICoupleRepository,
  ) {}

  async findOneByCoupleId(coupleId: number): Promise<Couple | null> {
    const findCouple = await this.coupleRepository.findOneByCoupleId(coupleId);
    return findCouple;
  }

  async findOneByUserId(userId: string): Promise<Couple | null> {
    const findCouple = await this.coupleRepository.findOneByUserId(userId);
    return findCouple;
  }
}
