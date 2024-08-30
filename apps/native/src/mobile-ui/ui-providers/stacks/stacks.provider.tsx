import { StacksProvider as NativeStacksProvider } from '@mobily/stacks';
import { ReactNode } from 'react';

type IStacksProviderProps = {
  children: ReactNode;
};

export const StacksProvider = ({ children }: IStacksProviderProps) => {
  return <NativeStacksProvider spacing={1}>{children}</NativeStacksProvider>;
};
