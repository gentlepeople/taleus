import { Module } from '@nestjs/common';
import { LoggerModule } from 'nestjs-pino';

import { AuthenticationModule, ConfigModule, KakaoAuthModule, TimeModule } from '.';

const providerModules = [
  LoggerModule.forRoot(),
  ConfigModule,
  TimeModule,
  AuthenticationModule,
  KakaoAuthModule,
];

@Module({
  imports: providerModules,
  exports: providerModules,
})
export class ProviderModule {}
