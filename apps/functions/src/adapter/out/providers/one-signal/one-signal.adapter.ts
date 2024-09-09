import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import * as OneSignal from '@onesignal/node-onesignal';
import { logger } from 'firebase-functions/v2';
import { mapValues } from 'lodash';
import format from 'string-format';

import { EnumPushNotificationTemplate, PushNotificationTemplate } from './one-signal.const';

import { CONFIG_PORT, ConfigPort, MessagingPort } from '@/ports';

@Injectable()
export class OneSignalAdapter implements MessagingPort {
  private client: OneSignal.DefaultApi;

  constructor(
    @Inject(CONFIG_PORT)
    private readonly configPort: ConfigPort,
  ) {
    const configuration = OneSignal.createConfiguration({
      restApiKey: this.configPort.get('ONE_SIGNAL_REST_API_KEY'),
    });

    this.client = new OneSignal.DefaultApi(configuration);
  }

  async sendPushNotification(
    userIds: string[],
    templateType: EnumPushNotificationTemplate,
    args: { [key: string]: string | number },
  ): Promise<void> {
    if (userIds.length === 0) {
      throw new BadRequestException('Invalid input: Users not found.');
    }
    try {
      const template = PushNotificationTemplate[templateType];

      const notificationBody: OneSignal.Notification = {
        target_channel: 'push',
        app_id: this.configPort.get('ONE_SIGNAL_API_ID'),
        priority: 10,
        include_aliases: {
          external_id: userIds,
        },
        headings: mapValues(template.headings, (value) => format(value, args)),
        contents: mapValues(template.contents, (value) => format(value, args)),
        ...(template.app_url && {
          app_url: format(template.app_url, args),
        }),
      };
      const response = await this.client.createNotification(notificationBody);
      if (response.errors) {
        logger.error(`Error sendPushNotification: ${response.errors}.`);
      }
    } catch (e) {
      logger.error(`Error sendPushNotification: ${e}`);
      throw e;
    }
  }
}
