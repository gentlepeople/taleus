import { Response } from '@/domain';

export const RESPONSE_REPOSITORY = Symbol('RESPONSE_REPOSITORY');

export interface IResponseRepository {
  checkAllUsersCompletedCoupleMission(coupleMissionId: bigint, userIds: string[]): Promise<boolean>;
  findManyByCoupleMissionIdAndUserId(coupleMissionId: bigint, userId: string): Promise<Response[]>;
  findManyByCoupleMissionIdsAndUserIds(
    coupleMissionIds: bigint[],
    userIds: string[],
  ): Promise<Response[]>;
  createMany(
    data: {
      userId: string;
      questionId: bigint;
      coupleMissionId?: bigint;
      content: string;
    }[],
  ): Promise<void>;
  updateContent(responseId: bigint, content: string): Promise<Response>;
}
