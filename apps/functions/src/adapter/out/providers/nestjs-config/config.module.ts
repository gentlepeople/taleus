import { Module } from '@nestjs/common';
import { ConfigModule as NestjsConfigModule } from '@nestjs/config';

import { NestjsConfigAdapter } from './nestjs-config.adapter';

import { CONFIG_PORT } from '@/ports';

@Module({
  imports: [
    NestjsConfigModule.forRoot({
      isGlobal: true,
      cache: true,
    }),
  ],
  providers: [
    {
      provide: CONFIG_PORT,
      useClass: NestjsConfigAdapter,
    },
  ],
  exports: [CONFIG_PORT],
})
export class ConfigModule {}
