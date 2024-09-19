import { Module } from '@nestjs/common';

import { AppleLoginService } from './apple-login.service';
import { GoogleLoginService } from './google-login.service';
import { KakaoLoginService } from './kakao-login.service';

import {
  APPLE_AUTH_PORT,
  APPLE_LOGIN_USECASE,
  AppleAuthPort,
  KAKAO_LOGIN_USECASE,
  AUTHENTICATION_PORT,
  AuthenticationPort,
  IUserRepository,
  KAKAO_AUTH_PORT,
  KakaoAuthPort,
  USER_REPOSITORY,
  TimePort,
  TIME_PORT,
  GOOGLE_AUTH_PORT,
  GOOGLE_LOGIN_USECASE,
  GoogleAuthPort,
  CONFIG_PORT,
} from '@/ports';
import {
  AppleAuthModule,
  AuthenticationModule,
  ConfigModule,
  GoogleAuthModule,
  KakaoAuthModule,
  NestjsConfigAdapter,
} from '@/providers';
import { UserRepository } from '@/repositories';

const InjectRepositories = [
  {
    provide: USER_REPOSITORY,
    useClass: UserRepository,
  },
];

@Module({
  imports: [
    AuthenticationModule,
    KakaoAuthModule,
    GoogleAuthModule.forRootAsync({
      imports: [ConfigModule],
      inject: [CONFIG_PORT],
      useFactory: (configAdapter: NestjsConfigAdapter) => ({
        option: {
          GOOGLE_AUTH_CLIENT_ID: configAdapter.get('GOOGLE_AUTH_CLIENT_ID'),
          GOOGLE_AUTH_CLIENT_SECRET: configAdapter.get('GOOGLE_AUTH_CLIENT_SECRET'),
        },
      }),
    }),
    AppleAuthModule,
  ],
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
    {
      inject: [USER_REPOSITORY, AUTHENTICATION_PORT, GOOGLE_AUTH_PORT, TIME_PORT],
      provide: GOOGLE_LOGIN_USECASE,
      useFactory: (
        userRepository: IUserRepository,
        authenticationPort: AuthenticationPort,
        googleAuthPort: GoogleAuthPort,
        timePort: TimePort,
      ) => new GoogleLoginService(userRepository, authenticationPort, googleAuthPort, timePort),
    },
    {
      inject: [USER_REPOSITORY, AUTHENTICATION_PORT, APPLE_AUTH_PORT, TIME_PORT],
      provide: APPLE_LOGIN_USECASE,
      useFactory: (
        userRepository: IUserRepository,
        authenticationPort: AuthenticationPort,
        appleAuthPort: AppleAuthPort,
        timePort: TimePort,
      ) => new AppleLoginService(userRepository, authenticationPort, appleAuthPort, timePort),
    },
  ],
  exports: [KAKAO_LOGIN_USECASE, GOOGLE_LOGIN_USECASE, APPLE_LOGIN_USECASE],
})
export class AuthServiceModule {}
