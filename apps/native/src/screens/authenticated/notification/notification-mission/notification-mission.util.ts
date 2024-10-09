import dayjs from 'dayjs';
import { IFormattedTime } from './notification-mission.type';

export const formatTime: Util<Date, IFormattedTime> = (time) => {
  const parsedDate = dayjs(time);

  const hour = parsedDate.hour();
  const minute = parsedDate.minute();

  const period = hour >= 12 ? '오후' : '오전';

  const formattedHour = hour % 12 === 0 ? 12 : hour % 12;
  const formattedHourWithZero = formattedHour < 10 ? '0' + formattedHour : formattedHour;
  const formattedMinuteWithZero = minute < 10 ? '0' + minute : minute;

  return {
    period,
    formattedHourWithZero,
    formattedMinuteWithZero,
  };
};
