import { usePrimary_FeedNavigation, usePrimary_FeedPreventOnboardingUser } from './hooks';

type IPrimary_FeedControllerInput = void;
type IPrimary_FeedControllerOutput = {
  goFeedDetail: (id: number) => void;
};

export const usePrimary_FeedController: Controller<
  IPrimary_FeedControllerInput,
  IPrimary_FeedControllerOutput
> = () => {
  const { goFeedDetail } = usePrimary_FeedNavigation();
  usePrimary_FeedPreventOnboardingUser();

  return { goFeedDetail };
};
