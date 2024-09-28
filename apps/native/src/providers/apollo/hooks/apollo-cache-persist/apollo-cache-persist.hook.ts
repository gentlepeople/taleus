import { NormalizedCacheObject } from '@apollo/client';
import { CachePersistor } from 'apollo3-cache-persist';
import { useCallback, useState } from 'react';

export const useApolloCachePersist = () => {
  const [persistor, setPersistor] = useState<CachePersistor<NormalizedCacheObject>>();

  const clearCache = useCallback(() => {
    if (!persistor) {
      return;
    }
    persistor.purge();
  }, [persistor]);

  return { clearCache };
};
