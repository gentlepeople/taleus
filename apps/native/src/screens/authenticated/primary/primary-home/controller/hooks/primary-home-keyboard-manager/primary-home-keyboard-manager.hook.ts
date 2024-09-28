import { useKeyboard } from '@react-native-community/hooks';
import { useCallback } from 'react';
import { Keyboard } from 'react-native';

type IPrimary_HomeKeyboardManagerInput = void;
type IPrimary_HomeKeyboardManagerOutput = {
  hideKeyboard: () => void;
};

export const usePrimary_HomeKeyboardManager: Hook<
  IPrimary_HomeKeyboardManagerInput,
  IPrimary_HomeKeyboardManagerOutput
> = () => {
  const keyboard = useKeyboard();

  const hideKeyboard = useCallback(() => {
    if (keyboard.keyboardShown) {
      Keyboard.dismiss();
    }
  }, [keyboard, Keyboard]);

  return { hideKeyboard };
};
