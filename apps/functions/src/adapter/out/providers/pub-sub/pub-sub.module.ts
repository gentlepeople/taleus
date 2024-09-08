import { Global, Module } from '@nestjs/common';

import { PubSubAdapter } from './pub-sub.adapter';

import { PUBSUB_PORT } from '@/ports';

@Global()
@Module({
  providers: [
    {
      provide: PUBSUB_PORT,
      useClass: PubSubAdapter,
    },
  ],
  exports: [PUBSUB_PORT],
})
export class PubSubModule {}
