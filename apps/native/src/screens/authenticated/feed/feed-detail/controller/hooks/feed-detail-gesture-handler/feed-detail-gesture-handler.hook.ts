import { Gesture, PanGesture } from 'react-native-gesture-handler';
import { runOnJS, useSharedValue } from 'react-native-reanimated';

type IFeed_DetailGestureHandlerInput = {
  onLeftSwipe: () => void;
  onRightSwipe: () => void;
};
type IFeed_DetailGestureHandlerOutput = {
  panGesture: PanGesture;
};

export const useFeed_DetailGestureHandler: Hook<
  IFeed_DetailGestureHandlerInput,
  IFeed_DetailGestureHandlerOutput
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
