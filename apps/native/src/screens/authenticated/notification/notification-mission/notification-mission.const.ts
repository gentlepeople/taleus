import dayjs from 'dayjs';

export const DEFAULT_NOTIFICATION_TIME = dayjs()
  .hour(10)
  .minute(0)
  .second(0)
  .millisecond(0)
  .toDate();
