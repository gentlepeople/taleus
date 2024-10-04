import { useAuth } from '~/providers';
import { IFeedList, ISelectRecordMixpanelEventParams } from '../primary-feed.type';
import {
  usePrimary_FeedListData,
  usePrimary_FeedMixpanel,
  usePrimary_FeedNavigation,
  usePrimary_FeedPreventOnboardingUser,
} from './hooks';

type IPrimary_FeedControllerInput = void;
type IPrimary_FeedControllerOutput = {
  isInitialLoading: boolean;
  isLoadingMore: boolean;
  listData: IFeedList;
  nickname: string;
  partnerNickname: string;
  refetchList: () => Promise<void>;
  fetchMoreList: () => Promise<void>;
  goFeedDetail: (id: number) => void;
  selectRecordMixpanelEvent: ({
    missionId,
    questionIds,
    questionOrders,
    category,
    formattedDate,
  }: ISelectRecordMixpanelEventParams) => void;
};

export const usePrimary_FeedController: Controller<
  IPrimary_FeedControllerInput,
  IPrimary_FeedControllerOutput
> = () => {
  const { currentUser } = useAuth();

  const { goFeedDetail } = usePrimary_FeedNavigation();
  const { isInitialLoading, isLoadingMore, listData, refetchList, fetchMoreList } =
    usePrimary_FeedListData();
  usePrimary_FeedPreventOnboardingUser();
  const { selectRecordMixpanelEvent } = usePrimary_FeedMixpanel();

  const nickname = currentUser && currentUser.nickname;
  const partnerNickname = currentUser && currentUser.partnerNickname;

  return {
    isInitialLoading,
    isLoadingMore,
    listData,
    nickname,
    partnerNickname,
    refetchList,
    fetchMoreList,
    goFeedDetail,
    selectRecordMixpanelEvent,
  };
};
