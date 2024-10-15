import { NetworkStatus } from '@apollo/client';
import { usePrimary_FeedListDataQuery } from '@gentlepeople/taleus-codegen';
import dayjs from 'dayjs';
import { useAuth } from '~/providers';
import { FEED_LIST_QUERY_LIMIT, FEED_LIST_QUERY_OFFSET } from '../../../primary-feed.const';
import { IFeedList } from '../../../primary-feed.type';

type IPrimary_FeedListDataInput = void;
type IPrimary_FeedListDataOutput = {
  isInitialLoading: boolean;
  isLoadingMore: boolean;
  refetchList: () => Promise<void>;
  fetchMoreList: () => Promise<void>;
  listData: IFeedList;
};

export const usePrimary_FeedListData: Hook<
  IPrimary_FeedListDataInput,
  IPrimary_FeedListDataOutput
> = () => {
  const { currentUser } = useAuth();

  const { data, fetchMore, refetch, networkStatus } = usePrimary_FeedListDataQuery({
    notifyOnNetworkStatusChange: true,
    variables: {
      userId: currentUser ? currentUser.id : '',
      take: FEED_LIST_QUERY_LIMIT,
      skip: FEED_LIST_QUERY_OFFSET,
    },
  });

  const refetchList = async () => {
    await refetch({
      skip: 0,
    });
  };

  const fetchMoreList = async () => {
    if (isFullyLoaded) {
      return;
    }

    await fetchMore({
      variables: {
        skip: feedLength,
      },
    });
  };

  const feedData = data?.completedCoupleMissions?.data;
  const feedLength = feedData && feedData.length;
  const feedTotalCount = data?.completedCoupleMissions.totalCount;
  const isFullyLoaded = feedLength === feedTotalCount;

  const listData = data?.completedCoupleMissions.data?.map(({ mission, coupleMission, data }) => {
    const { coupleMissionId } = coupleMission && coupleMission;
    const { category, missionId } = mission && mission;

    const answers = data?.map(({ question, partnerResponse, userResponse }) => {
      const { content: questionTitle, questionId, questionOrder } = question;
      const { content: partnerAnswer } = partnerResponse;
      const { content: userAnswer } = userResponse;

      return {
        questionId,
        questionOrder,
        questionTitle,
        partnerAnswer,
        userAnswer,
      };
    });

    const userCreatedAt = data?.[0].userResponse.createdAt;
    const partnerCreatedAt = data?.[0].partnerResponse.createdAt;

    const recentDate = dayjs(partnerCreatedAt).isAfter(dayjs(userCreatedAt))
      ? partnerCreatedAt
      : userCreatedAt;
    const formattedDate = dayjs(recentDate).format('YYYY/MM/DD');

    return {
      missionId,
      coupleMissionId,
      category,
      answers,
      formattedDate,
    };
  }) as IFeedList;

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
    listData,
  };
};
