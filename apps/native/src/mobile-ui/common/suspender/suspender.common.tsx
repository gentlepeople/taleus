import { FC, useEffect, useMemo, useRef } from 'react';

export type ISuspenderProps = {};

export const Suspender: FC<ISuspenderProps> = () => {
  const resolve = useRef<() => void>();
  const promise = useMemo(
    () =>
      new Promise<void>((res) => {
        resolve.current = res;
      }),
    []
  );

  useEffect(() => {
    return () => {
      resolve.current?.();
    };
  });

  throw promise;
};
