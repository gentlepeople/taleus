import { Inject, Injectable } from '@nestjs/common';

import {
  RESPONSE_REPOSITORY,
  SubmitMissionResponseUsecase,
  IResponseRepository,
  COUPLE_MISSION_REPOSITORY,
  ICoupleMissionRepository,
  IQuestionRepository,
  QUESTION_REPOSITORY,
} from '@/ports';

@Injectable()
export class SubmitMissionResponseService implements SubmitMissionResponseUsecase {
  constructor(
    @Inject(RESPONSE_REPOSITORY)
    private readonly responseRepository: IResponseRepository,
    @Inject(COUPLE_MISSION_REPOSITORY)
    private readonly coupleMissionRepository: ICoupleMissionRepository,
    @Inject(QUESTION_REPOSITORY)
    private readonly questionRepository: IQuestionRepository,
  ) {}

  async execute(
    data: {
      userId: string;
      questionId: bigint;
      coupleMissionId?: bigint;
      content: string;
    }[],
  ): Promise<boolean> {
    await this.responseRepository.createMany(data);

    const missionsMap = new Map<bigint, { userId: string; coupleMissionId: bigint }>();

    data.forEach(({ coupleMissionId, userId }) => {
      if (coupleMissionId) {
        missionsMap.set(coupleMissionId, {
          userId,
          coupleMissionId,
        });
      }
    });

    for (const { userId, coupleMissionId } of missionsMap.values()) {
      const { isCompleted: isCoupleMissionCompleted, missionId } =
        await this.coupleMissionRepository.findOneByCoupleMissionId(coupleMissionId);

      const needToCheckCompleted = !isCoupleMissionCompleted;
      if (needToCheckCompleted) {
        const missionQuestionSize = await this.questionRepository.countByMissionId(missionId);

        const allResponsesCount = await this.responseRepository.countByCoupleMissionId(
          coupleMissionId,
        );

        const coupleCompleted = missionQuestionSize * 2 == allResponsesCount;

        if (coupleCompleted) {
          await this.coupleMissionRepository.updateToCompleted(coupleMissionId);
        }
      }
    }
    return true;
  }
}
