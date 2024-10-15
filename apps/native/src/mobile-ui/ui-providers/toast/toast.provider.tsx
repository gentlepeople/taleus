import { ComponentProps, ReactNode } from 'react';
import { useWindowDimensions } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  ToastProvider as NativeToastProvider,
  ToastOptions,
  ToastType,
  useToast as useNativeToast,
} from 'react-native-toast-notifications';

import { Icon } from '../../components/atoms/icon';
import { Text } from '../../components/atoms/text';
import { Box } from '../../components/layouts/box';
import { Stack } from '../../components/layouts/stack';

import { palette, radius, size, spacing } from '../../theme';

type IToastProviderProps = {
  children: ReactNode;
};

const TOAST_DEFAULT_DURATION = 4000;

export const ToastProvider = ({ children }: IToastProviderProps) => {
  const { width } = useWindowDimensions();
  const { top } = useSafeAreaInsets();

  const initialProps: Partial<ComponentProps<typeof NativeToastProvider>> = {
    placement: 'top',
    offsetTop: top + spacing['2-x'],
    offsetBottom: spacing['8-x'],
    duration: TOAST_DEFAULT_DURATION,
    renderType: {
      snackbar: ({ message }) => {
        return (
          <Stack
            horizontal
            space={spacing['3-x']}
            padding={spacing['4.5-x']}
            style={{
              backgroundColor: palette['gray-40'],
              borderRadius: radius['5-x'],
              maxWidth: width - 2 * spacing['4-x'],
            }}
            align="center"
            marginBottom={spacing['3-x']}
          >
            <Box>
              {/* <FillView>
                <Icon name="stop_circle" size={size['7-x']} color={palette['white-1000']} />
              </FillView>
              <Icon name="check_circle" size={size['7-x']} color={palette['geekBlue-500']} /> */}
            </Box>
            {/* <Text variant="titleSmall" color="onPrimary">
              {message}
            </Text> */}
          </Stack>
        );
      },
      error: ({ message }) => {
        return (
          <Stack
            horizontal
            space={spacing['3-x']}
            padding={spacing['4.5-x']}
            style={[
              {
                backgroundColor: palette['gray-40'],
                borderRadius: radius['5-x'],
                maxWidth: width - 2 * spacing['4-x'],
              },
            ]}
            align="center"
            marginBottom={spacing['3-x']}
          >
            <Box>
              <Icon name="error" size={size['7-x']} color="#FFC107" />
            </Box>
            <Text textType="body/14/medium" color="white-100">
              {message}
            </Text>
          </Stack>
        );
      },
      success: ({ message }) => {
        return (
          <Stack
            horizontal
            space={spacing['3-x']}
            padding={spacing['4.5-x']}
            style={[
              {
                backgroundColor: palette['gray-20'],
                borderRadius: radius['5-x'],
                maxWidth: width - 2 * spacing['4-x'],
              },
            ]}
            align="center"
            marginBottom={spacing['3-x']}
          >
            <Box
              alignX="center"
              alignY="center"
              style={{
                width: size['5-x'],
                height: size['5-x'],
                backgroundColor: palette['primary'],
                borderRadius: radius['5-x'],
              }}
            >
              <Icon name="check" size={size['5-x']} color={palette['white-100']} />
            </Box>
            <Text textType="body/14/medium" color="white-100">
              {message}
            </Text>
          </Stack>
        );
      },
    },
  };
  return <NativeToastProvider {...initialProps}>{children}</NativeToastProvider>;
};

export const useToast = (): ToastType => {
  const toast = useNativeToast();

  const show = (message: string | JSX.Element, toastOptions?: ToastOptions) => {
    toast.hideAll();
    const id = toast.show(message, toastOptions);

    return id;
  };

  const update = (id: string, message: string | JSX.Element, toastOptions?: ToastOptions) => {
    toast.update(id, message, toastOptions);
  };

  const hide = (id: string) => {
    toast.hide(id);
  };

  const hideAll = () => {
    toast.hideAll();
  };

  const isOpen = (id: string) => {
    const isOpen = toast.isOpen(id);

    return isOpen;
  };

  return { show, update, hide, hideAll, isOpen };
};
