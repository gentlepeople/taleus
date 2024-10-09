import { memo, useCallback, useState } from 'react';

import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { Box, PressableQuark, Stack, Text, palette, radius, size, spacing } from '~/mobile-ui';

type INotification_Mission_ButtonsViewProps = {
  notificationTime: Date;
  onChangeDate: (time: Date) => void;
  onPressDefaultTime: () => void;
};

export const Notification_Mission_ButtonsView = memo<INotification_Mission_ButtonsViewProps>(
  ({ notificationTime, onChangeDate, onPressDefaultTime }) => {
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

    const handlePressDefaultTime = useCallback(() => {
      onPressDefaultTime();
    }, [onPressDefaultTime]);

    return (
      <>
        <Stack paddingX={spacing['7.5-x']} space={spacing['2-x']}>
          <PressableQuark onPress={openDatePicker}>
            <Box
              paddingY={spacing['2.5-x']}
              style={{ backgroundColor: palette['primary'], borderRadius: radius['25-x'] }}
            >
              <Text textType="body/14/semibold" color="white-100" textAlignment="center">
                {'우리 커플에게 맞는 시간 설정하기'}
              </Text>
            </Box>
          </PressableQuark>
          <PressableQuark onPress={handlePressDefaultTime}>
            <Box
              paddingY={spacing['2.5-x']}
              style={{
                backgroundColor: palette['white-100'],
                borderWidth: size['0.25-x'],
                borderColor: palette['primary'],
                borderRadius: radius['25-x'],
              }}
            >
              <Text textType="body/14/semibold" color="text-black" textAlignment="center">
                {'오전 10시에 질문 받아보기'}
              </Text>
            </Box>
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
