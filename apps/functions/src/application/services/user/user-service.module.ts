import { Module } from '@nestjs/common';

import { FindUserService } from '.';

import { USER_REPOSITORY, IUserRepository, FIND_USER_USECASE } from '@/ports';
import { DatabaseModule } from '@/providers';
import { UserRepository, RepositoriesModule } from '@/repositories';

const InjectRepositories = [
  {
    provide: USER_REPOSITORY,
    useClass: UserRepository,
  },
];

@Module({
  imports: [DatabaseModule, RepositoriesModule],
  providers: [
    ...InjectRepositories,
    {
      inject: [USER_REPOSITORY],
      provide: FIND_USER_USECASE,
      useFactory: (userRepository: IUserRepository) => new FindUserService(userRepository),
    },
  ],
  exports: [FIND_USER_USECASE],
})
export class UserServiceModule {}
