import { Response } from '@/domain';

export const FIND_RESPONSE_USECASE = Symbol('FIND_RESPONSE_USECASE');

export interface FindResponseUsecase {
  findManyByUserIdAndCoupleMissionId(userId: string, coupleMissionId: bigint): Promise<Response[]>;
  findManyByCoupleMissionIdsAndUserIds(
    coupleMissionIds: bigint[],
    userIds: string[],
  ): Promise<Response[]>;
}
