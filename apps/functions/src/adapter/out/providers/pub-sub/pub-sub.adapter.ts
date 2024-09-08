import { Injectable } from '@nestjs/common';
import { PubSub } from 'graphql-subscriptions';

import { PubSubPort } from '@/ports';

@Injectable()
export class PubSubAdapter implements PubSubPort {
  private pubSub: PubSub;
  constructor() {
    this.pubSub = new PubSub();
  }
  public async publish(eventName: string, payload: any): Promise<void> {
    await this.pubSub.publish(eventName, payload);
  }
  public asyncIterator<T>(eventName: string): AsyncIterator<T> {
    return this.pubSub.asyncIterator(eventName);
  }
}
