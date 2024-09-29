import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { EnumMMKVKeystoreString, useMMKV } from '~/providers';
import { IReminderParams } from '../../../primary-home.type';

type IPrimary_HomeDayReminderManagerInput = void;
type IPrimary_HomeDayReminderManagerOutput = {
  checkDayReminder: ({ openPreventModal }: IReminderParams) => Promise<boolean>;
};

export const usePrimary_HomeDayReminderManager: Hook<
  IPrimary_HomeDayReminderManagerInput,
  IPrimary_HomeDayReminderManagerOutput
> = () => {
  const { keystore } = useMMKV();

  const [isDayReminderBlocked, setIsDayReminderBlocked] = useState<boolean>(false);
  const [remainingTime, setRemainingTime] = useState<string>('');

  const lastActionTime = keystore.getString(EnumMMKVKeystoreString.LAST_REMINDER_TIME_DAY);

  // 액션 가능 여부를 확인하는 함수
  const checkIfDayReminderAllowed = async () => {
    if (lastActionTime) {
      const lastActionDate = dayjs(parseInt(lastActionTime, 10));
      const now = dayjs();

      // 만약 마지막 액션이 오늘 실행된 것이라면 차단
      if (now.isSame(lastActionDate, 'day')) {
        setIsDayReminderBlocked(true);
        const remainingMs = lastActionDate.endOf('day').diff(now);
        setRemainingTime(dayjs(remainingMs).format('HH:mm:ss'));
      }
    }
  };

  const updateRemainingTime = async () => {
    if (lastActionTime) {
      const lastActionDate = dayjs(parseInt(lastActionTime, 10));
      const now = dayjs();

      if (now.isSame(lastActionDate, 'day')) {
        const remainingMs = lastActionDate.endOf('day').diff(now);
        setRemainingTime(dayjs(remainingMs).format('HH:mm:ss'));
      } else {
        // 하루가 지났으면 타이머를 초기화
        setIsDayReminderBlocked(false);
        setRemainingTime('');
      }
    }
  };

  // 액션 실행 함수
  const checkDayReminder = async ({ openPreventModal }: IReminderParams) => {
    console.log('hi', isDayReminderBlocked);
    if (isDayReminderBlocked) {
      const hour = remainingTime.slice(0, 2);
      openPreventModal(`독촉 알림은 하루에 한 번씩 보낼 수 있어요\n 남은 시간 : 약 ${hour}시간`);
      return true;
    }

    console.log('여기 옴');
    // 액션을 실행하고 마지막 액션 시간을 저장
    const currentTime = dayjs().valueOf().toString();
    keystore.set(EnumMMKVKeystoreString.LAST_REMINDER_TIME_DAY, currentTime);

    // 하루 동안 액션 차단
    setIsDayReminderBlocked(true);
    updateRemainingTime();
    return false;
  };

  useEffect(() => {
    checkIfDayReminderAllowed();

    const interval = setInterval(() => {
      updateRemainingTime();
    }, 1000); // 1초마다 업데이트

    // 컴포넌트가 언마운트될 때 타이머를 정리
    return () => clearInterval(interval);
  }, []);

  return { checkDayReminder };
};
