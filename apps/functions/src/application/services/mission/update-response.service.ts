import { Inject, Injectable } from '@nestjs/common';

import { Response } from '@/domain';
import { RESPONSE_REPOSITORY, UpdateResponseUsecase, IResponseRepository } from '@/ports';

@Injectable()
export class UpdateResponseService implements UpdateResponseUsecase {
  constructor(
    @Inject(RESPONSE_REPOSITORY)
    private readonly responseRepository: IResponseRepository,
  ) {}

  async execute(responseId: bigint, newContent: string): Promise<Response> {
    return await this.responseRepository.updateContent(responseId, newContent);
  }
}
