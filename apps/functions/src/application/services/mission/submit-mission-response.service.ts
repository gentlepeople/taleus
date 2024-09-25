import { Inject, Injectable } from '@nestjs/common';

import {
  RESPONSE_REPOSITORY,
  SubmitMissionResponseUsecase,
  IResponseRepository,
  COUPLE_MISSION_REPOSITORY,
  ICoupleMissionRepository,
  IUserRepository,
  USER_REPOSITORY,
} from '@/ports';

@Injectable()
export class SubmitMissionResponseService implements SubmitMissionResponseUsecase {
  constructor(
    @Inject(RESPONSE_REPOSITORY)
    private readonly responseRepository: IResponseRepository,
    @Inject(COUPLE_MISSION_REPOSITORY)
    private readonly coupleMissionRepository: ICoupleMissionRepository,
    @Inject(USER_REPOSITORY)
    private readonly userRepository: IUserRepository,
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

    const coupleMissionsMap = new Map<bigint, { userId: string; coupleMissionId: bigint }>();

    data.forEach(({ coupleMissionId, userId }) => {
      if (coupleMissionId) {
        coupleMissionsMap.set(coupleMissionId, {
          userId,
          coupleMissionId,
        });
      }
    });

    for (const { userId, coupleMissionId } of coupleMissionsMap.values()) {
      const { isCompleted: isCoupleMissionCompleted, missionId } =
        await this.coupleMissionRepository.findOneByCoupleMissionId(coupleMissionId);

      const needToCheckCompleted = !isCoupleMissionCompleted;
      if (needToCheckCompleted) {
        const { userId: partnerId } = await this.userRepository.findPartnerByUserId(userId);
        const coupleCompleted = await this.responseRepository.checkAllUsersCompletedCoupleMission(
          coupleMissionId,
          [userId, partnerId],
        );

        if (coupleCompleted) {
          await this.coupleMissionRepository.updateToCompleted(coupleMissionId);
        }
      }
    }
    return true;
  }
}
