import { useNavigation } from '@react-navigation/native';
import { useCallback } from 'react';

import { Primary_FeedScreenNavigationProp } from '../../../primary-feed.screen';

type IPrimary_FeedNaviagtionInput = void;
type IPrimary_FeedNavigationOutput = {
  goFeedDetail: (id: number) => void;
};

export const usePrimary_FeedNavigation: Hook<
  IPrimary_FeedNaviagtionInput,
  IPrimary_FeedNavigationOutput
> = () => {
  const navigation = useNavigation<Primary_FeedScreenNavigationProp>();

  const goFeedDetail = useCallback(
    (id: number) => {
      navigation.navigate('FeedStack', {
        screen: 'Feed_DetailScreen',
        params: { id },
      });
    },
    [navigation],
  );

  return { goFeedDetail };
};
