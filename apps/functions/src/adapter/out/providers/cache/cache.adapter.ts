import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';

@Injectable()
export class CacheAdapter {
  constructor(@Inject(CACHE_MANAGER) private readonly cacheManager: Cache) {
    this.cacheManager = cacheManager;
  }

  del = this.cacheManager.del;
  get = this.cacheManager.get;
  reset = this.cacheManager.reset;
  set = this.cacheManager.set;
  store = this.cacheManager.store;
  wrap = this.cacheManager.wrap;
}
