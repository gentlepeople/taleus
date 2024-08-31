import { UserInputError } from '@nestjs/apollo';
import { Inject, Injectable } from '@nestjs/common';
import isNull from 'lodash/isNull';

import {
  AUTHENTICATION_PORT,
  AuthenticationPort,
  DeactivateUserUsecase,
  IUserRepository,
  USER_REPOSITORY,
} from '@/ports';

@Injectable()
export class DeactivateUserService implements DeactivateUserUsecase {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepository: IUserRepository,
    @Inject(AUTHENTICATION_PORT)
    private readonly authenticationPort: AuthenticationPort,
  ) {}

  async execute(userId: string): Promise<boolean> {
    const findUser = await this.userRepository.findOneByUserId(userId);

    if (isNull(findUser)) {
      throw new UserInputError('No valid userId provided to delete.');
    }

    await this.authenticationPort.deleteUser(userId);

    await this.userRepository.softDeleteOne(userId);

    return true;
  }
}
