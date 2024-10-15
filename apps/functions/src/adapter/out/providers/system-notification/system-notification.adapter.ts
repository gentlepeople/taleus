import { Injectable } from '@nestjs/common';
import { SectionBlock } from '@slack/types';
import { IncomingWebhook, IncomingWebhookSendArguments } from '@slack/webhook';
import isNil from 'lodash/isNil';

import {
  EnumSystemNotificationMessageTarget,
  ISystemNotificationType,
  SystemNotificationContentStatusType,
} from './system-notification.type';

import { isLocal } from '@/common';
import { SystemNotificationPort } from '@/ports';

@Injectable()
export class SystemNotificationAdapter implements SystemNotificationPort {
  async send({ target, content }: ISystemNotificationType): Promise<void> {
    if (isLocal) {
      console.log('Notification skipped in local environment.');
      return;
    }

    try {
      const webhook = new IncomingWebhook(this.getSlackWebhookUrl(target));
      const slackWebHookMessage = this.buildSlackMessage(content);
      await webhook.send(slackWebHookMessage);
    } catch (e) {
      console.error('Failed to send notification', e);
    }
  }

  private buildSlackMessage(
    content: ISystemNotificationType['content'],
  ): IncomingWebhookSendArguments {
    const fields: SectionBlock['fields'] = content.data.map((item) => ({
      type: 'mrkdwn',
      text: `*${item.dataTitle}:* ${this.slackNotificationDataDescriptionConvert(
        item.dataDescription,
      )}`,
    }));

    return {
      ...(content.text && { text: content.text }),
      attachments: [
        {
          color: this.getColorByStatus(content.status),
          blocks: [
            {
              type: 'header',
              text: {
                type: 'plain_text',
                text: content.title,
                emoji: true,
              },
            },
            {
              type: 'section',
              fields,
            },
          ],
        },
      ],
    };
  }

  private getSlackWebhookUrl(target: EnumSystemNotificationMessageTarget): string {
    switch (target) {
      case EnumSystemNotificationMessageTarget.CRASH: {
        return process.env.SLACK_CRASH_URL;
      }
      case EnumSystemNotificationMessageTarget.SCHEDULER: {
        return process.env.SLACK_SCHEDULER_URL;
      }
    }
  }

  private getColorByStatus(status: SystemNotificationContentStatusType): string {
    switch (status) {
      case 'LOG':
        return '#4BB543';
      case 'WARN':
        return '#f2c744';
      default:
        return '#FF5733'; // ERROR or others
    }
  }

  private slackNotificationDataDescriptionConvert(description: unknown): string {
    if (typeof description === 'boolean') {
      return description ? '예' : '아니요';
    } else if (isNil(description)) {
      return '없음';
    } else {
      return description as string;
    }
  }
}
