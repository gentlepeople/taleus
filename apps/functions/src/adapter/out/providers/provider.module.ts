import { Module } from '@nestjs/common';
import { LoggerModule } from 'nestjs-pino';

import {
  AppleAuthModule,
  AuthenticationModule,
  ConfigModule,
  DatabaseModule,
  GoogleAuthModule,
  KakaoAuthModule,
  ConfigAdapter,
  TimeModule,
  CloudSchedulerModule,
  CacheModule,
} from '.';

import { CONFIG_PORT } from '@/ports';

const providerModules = [
  LoggerModule.forRoot(),
  ConfigModule,
  CacheModule,
  TimeModule,
  DatabaseModule,
  CloudSchedulerModule,
  AuthenticationModule,
  KakaoAuthModule,
  GoogleAuthModule.forRootAsync({
    imports: [ConfigModule],
    inject: [CONFIG_PORT],
    useFactory: (configAdapter: ConfigAdapter) => ({
      option: {
        GOOGLE_AUTH_CLIENT_ID: configAdapter.get('GOOGLE_AUTH_CLIENT_ID'),
        GOOGLE_AUTH_CLIENT_SECRET: configAdapter.get('GOOGLE_AUTH_CLIENT_SECRET'),
      },
    }),
  }),
  AppleAuthModule,
];

@Module({
  imports: providerModules,
  exports: providerModules,
})
export class ProviderModule {}
