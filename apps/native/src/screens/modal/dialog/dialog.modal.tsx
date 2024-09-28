import { useBackHandler } from '@react-native-community/hooks';
import { GestureResponderEvent, useWindowDimensions } from 'react-native';
import { ModalComponentProp, ModalComponentWithOptions } from 'react-native-modalfy';
import { useWillUnmount } from 'rooks';

import { Box, palette, PressableQuark, radius, size, spacing, Stack, Text } from '~/mobile-ui';

import { IModalStackParams } from '../modal.stack';

export type IDialogProps = ModalComponentProp<IModalStackParams, void, 'Dialog'>;

export const Dialog: ModalComponentWithOptions<IDialogProps> = ({ modal }) => {
  const { params, closeModal } = modal;
  const { title, content, buttonHorizontal, okayButton, cancelButton, children } = params;
  const { width } = useWindowDimensions();
  const { onPop } = params;

  useBackHandler(() => {
    closeModal('Dialog', () => {
      onPop && onPop();
    });
    return true;
  });

  const handlePressOkayButton = async (e: GestureResponderEvent) => {
    if (typeof okayButton !== 'boolean') {
      const { onPress, onClose } = okayButton;
      onPress && (await onPress(e));
      closeModal('Dialog', () => {
        onClose && onClose();
      });
    } else {
      closeModal('Dialog', () => {
        onPop && onPop();
      });
    }
  };

  const handlePressCancelButton = async (e: GestureResponderEvent) => {
    if (typeof cancelButton !== 'boolean') {
      const { onPress, onClose } = cancelButton;
      onPress && (await onPress(e));
      closeModal('Dialog', () => {
        onClose && onClose();
      });
    } else {
      closeModal('Dialog', () => {
        onPop && onPop();
      });
    }
  };

  useWillUnmount(() => {
    onPop && onPop();
  });

  return (
    <Box
      paddingX={spacing['11-x']}
      paddingTop={spacing['14-x']}
      paddingBottom={spacing['10-x']}
      style={{
        backgroundColor: palette['white-100'],
        width: width - 2 * spacing['8-x'],
        borderRadius: radius['2-x'],
      }}
      alignX="center"
      alignY="center"
      alignSelf="center"
    >
      <Stack align="center" space={spacing['10-x']}>
        {!!title && (
          <Text textType="body/15/bold" color="black-100" textAlignment="center">
            {title}
          </Text>
        )}
        {/* {!!content && (
          <Text textType="headline 4" color="textPrimary" textAlignment="center">
            {content}
          </Text>
        )} */}
        {children}
        {/* TODO:민기 horizontal false 일 때 위 아래로 full width button들 만들기 */}
        <Stack horizontal={buttonHorizontal} space={spacing['3-x']}>
          {buttonHorizontal && !!cancelButton && (
            <PressableQuark onPress={handlePressCancelButton}>
              <Box
                alignX="center"
                alignY="center"
                style={{
                  width: size['26-x'],
                  height: size['12-x'],
                  backgroundColor: palette['gray-20'],
                  borderRadius: radius['4-x'],
                }}
              >
                <Text textType="body/12/regular" color="white-100">
                  {typeof cancelButton !== 'boolean' && cancelButton.label}
                </Text>
              </Box>
            </PressableQuark>
          )}
          {!buttonHorizontal && !!cancelButton && (
            <PressableQuark onPress={handlePressCancelButton}>
              <Box
                alignX="center"
                alignY="center"
                style={{
                  width: '100%',
                  height: size['12-x'],
                  backgroundColor: palette['gray-20'],
                  borderRadius: radius['4-x'],
                }}
              >
                <Text textType="body/12/regular" color="white-100">
                  {typeof cancelButton !== 'boolean' && cancelButton.label}
                </Text>
              </Box>
            </PressableQuark>
          )}
          {buttonHorizontal && !!okayButton && (
            <PressableQuark onPress={handlePressOkayButton}>
              <Box
                alignX="center"
                alignY="center"
                style={{
                  width: size['26-x'],
                  height: size['12-x'],
                  backgroundColor: palette['black-100'],
                  borderRadius: radius['4-x'],
                }}
              >
                <Text textType="body/12/regular" color="white-100">
                  {typeof okayButton !== 'boolean' && okayButton.label}
                </Text>
              </Box>
            </PressableQuark>
          )}
          {!buttonHorizontal && !!okayButton && (
            <PressableQuark onPress={handlePressOkayButton}>
              <Box
                alignX="center"
                alignY="center"
                style={{
                  width: '100%',
                  height: size['12-x'],
                  backgroundColor: palette['black-100'],
                  borderRadius: radius['4-x'],
                }}
              >
                <Text textType="body/12/regular" color="white-100">
                  {typeof okayButton !== 'boolean' && okayButton.label}
                </Text>
              </Box>
            </PressableQuark>
          )}
        </Stack>
      </Stack>
    </Box>
  );
};

Dialog.modalOptions = {
  backBehavior: 'pop',
};
