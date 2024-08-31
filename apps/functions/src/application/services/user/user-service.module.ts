import { Module } from '@nestjs/common';

import { FindUserService, UpdateUserService } from '.';

import { USER_REPOSITORY, IUserRepository, FIND_USER_USECASE, UPDATE_USER_USECASE } from '@/ports';
import { UserRepository } from '@/repositories';

const InjectRepositories = [
  {
    provide: USER_REPOSITORY,
    useClass: UserRepository,
  },
];

@Module({
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
  ],
  exports: [FIND_USER_USECASE, UPDATE_USER_USECASE],
})
export class UserServiceModule {}
