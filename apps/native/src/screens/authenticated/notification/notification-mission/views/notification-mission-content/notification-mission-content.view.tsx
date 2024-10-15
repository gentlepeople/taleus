import { memo, useCallback, useState } from 'react';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

import {
  CELEBRATE_LOTTIE,
  Inline,
  Lottie,
  PressableQuark,
  Stack,
  Text,
  TextInput,
  size,
  spacing,
} from '~/mobile-ui';

type INotification_Mission_ContentViewProps = {
  nickname: string;
  notificationTime: Date;
  formattedTime: string;
  onChangeDate: (time: Date) => void;
};

export const Notification_Mission_ContentView = memo<INotification_Mission_ContentViewProps>(
  ({ nickname, notificationTime, formattedTime, onChangeDate }) => {
    const [showDatePicker, setShowDatePicker] = useState<boolean>(false);

    const openDatePicker = useCallback(() => {
      setShowDatePicker(true);
    }, [setShowDatePicker]);

    const closeDatePicker = useCallback(() => {
      setShowDatePicker(false);
    }, [setShowDatePicker]);

    const handleChangeDate = useCallback(
      (time: Date) => {
        closeDatePicker();

        onChangeDate(time);
      },
      [onChangeDate],
    );

    const [hour, minutes] = formattedTime.split(':');

    return (
      <>
        <Stack space={spacing['10-x']} align="center">
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
          <PressableQuark onPress={openDatePicker}>
            <Inline space={spacing['2.5-x']} alignX="center" alignY="center">
              <Stack horizontal align="center" space={spacing['2-x']}>
                <TextInput
                  placeholder={''}
                  currentValue={hour}
                  editable={false}
                  width={size['18.5-x']}
                  textAlignCenter
                />
                <Text textType="body/14/medium" color="text-black">
                  {'시'}
                </Text>
              </Stack>
              <Stack horizontal align="center" space={spacing['2-x']}>
                <TextInput
                  placeholder={''}
                  currentValue={minutes}
                  editable={false}
                  width={size['18.5-x']}
                  textAlignCenter
                />
                <Text textType="body/14/medium" color="text-black">
                  {'분'}
                </Text>
              </Stack>
            </Inline>
          </PressableQuark>
        </Stack>
        <DateTimePickerModal
          confirmTextIOS={'확인'}
          cancelTextIOS={'취소'}
          isVisible={showDatePicker}
          date={notificationTime}
          mode="time"
          display="spinner"
          onConfirm={(date) => {
            handleChangeDate(date);
          }}
          onCancel={closeDatePicker}
        />
      </>
    );
  },
);
