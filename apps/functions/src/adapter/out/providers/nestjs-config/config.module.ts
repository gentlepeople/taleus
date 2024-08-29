import { Module } from '@nestjs/common';
import { ConfigModule as NestjsConfigModule } from '@nestjs/config';

import { NestjsConfigService } from './nestjs-config.service';

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
      useClass: NestjsConfigService,
    },
  ],
  exports: [CONFIG_PORT],
})
export class ConfigModule {}
