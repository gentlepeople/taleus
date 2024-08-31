import { Module } from '@nestjs/common';

import {
  DeactivateUserService,
  FindUserService,
  RegisterCoupleService,
  UpdateUserService,
} from '.';

import {
  USER_REPOSITORY,
  IUserRepository,
  FIND_USER_USECASE,
  UPDATE_USER_USECASE,
  DEACTIVATE_USER_USECASE,
  AUTHENTICATION_PORT,
  AuthenticationPort,
  COUPLE_REPOSITORY,
  REGISTER_COUPLE_USECASE,
} from '@/ports';
import { AuthenticationModule } from '@/providers';
import { CoupleRepository, UserRepository } from '@/repositories';

const InjectRepositories = [
  {
    provide: USER_REPOSITORY,
    useClass: UserRepository,
  },
  {
    provide: COUPLE_REPOSITORY,
    useClass: CoupleRepository,
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
    {
      inject: [USER_REPOSITORY, COUPLE_REPOSITORY],
      provide: REGISTER_COUPLE_USECASE,
      useFactory: (userRepository: IUserRepository, CoupleRepository: CoupleRepository) =>
        new RegisterCoupleService(userRepository, CoupleRepository),
    },
    {
      inject: [USER_REPOSITORY, COUPLE_REPOSITORY],
      provide: REGISTER_COUPLE_USECASE,
      useFactory: (userRepository: IUserRepository, CoupleRepository: CoupleRepository) =>
        new RegisterCoupleService(userRepository, CoupleRepository),
    },
  ],
  exports: [
    FIND_USER_USECASE,
    UPDATE_USER_USECASE,
    DEACTIVATE_USER_USECASE,
    REGISTER_COUPLE_USECASE,
  ],
})
export class UserServiceModule {}
