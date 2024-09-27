import { CacheModule as InMemoryCacheModule } from '@nestjs/cache-manager';
import { Global, Module } from '@nestjs/common';

import { CacheAdapter } from './cache.adapter';
import { DEFAULT_CACHE_TTL } from './cache.const';

@Global()
@Module({
  imports: [
    InMemoryCacheModule.register({
      ttl: DEFAULT_CACHE_TTL,
    }),
  ],
  providers: [CacheAdapter],
  exports: [CacheAdapter],
})
export class CacheModule {}
