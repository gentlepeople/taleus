import { Response } from '@/domain';

export const RESPONSE_REPOSITORY = Symbol('RESPONSE_REPOSITORY');

export interface IResponseRepository {
  findManyByCoupleMissionIdAndUserId(coupleMissionId: number, userId: string): Promise<Response[]>;
  findManyByCoupleMissionIdsAndUserIds(
    coupleMissionIds: number[],
    userIds: string[],
  ): Promise<Response[]>;
  createMany(
    data: {
      userId: string;
      questionId: number;
      coupleMissionId?: number;
      content: string;
    }[],
  ): Promise<void>;
  countByCoupleMissionId(coupleMissionId: number): Promise<number>;
}
