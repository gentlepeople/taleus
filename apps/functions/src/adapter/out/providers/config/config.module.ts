import { Global, Module } from '@nestjs/common';
import { ConfigModule as NestjsConfigModule } from '@nestjs/config';

import { ConfigAdapter } from './config.adapter';

import { CONFIG_PORT } from '@/ports';

@Global()
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
      useClass: ConfigAdapter,
    },
  ],
  exports: [CONFIG_PORT],
})
export class ConfigModule {}
