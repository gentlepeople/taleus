import dayjs from 'dayjs';
import { useCallback, useEffect, useState } from 'react';
import { EnumMMKVKeystoreString, useMMKV } from '~/providers';
import { IReminderParams } from '../../../primary-home.type';

type IPrimary_HomeMinutesReminderManagerInput = void;
type IPrimary_HomeMinutesReminderManagerOutput = {
  checkMinutesReminder: ({ openPreventModal }: IReminderParams) => Promise<boolean>;
};

const TEN_MINUTES_IN_MS = 10 * 60 * 1000;

export const usePrimary_HomeMinutesReminderManager: Hook<
  IPrimary_HomeMinutesReminderManagerInput,
  IPrimary_HomeMinutesReminderManagerOutput
> = () => {
  const { keystore } = useMMKV();

  const [isActionBlocked, setIsActionBlocked] = useState(false);
  const [remainingTime, setRemainingTime] = useState('');

  const lastActionTime = keystore.getString(EnumMMKVKeystoreString.LAST_REMINDER_TIME_MINUTES);

  // 남은 시간을 업데이트하는 함수
  const updateRemainingTime = useCallback(async () => {
    if (lastActionTime) {
      const lastActionDate = dayjs(parseInt(lastActionTime, 10));
      const now = dayjs();

      const diffInMs = now.diff(lastActionDate);
      const remainingMs = TEN_MINUTES_IN_MS - diffInMs;

      if (remainingMs > 0) {
        setRemainingTime(dayjs(remainingMs).format('mm:ss'));
      } else {
        // 10분이 지나면 타이머를 초기화
        setIsActionBlocked(false);
        setRemainingTime('');
      }
    }
  }, [lastActionTime, setRemainingTime, setIsActionBlocked]);

  // 액션 가능 여부를 확인하는 함수
  const checkIfMinutesReminderAllowed = useCallback(async () => {
    if (lastActionTime) {
      const lastActionDate = dayjs(parseInt(lastActionTime, 10));
      const now = dayjs();

      // 만약 마지막 액션이 10분 이내에 실행된 것이라면 차단
      if (now.diff(lastActionDate) < TEN_MINUTES_IN_MS) {
        setIsActionBlocked(true);
        updateRemainingTime();
      }
    }
  }, [lastActionTime, setIsActionBlocked, updateRemainingTime]);

  // 액션 실행 함수
  const checkMinutesReminder = useCallback(
    async ({ openPreventModal }: IReminderParams) => {
      if (isActionBlocked) {
        // TODO:민기 remaining time 실시간으로 모달에서 바뀔 수 있게 modal 에서 interval setting
        openPreventModal(
          `독촉 알림은 10분에 한 번씩 보낼 수 있어요\n 남은 시간 : ${remainingTime}`,
        );
        return true;
      }

      // 액션을 실행하고 마지막 액션 시간을 저장
      const currentTime = dayjs().valueOf().toString();
      keystore.set(EnumMMKVKeystoreString.LAST_REMINDER_TIME_MINUTES, currentTime);

      // 10분 동안 액션 차단
      setIsActionBlocked(true);
      updateRemainingTime();
      return false;
    },
    [isActionBlocked, remainingTime, setIsActionBlocked, updateRemainingTime],
  );

  useEffect(() => {
    checkIfMinutesReminderAllowed();

    // 타이머가 설정되면 남은 시간을 1초마다 업데이트
    const interval = setInterval(() => {
      updateRemainingTime();
    }, 1000); // 1초마다 업데이트

    // 컴포넌트가 언마운트될 때 타이머를 정리
    return () => clearInterval(interval);
  }, []);

  return { checkMinutesReminder };
};
