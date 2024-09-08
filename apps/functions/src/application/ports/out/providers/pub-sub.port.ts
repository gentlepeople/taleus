export const PUBSUB_PORT = Symbol('PUBSUB_PORT');

export interface PubSubPort {
  publish(eventName: string, payload: any): Promise<void>;
  asyncIterator(eventName: string): AsyncIterator<any>;
}
