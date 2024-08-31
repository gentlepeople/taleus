import { Module } from '@nestjs/common';

import { KakaoLoginService } from './KakaoLoginService';

import {
  KAKAO_LOGIN_USECASE,
  AUTHENTICATION_PORT,
  AuthenticationPort,
  IUserRepository,
  KAKAO_AUTH_PORT,
  KakaoAuthPort,
  USER_REPOSITORY,
  TimePort,
  TIME_PORT,
} from '@/ports';
import { AuthenticationModule, KakaoAuthModule } from '@/providers';
import { UserRepository } from '@/repositories';

const InjectRepositories = [
  {
    provide: USER_REPOSITORY,
    useClass: UserRepository,
  },
];

@Module({
  imports: [AuthenticationModule, KakaoAuthModule],
  providers: [
    ...InjectRepositories,
    {
      inject: [USER_REPOSITORY, AUTHENTICATION_PORT, KAKAO_AUTH_PORT, TIME_PORT],
      provide: KAKAO_LOGIN_USECASE,
      useFactory: (
        userRepository: IUserRepository,
        authenticationPort: AuthenticationPort,
        kakaoAuthPort: KakaoAuthPort,
        timePort: TimePort,
      ) => new KakaoLoginService(userRepository, authenticationPort, kakaoAuthPort, timePort),
    },
  ],
  exports: [KAKAO_LOGIN_USECASE],
})
export class AuthServiceModule {}
