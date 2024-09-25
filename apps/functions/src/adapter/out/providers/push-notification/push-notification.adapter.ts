import { HttpService } from '@nestjs/axios';
import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import * as OneSignal from '@onesignal/node-onesignal';
import { AxiosResponse } from 'axios';
import { logger } from 'firebase-functions/v2';
import { mapValues } from 'lodash';
import { lastValueFrom, map } from 'rxjs';
import format from 'string-format';

import {
  EnumPushNotificationTemplate,
  MAX_NICKNAME_LENGTH,
  PushNotificationTemplate,
} from './push-notification.const';

import { CONFIG_PORT, ConfigPort, PushNotificationPort } from '@/ports';

@Injectable()
export class PushNotificationAdapter implements PushNotificationPort {
  // private client: OneSignal.DefaultApi;

  constructor(
    @Inject(CONFIG_PORT)
    private readonly configPort: ConfigPort,
    private readonly httpService: HttpService,
  ) {
    // const configuration = OneSignal.createConfiguration({
    //   userAuthKey: this.configPort.get("ONE_SIGNAL_USER_AUTH_KEY"),
    //   restApiKey: this.configPort.get("ONE_SIGNAL_REST_API_KEY"),
    // });
    // this.client = new OneSignal.DefaultApi(configuration);
  }

  async send(
    userIds: string[],
    templateType: EnumPushNotificationTemplate,
    args: { [key: string]: string | number },
  ): Promise<void> {
    if (userIds.length === 0) {
      throw new BadRequestException('Invalid input: Users not found.');
    }
    try {
      const template = PushNotificationTemplate[templateType];

      const limitedArgs = this.limitArgsLength(args);

      const notificationBody: OneSignal.Notification = {
        target_channel: 'push',
        app_id: this.configPort.get('ONE_SIGNAL_APP_ID'),
        priority: 10,
        include_aliases: {
          external_id: userIds,
        },
        headings: mapValues(template.headings, (value) => format(value, limitedArgs)),
        contents: mapValues(template.contents, (value) => format(value, limitedArgs)),
        ...(template.app_url && {
          app_url: format(template.app_url, args),
        }),
      };
      const response = await lastValueFrom(
        this.httpService
          .post('https://api.onesignal.com/notifications?c=push', notificationBody, {
            headers: {
              'Content-Type': 'application/json; charset=utf-8',
              Authorization: `Basic ${this.configPort.get('ONE_SIGNAL_REST_API_KEY')}`,
            },
          })
          .pipe(map((response: AxiosResponse) => response.data)),
      );
      if (response.errors) {
        logger.error(`Error sendPushNotification(createNotification): ${response.errors}.`);
      }
    } catch (e) {
      logger.error(`Error sendPushNotification: ${e}`);
      throw e;
    }
  }

  limitArgsLength(args: { [key: string]: string | number }): {
    [key: string]: string | number;
  } {
    const nickname = args.nickname as string;
    if (nickname?.length > MAX_NICKNAME_LENGTH) {
      args.nickname = nickname.slice(0, MAX_NICKNAME_LENGTH);
    }
    return args;
  }
}
