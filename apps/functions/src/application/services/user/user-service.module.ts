import { Module } from '@nestjs/common';

import { DeactivateUserService, FindUserService, UpdateUserService } from '.';

import {
  USER_REPOSITORY,
  IUserRepository,
  FIND_USER_USECASE,
  UPDATE_USER_USECASE,
  DEACTIVATE_USER_USECASE,
  AUTHENTICATION_PORT,
  AuthenticationPort,
} from '@/ports';
import { AuthenticationModule } from '@/providers';
import { UserRepository } from '@/repositories';

const InjectRepositories = [
  {
    provide: USER_REPOSITORY,
    useClass: UserRepository,
  },
];

@Module({
  imports: [AuthenticationModule],
  providers: [
    ...InjectRepositories,
    {
      inject: [USER_REPOSITORY],
      provide: FIND_USER_USECASE,
      useFactory: (userRepository: IUserRepository) => new FindUserService(userRepository),
    },
    {
      inject: [USER_REPOSITORY],
      provide: UPDATE_USER_USECASE,
      useFactory: (userRepository: IUserRepository) => new UpdateUserService(userRepository),
    },
    {
      inject: [USER_REPOSITORY, AUTHENTICATION_PORT],
      provide: DEACTIVATE_USER_USECASE,
      useFactory: (userRepository: IUserRepository, authenticationPort: AuthenticationPort) =>
        new DeactivateUserService(userRepository, authenticationPort),
    },
  ],
  exports: [FIND_USER_USECASE, UPDATE_USER_USECASE, DEACTIVATE_USER_USECASE],
})
export class UserServiceModule {}
