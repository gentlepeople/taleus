import dayjs from 'dayjs';
import { memo } from 'react';

import { CELEBRATE_LOTTIE, Inline, Lottie, Stack, Text, size, spacing } from '~/mobile-ui';

type INotification_Mission_ContentViewProps = {
  nickname: string;
  notificationTime: Date;
};

export const Notification_Mission_ContentView = memo<INotification_Mission_ContentViewProps>(
  ({ nickname, notificationTime }) => {
    const parsedDate = dayjs(notificationTime);

    const hour = parsedDate.hour();
    const minute = parsedDate.minute();

    const period = hour >= 12 ? '오후' : '오전';

    const formattedHour = hour % 12 === 0 ? 12 : hour % 12;
    const formattedHourWithZero = formattedHour < 10 ? '0' + formattedHour : formattedHour;
    const formattedMinuteWithZero = minute < 10 ? '0' + minute : minute;

    return (
      <Stack space={spacing['4-x']} align="center">
        <Stack align="center">
          <Lottie
            source={CELEBRATE_LOTTIE}
            style={{ width: size['60-x'], height: size['60-x'] }}
            autoPlay
          />
          <Text textType="title/18/bold" textAlignment="center">
            {`${nickname}님의 답변을 저장했어요.\n이제 질문을 받아볼 시간을 정해봐요!`}
          </Text>
        </Stack>
        <Inline space={spacing['1-x']} alignX="center" alignY="center">
          <Text textType="title/20/bold" color="text-black">
            {period}
          </Text>
          <Text textType="title/20/bold" color="text-black">
            {formattedHourWithZero}
          </Text>
          <Text textType="title/20/bold" color="text-black">
            {':'}
          </Text>
          <Text textType="title/20/bold" color="text-black">
            {formattedMinuteWithZero}
          </Text>
        </Inline>
      </Stack>
    );
  },
);
