export enum EnumSystemNotificationMessageTarget {
  'CRASH' = 'CRASH',
  'SCHEDULER' = 'SCHEDULER',
}

export type SystemNotificationContentStatusType = 'LOG' | 'WARN' | 'ERROR';

export type ISystemNotificationType = {
  target: EnumSystemNotificationMessageTarget;
  content: {
    status: SystemNotificationContentStatusType;
    title: string;
    data: { dataTitle: string; dataDescription: unknown }[];
  };
};
