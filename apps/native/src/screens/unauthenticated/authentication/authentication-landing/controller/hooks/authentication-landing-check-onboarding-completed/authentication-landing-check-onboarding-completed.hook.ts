import isUndefined from 'lodash/isUndefined';
import { EnumMMKVKeystoreString, useMMKV } from '~/providers';

type IAuthentication_LandingCheckOnboardingCompletedInput = void;
type IAuthentication_LandingCheckOnboardingCompletedOutput = {
  hasOnboardingData: boolean;
};

export const useAuthentication_LandingCheckOnboardingCompleted: Hook<
  IAuthentication_LandingCheckOnboardingCompletedInput,
  IAuthentication_LandingCheckOnboardingCompletedOutput
> = () => {
  const { keystore } = useMMKV();

  const onboardingData = keystore.getString(EnumMMKVKeystoreString.ANSWER_BEFORE_SIGN_IN);
  const hasOnboardingData = !isUndefined(onboardingData);

  return { hasOnboardingData };
};
