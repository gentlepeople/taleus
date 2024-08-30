import { ReactNode, createContext, useContext, useEffect, useState } from 'react';

export type IScrollContext = {
  scrollEnabledState: boolean | null;
  updateScrollEnabledState: (scrollState: boolean) => void;
};

export type IScrollProviderProps = {
  children: ReactNode;
};

export const ScrollContext = createContext<IScrollContext>(null);

export const ScrollProvider = ({ children }: IScrollProviderProps) => {
  const [scrollEnabledState, setScrollEnabledState] = useState<boolean | null>(null);

  const updateScrollEnabledState = (scrollState: boolean) => setScrollEnabledState(scrollState);

  return (
    <ScrollContext.Provider
      value={{
        scrollEnabledState,
        updateScrollEnabledState,
      }}
    >
      {children}
    </ScrollContext.Provider>
  );
};

const useScrollContext = () => {
  const context = useContext(ScrollContext);
  if (!context) {
    throw new Error('useScroll must be used within a ScrollEnabledContext');
  }
  return context;
};

export const useScroll = () => {
  const { updateScrollEnabledState, scrollEnabledState } = useScrollContext();

  useEffect(() => {
    return () => updateScrollEnabledState(null);
  }, [updateScrollEnabledState]);

  const enableScroll = () => updateScrollEnabledState(true);
  const disableScroll = () => updateScrollEnabledState(false);

  return {
    scrollEnabledState,
    enableScroll,
    disableScroll,
  };
};
