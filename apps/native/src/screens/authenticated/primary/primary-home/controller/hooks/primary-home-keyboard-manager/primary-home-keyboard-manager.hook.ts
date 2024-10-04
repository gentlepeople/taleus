import { useKeyboard } from '@react-native-community/hooks';
import { useCallback } from 'react';
import { Keyboard } from 'react-native';

type IPrimary_HomeKeyboardManagerInput = void;
type IPrimary_HomeKeyboardManagerOutput = {
  isKeyboardShown: boolean;
  hideKeyboard: () => void;
};

export const usePrimary_HomeKeyboardManager: Hook<
  IPrimary_HomeKeyboardManagerInput,
  IPrimary_HomeKeyboardManagerOutput
> = () => {
  const keyboard = useKeyboard();

  const isKeyboardShown = keyboard.keyboardShown;

  const hideKeyboard = useCallback(() => {
    if (isKeyboardShown) {
      Keyboard.dismiss();
    }
  }, [isKeyboardShown, Keyboard]);

  return { isKeyboardShown, hideKeyboard };
};
