import { Module } from '@nestjs/common';
import { LoggerModule } from 'nestjs-pino';

import { AuthenticationModule, ConfigModule, DatabaseModule, KakaoAuthModule, TimeModule } from '.';

const providerModules = [
  LoggerModule.forRoot(),
  ConfigModule,
  TimeModule,
  DatabaseModule,
  AuthenticationModule,
  KakaoAuthModule,
];

@Module({
  imports: providerModules,
  exports: providerModules,
})
export class ProviderModule {}
