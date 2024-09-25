import { useState } from 'react';
import { PanGesture } from 'react-native-gesture-handler';

import { EDirection } from '~/mobile-ui';

import { useFeed_DetailAnimationKey, useFeed_DetailGestureHandler } from './hooks';

type IFeed_DetailControllerInput = void;
type IFeed_DetailControllerOutput = {
  direction: EDirection;
  animationKeyIndex: string;
  panGesture: PanGesture;
  progress: number;
};

export const useFeed_DetailController: Controller<
  IFeed_DetailControllerInput,
  IFeed_DetailControllerOutput
> = () => {
  const [progress, setProgress] = useState<number>(1);

  const { direction, animationKeyIndex, nextQuestionAnimation, prevQuestionAnimation } =
    useFeed_DetailAnimationKey();
  const { panGesture } = useFeed_DetailGestureHandler({
    onLeftSwipe: () => {
      if (progress === 3) {
        return;
      }

      nextQuestionAnimation();
      setProgress((prev) => prev + 1);
    },
    onRightSwipe: () => {
      if (progress === 1) {
        return;
      }

      prevQuestionAnimation();
      setProgress((prev) => prev - 1);
    },
  });

  return { direction, animationKeyIndex, panGesture, progress };
};
