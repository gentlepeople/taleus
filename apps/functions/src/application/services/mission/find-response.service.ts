import { Inject, Injectable } from '@nestjs/common';

import { Response } from '@/domain';
import { RESPONSE_REPOSITORY, FindResponseUsecase, IResponseRepository } from '@/ports';

@Injectable()
export class FindResponseService implements FindResponseUsecase {
  constructor(
    @Inject(RESPONSE_REPOSITORY)
    private readonly responseRepository: IResponseRepository,
  ) {}

  async findManyByUserIdAndCoupleMissionId(
    userId: string,
    coupleMissionId: number,
  ): Promise<Response[]> {
    const findResponses = await this.responseRepository.findManyByCoupleMissionIdAndUserId(
      coupleMissionId,
      userId,
    );
    return findResponses;
  }

  async findManyByCoupleMissionIdsAndUserIds(
    coupleMissionIds: number[],
    userIds: string[],
  ): Promise<Response[]> {
    const findResponses = await this.responseRepository.findManyByCoupleMissionIdsAndUserIds(
      coupleMissionIds,
      userIds,
    );
    return findResponses;
  }
}
