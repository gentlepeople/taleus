import { Couple } from '@/domain';

export const FIND_COUPLE_USECASE = Symbol('FIND_COUPLE_USECASE');

export interface FindCoupleUsecase {
  findOneByCoupleId(coupleId: bigint): Promise<Couple | null>;
  findOneByUserId(userId: string): Promise<Couple | null>;
}
