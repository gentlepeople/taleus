import dayjs, { Dayjs } from 'dayjs';
import { memo, useCallback, useState } from 'react';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { PressableQuark, Stack, Text, TextInput, size, spacing } from '~/mobile-ui';

type IAuthentication_SignUp_BirthDateViewProps = {
  birthDate: Date;
  onChangeDate: (date: Date) => void;
};

export const Authentication_SignUp_BirthDateView = memo<IAuthentication_SignUp_BirthDateViewProps>(
  ({ birthDate, onChangeDate }) => {
    const [showDatePicker, setShowDatePicker] = useState<boolean>(false);

    const openDatePicker = useCallback(() => {
      setShowDatePicker(true);
    }, [setShowDatePicker]);

    const closeDatePicker = useCallback(() => {
      setShowDatePicker(false);
    }, [setShowDatePicker]);

    const handleChangeDate = useCallback(
      (date: Dayjs) => {
        closeDatePicker();

        onChangeDate(date.toDate());
      },
      [onChangeDate],
    );

    const date = dayjs(birthDate);
    const year = date.year();
    const month = date.month() + 1;
    const day = date.date();

    return (
      <>
        <Stack paddingX={spacing['6-x']} space={spacing['2-x']}>
          <Text textType="body/14/medium" color="text-black">
            {'생년월일'}
          </Text>
          <PressableQuark onPress={openDatePicker}>
            <Stack horizontal align="center" space={spacing['2.5-x']}>
              <Stack horizontal align="center" space={spacing['2-x']}>
                <TextInput
                  placeholder={''}
                  currentValue={String(year)}
                  editable={false}
                  width={size['21.25-x']}
                  textAlignCenter
                />
                <Text textType="body/14/medium" color="text-black">
                  {'년'}
                </Text>
              </Stack>
              <Stack horizontal align="center" space={spacing['2-x']}>
                <TextInput
                  placeholder={''}
                  currentValue={String(month).padStart(2, '0')}
                  editable={false}
                  width={size['18.5-x']}
                  textAlignCenter
                />
                <Text textType="body/14/medium" color="text-black">
                  {'월'}
                </Text>
              </Stack>
              <Stack horizontal align="center" space={spacing['2-x']}>
                <TextInput
                  placeholder={''}
                  currentValue={String(day).padStart(2, '0')}
                  editable={false}
                  width={size['18.5-x']}
                  textAlignCenter
                />
                <Text textType="body/14/medium" color="text-black">
                  {'일'}
                </Text>
              </Stack>
            </Stack>
          </PressableQuark>
        </Stack>
        <DateTimePickerModal
          confirmTextIOS={'확인'}
          cancelTextIOS={'취소'}
          isVisible={showDatePicker}
          date={dayjs(birthDate).toDate()}
          mode="date"
          display="spinner"
          onConfirm={(date) => {
            handleChangeDate(dayjs(date));
          }}
          onCancel={closeDatePicker}
        />
      </>
    );
  },
);
