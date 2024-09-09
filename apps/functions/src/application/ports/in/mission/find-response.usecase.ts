import { Response } from '@/domain';

export const FIND_RESPONSE_USECASE = Symbol('FIND_RESPONSE_USECASE');

export interface FindResponseUsecase {
  findManyByUserIdAndCoupleMissionId(userId: string, coupleMissionId: number): Promise<Response[]>;
}
