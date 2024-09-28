import { useCallback, useState } from 'react';

import { EDirection } from '~/mobile-ui';

type IPrimary_HomeAnimationKeyInput = void;
type IPrimary_HomeAnimationKeyOutput = {
  animationKeyIndex: string;
  direction: EDirection;
  nextQuestionAnimation: () => void;
  prevQuestionAnimation: () => void;
};

export const usePrimary_HomeAnimationKey: Hook<
  IPrimary_HomeAnimationKeyInput,
  IPrimary_HomeAnimationKeyOutput
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
