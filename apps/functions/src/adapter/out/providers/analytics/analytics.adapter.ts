import { Injectable } from '@nestjs/common';
import { Mixpanel, init } from 'mixpanel';

import { ConfigAdapter } from '../config';

import { IAnalyticsEvent, IAnalyticsPeopleIncrement, IAnalyticsPeopleSet } from './analytics.type';

import { AnalyticsPort } from '@/ports';

@Injectable()
export class AnalyticsAdapter implements AnalyticsPort {
  private analytics: Mixpanel | null = null;

  constructor(private readonly configAdapter: ConfigAdapter) {
    const token = this.configAdapter.get('MIXPANEL_PROJECT_TOKEN');
    if (token) {
      this.analytics = init(token);
    }
  }

  public sendEvent({ type, properties, distinct_id }: IAnalyticsEvent): void {
    if (this.analytics !== null) {
      this.analytics.track(type, { ...properties, distinct_id });
    }

    return null;
  }

  public incrementProfileProperty({
    distinctId,
    propertyName,
    incrementBy,
  }: IAnalyticsPeopleIncrement): void {
    return this.analytics.people.increment(distinctId, propertyName, incrementBy);
  }

  public setProfileProperties({
    distinctId,
    properties,
  }: {
    distinctId: string;
    properties: IAnalyticsPeopleSet;
  }): void {
    return this.analytics.people.set(distinctId, properties);
  }
}
