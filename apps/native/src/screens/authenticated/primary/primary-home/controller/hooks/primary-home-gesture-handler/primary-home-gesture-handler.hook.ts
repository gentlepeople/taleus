import { Gesture, PanGesture } from 'react-native-gesture-handler';
import { runOnJS, useSharedValue } from 'react-native-reanimated';

type IPrimary_HomeGestureHandlerInput = {
  onLeftSwipe: () => void;
  onRightSwipe: () => void;
};
type IPrimary_HomeGestureHandlerOutput = {
  panGesture: PanGesture;
};

export const usePrimary_HomeGestureHandler: Hook<
  IPrimary_HomeGestureHandlerInput,
  IPrimary_HomeGestureHandlerOutput
> = ({ onLeftSwipe, onRightSwipe }) => {
  const translateX = useSharedValue<number>(0);

  const panGesture = Gesture.Pan()
    .onUpdate((e) => {
      translateX.value = e.translationX;
    })
    .onEnd(() => {
      if (translateX.value < -20) {
        runOnJS(onLeftSwipe)();
      } else if (translateX.value > 20) {
        runOnJS(onRightSwipe)();
      }

      translateX.value = 0;
    });

  return { panGesture };
};
