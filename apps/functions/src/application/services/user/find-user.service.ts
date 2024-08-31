import { Inject, Injectable } from '@nestjs/common';

import { User } from '@/domain';
import { FindUserUsecase, IUserRepository, USER_REPOSITORY } from '@/ports';

@Injectable()
export class FindUserService implements FindUserUsecase {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepository: IUserRepository,
  ) {}

  async findOneByUserId(userId: string): Promise<User | null> {
    const findUser = await this.userRepository.findOneByUserId(userId);
    return findUser;
  }

  async findPartnerByUserId(userId: string): Promise<User | null> {
    const findPartner = await this.userRepository.findPartnerByUserId(userId);

    return findPartner;
  }
}
