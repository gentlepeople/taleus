import { usePrimary_HomeOnboardingQuestionData } from './hooks';

type IPrimary_HomeControllerInput = void;
type IPrimary_HomeControllerOutput = {
  isLoading: boolean;
};

export const usePrimary_HomeController: Controller<
  IPrimary_HomeControllerInput,
  IPrimary_HomeControllerOutput
> = () => {
  const { isOnboardingQuestionLoading } = usePrimary_HomeOnboardingQuestionData();

  const isLoading = isOnboardingQuestionLoading;

  return { isLoading };
};
