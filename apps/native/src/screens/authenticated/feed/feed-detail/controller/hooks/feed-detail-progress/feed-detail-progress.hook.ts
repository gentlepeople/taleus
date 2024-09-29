import { useCallback, useState } from 'react';
import { INITIAL_PROGRESS } from '../../../feed-detail.const';

type IFeed_DetailProgressInput = void;
type IFeed_DetailProgressOutput = {
  progress: number;
  incrementProgress: () => void;
  decrementProgress: () => void;
};

export const useFeed_DetailProgress: Hook<
  IFeed_DetailProgressInput,
  IFeed_DetailProgressOutput
> = () => {
  const [progress, setProgress] = useState<number>(INITIAL_PROGRESS);

  const incrementProgress = useCallback(() => {
    setProgress((prev) => prev + 1);
  }, [progress, setProgress]);

  const decrementProgress = useCallback(() => {
    setProgress((prev) => prev - 1);
  }, [progress, setProgress]);

  return { progress, incrementProgress, decrementProgress };
};
