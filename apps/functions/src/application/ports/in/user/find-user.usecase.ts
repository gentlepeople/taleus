import { User } from '@/domain';

export const FIND_USER_USECASE = Symbol('FIND_USER_USECASE');

export interface FindUserUsecase {
  findOneByUserId(userId: string): Promise<User>;
  findPartnerByUserId(userId: string): Promise<User>;
}
