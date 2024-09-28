import { useKeyboard } from '@react-native-community/hooks';
import { ReactNode, createContext, useEffect, useState } from 'react';
import { Keyboard } from 'react-native';
import { useDidUpdate } from 'rooks';

import { MutationIndicator } from '../../mobile-ui/components/layouts/mutation-indicator';

export type IMutationIndicator = {
  setDependencyArray: Function;
};

export type IMutationIndicatorProviderProps = {
  children: ReactNode;
};

export const MutationIndicatorContext = createContext<IMutationIndicator | null>(null);

export const MutationIndicatorProvider = ({ children }: IMutationIndicatorProviderProps) => {
  const [isMutating, setIsMutating] = useState<boolean>(false);
  const [dependencyArray, setDependencyArray] = useState<boolean[]>([false]);
  const { keyboardShown } = useKeyboard();

  useEffect(() => {
    const isTrue = (value: boolean) => value;
    const isOneOfDependencyTrue = dependencyArray.some(isTrue);
    setIsMutating(isOneOfDependencyTrue);
  }, [dependencyArray]);

  useDidUpdate(() => {
    if (isMutating && keyboardShown) {
      Keyboard.dismiss();
    }
  }, [isMutating]);

  return (
    <MutationIndicatorContext.Provider value={{ setDependencyArray }}>
      {isMutating && <MutationIndicator />}
      {children}
    </MutationIndicatorContext.Provider>
  );
};
