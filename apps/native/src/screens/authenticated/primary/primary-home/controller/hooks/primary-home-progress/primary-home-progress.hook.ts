import { useCallback, useState } from 'react';
import { INITIAL_PROGRESS, LAST_PROGRESS } from '../../../primary-home.const';

type IPrimary_HomeProgressInput = void;
type IPrimary_HomeProgressOutput = {
  progress: number;
  incrementProgress: () => void;
  resetProgress: () => void;
};

export const usePrimary_HomeProgress: Hook<
  IPrimary_HomeProgressInput,
  IPrimary_HomeProgressOutput
> = () => {
  const [progress, setProgress] = useState<number>(INITIAL_PROGRESS);

  const incrementProgress = useCallback(() => {
    if (progress === LAST_PROGRESS) {
      return;
    }

    setProgress((prevProgress) => prevProgress + 1);
  }, [progress, setProgress]);

  const resetProgress = useCallback(() => {
    setProgress(INITIAL_PROGRESS);
  }, [setProgress]);

  return { progress, incrementProgress, resetProgress };
};
