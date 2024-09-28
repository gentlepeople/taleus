import { Inject, Injectable } from '@nestjs/common';
import isNull from 'lodash/isNull';

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

  async execute(input: {
    userId: string;
    missionId: bigint;
    coupleMissionId: bigint | null;
    data: {
      questionId: bigint;
      content: string;
    }[];
  }): Promise<{ success: boolean; message: string | null }> {
    const { userId, missionId, coupleMissionId, data } = input;
    if (data.length === 0) return { success: false, message: 'No input data.' };

    const isOnboardingMission = isNull(coupleMissionId);
    if (isOnboardingMission) {
      const findOnboardingResponse =
        await this.responseRepository.findManyByMissionIdAndUserIdExcludingCoupleMissions(
          missionId,
          userId,
        );
      const alreadyCompleted = findOnboardingResponse.length > 0;
      if (alreadyCompleted) {
        return {
          success: false,
          message: 'Already submit response for onboarding mission.',
        };
      }
    }
    const formattedResponseData = data.map(({ questionId, content }) => ({
      userId,
      questionId,
      content,
      coupleMissionId,
    }));
    await this.responseRepository.createMany(formattedResponseData);

    const isCoupleMission = !isNull(coupleMissionId);
    if (isCoupleMission) {
      const { isCompleted: isCoupleMissionCompleted } =
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
    return { success: true, message: null };
  }
}
