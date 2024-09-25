import { useSafeAreaFrame, useSafeAreaInsets } from 'react-native-safe-area-context';

export const useDimensions = () => {
  const { top, left, bottom, right } = useSafeAreaInsets();
  const { width, height } = useSafeAreaFrame();

  const windowWidth = width - left - right;
  const windowHeight = height - top - bottom;

  return { windowWidth, windowHeight };
};
