export enum EnumPushNotificationTemplate {
  'DAILY_MISSION_ALARM' = 'DAILY_MISSION_ALARM',
  'UPDATE_PARTNER_NOTIFICATION_TIME_ALARM' = 'UPDATE_PARTNER_NOTIFICATION_TIME_ALARM',
  'REMIND_MISSION_TO_PARTNER_ALARM' = 'REMIND_MISSION_TO_PARTNER_ALARM',
}

export const MAX_NICKNAME_LENGTH = 10;

export type PushNotificationBody = {
  contents: {
    ko: string;
    en: string;
  };
  headings: {
    ko: string;
    en: string;
  };
  app_url?: string;
  buttons?: { id: string; text: string; icon?: string }[];
};

export const PushNotificationTemplate: {
  [key in EnumPushNotificationTemplate]: PushNotificationBody;
} = {
  [EnumPushNotificationTemplate.DAILY_MISSION_ALARM]: {
    headings: {
      ko: '🍊오늘의 질문이 도착했어요',
      en: '🍊오늘의 질문이 도착했어요',
    },
    contents: {
      ko: '💌답변을 제출하고 서로의 답변을 중심으로 새로운 대화를 나눠보세요!',
      en: '💌답변을 제출하고 서로의 답변을 중심으로 새로운 대화를 나눠보세요!',
    },
    app_url: 'taleus://primary/home',
  },
  [EnumPushNotificationTemplate.UPDATE_PARTNER_NOTIFICATION_TIME_ALARM]: {
    headings: {
      ko: '🍊[오늘의 질문] 도착 시간이 변경되었어요!',
      en: '🍊[오늘의 질문] 도착 시간이 변경되었어요!',
    },
    contents: {
      ko: '⏰ {nickname}님이 우리의 [오늘의 질문] 알림 시간을 변경했어요!',
      en: '⏰ {nickname}님이 우리의 [오늘의 질문] 알림 시간을 변경했어요!',
    },
  },
  [EnumPushNotificationTemplate.REMIND_MISSION_TO_PARTNER_ALARM]: {
    headings: {
      ko: '🍊{nickname}님이 콕👉 찔렀어요',
      en: '🍊{nickname}님이 콕👉 찔렀어요',
    },
    contents: {
      ko: '💌답변을 제출하고 내 연인의 답변을 확인해보세요!',
      en: '💌답변을 제출하고 내 연인의 답변을 확인해보세요!',
    },
  },
};
