import { useCallback, useState } from 'react';

import { EDirection } from '~/mobile-ui';

type IFeed_DetailAnimationKeyInput = void;
type IFeed_DetailAnimationKeyOutput = {
  animationKeyIndex: string;
  direction: EDirection;
  nextQuestionAnimation: () => void;
  prevQuestionAnimation: () => void;
};

export const useFeed_DetailAnimationKey: Hook<
  IFeed_DetailAnimationKeyInput,
  IFeed_DetailAnimationKeyOutput
> = () => {
  const [{ index, direction }, setState] = useState<{ index: number; direction: EDirection }>({
    index: 0,
    direction: EDirection.INITIAL,
  });

  const nextQuestionAnimation = useCallback(() => {
    setState(({ index }) => {
      return { index: index + EDirection.RIGHT, direction: EDirection.RIGHT };
    });
  }, []);

  const prevQuestionAnimation = useCallback(() => {
    setState(({ index }) => {
      return { index: index + EDirection.LEFT, direction: EDirection.LEFT };
    });
  }, []);

  return {
    direction,
    animationKeyIndex: String(index),
    nextQuestionAnimation,
    prevQuestionAnimation,
  };
};
