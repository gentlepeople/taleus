import { NetworkStatus } from '@apollo/client';
import { usePrimary_FeedListDataQuery } from '@gentlepeople/taleus-codegen';
import { useAuth } from '~/providers';
import { FEED_LIST_QUERY_LIMIT, FEED_LIST_QUERY_OFFSET } from '../../../primary-feed.const';

type IPrimary_FeedListDataInput = void;
type IPrimary_FeedListDataOutput = {
  isInitialLoading: boolean;
  isLoadingMore: boolean;
  refetchList: () => Promise<void>;
  fetchMoreList: () => Promise<void>;
};

export const usePrimary_FeedListData: Hook<
  IPrimary_FeedListDataInput,
  IPrimary_FeedListDataOutput
> = () => {
  const { currentUser } = useAuth();

  const { data, fetchMore, refetch, networkStatus } = usePrimary_FeedListDataQuery({
    notifyOnNetworkStatusChange: true,
    variables: {
      userId: currentUser && currentUser.id,
      take: FEED_LIST_QUERY_LIMIT, // limit
      skip: FEED_LIST_QUERY_OFFSET, // offset
    },
  });

  const refetchList = async () => {
    await refetch({
      skip: 0,
    });
  };

  const fetchMoreList = async () => {
    // if (isFullyLoaded) {
    //   return;
    // }

    await fetchMore({
      variables: {
        skip: feedLength,
      },
    });
  };

  const feedLength = data?.completedCoupleMissions?.data.length;
  //   const feedTotalCount = data?.missionLog.totalCount;
  //   const isFullyLoaded = feedLength === feedTotalCount;

  const isInitialLoading = networkStatus === NetworkStatus.loading && !data;
  const isLoadingMore =
    networkStatus === NetworkStatus.fetchMore ||
    networkStatus === NetworkStatus.setVariables ||
    networkStatus === NetworkStatus.refetch;

  return {
    isInitialLoading,
    isLoadingMore,
    refetchList,
    fetchMoreList,
  };
};
