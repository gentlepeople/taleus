import { IAnalyticsEvent, IAnalyticsPeopleIncrement, IAnalyticsPeopleSet } from '@/providers';

export const ANALYTICS_PORT = Symbol('ANALYTICS_PORT');

export interface AnalyticsPort {
  sendEvent({ type, properties, distinct_id }: IAnalyticsEvent): void;
  incrementProfileProperty({
    distinctId,
    propertyName,
    incrementBy,
  }: IAnalyticsPeopleIncrement): void;
  setProfileProperties({
    distinctId,
    properties,
  }: {
    distinctId: string;
    properties: IAnalyticsPeopleSet;
  }): void;
}
