import { useFocusEffect } from '@react-navigation/native';
import { useCallback, useContext } from 'react';

import { MutationIndicatorContext } from '~/providers';

const useMutationIndicatorContext = () => {
  const context = useContext(MutationIndicatorContext);
  if (!context) {
    throw new Error('useLoadingModal must be used within a LoadingModalProvider');
  }
  return context;
};

export const useMutationIndicator = (dependencyArray: Array<boolean>) => {
  const { setDependencyArray } = useMutationIndicatorContext();

  useFocusEffect(
    useCallback(() => {
      setDependencyArray(dependencyArray);
      return () => setDependencyArray([false]);
    }, [JSON.stringify(dependencyArray)]),
  );
};
