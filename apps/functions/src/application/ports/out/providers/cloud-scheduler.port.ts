export const CLOUD_SCHEDULER_PORT = Symbol('CLOUD_SCHEDULER_PORT');

export interface CloudSchedulerPort {
  getJob(name: string): Promise<{ scheduleTime: any }>;
}
