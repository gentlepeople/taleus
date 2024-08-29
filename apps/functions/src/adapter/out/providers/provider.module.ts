import { Module } from '@nestjs/common';
import { LoggerModule } from 'nestjs-pino';

import { ConfigModule, TimeModule } from '.';

const providerModules = [LoggerModule.forRoot(), ConfigModule, TimeModule];

@Module({
  imports: providerModules,
  exports: providerModules,
})
export class ProviderModule {}
