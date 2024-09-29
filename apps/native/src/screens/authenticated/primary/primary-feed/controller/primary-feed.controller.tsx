import {
  usePrimary_FeedListData,
  usePrimary_FeedNavigation,
  usePrimary_FeedPreventOnboardingUser,
} from './hooks';

type IPrimary_FeedControllerInput = void;
type IPrimary_FeedControllerOutput = {
  isInitialLoading: boolean;
  isLoadingMore: boolean;
  refetchList: () => Promise<void>;
  fetchMoreList: () => Promise<void>;
  goFeedDetail: (id: number) => void;
};

export const usePrimary_FeedController: Controller<
  IPrimary_FeedControllerInput,
  IPrimary_FeedControllerOutput
> = () => {
  const { goFeedDetail } = usePrimary_FeedNavigation();
  const { isInitialLoading, isLoadingMore, refetchList, fetchMoreList } = usePrimary_FeedListData();
  usePrimary_FeedPreventOnboardingUser();

  return { isInitialLoading, isLoadingMore, refetchList, fetchMoreList, goFeedDetail };
};
