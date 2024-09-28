import { useCallback } from 'react';
import { EnumMMKVKeystoreString, useMMKV } from '~/providers';

type IPrimary_MyPageResetOnboardingAnswerInput = void;
type IPrimary_MyPageResetOnboardingAnswerOutput = {
  resetOnboardingAnswer: () => void;
};

export const usePrimary_MyPageResetOnboardingAnswer: Hook<
  IPrimary_MyPageResetOnboardingAnswerInput,
  IPrimary_MyPageResetOnboardingAnswerOutput
> = () => {
  const { keystore } = useMMKV();

  const resetOnboardingAnswer = useCallback(() => {
    keystore.set(EnumMMKVKeystoreString.ANSWER_BEFORE_SIGN_IN, '');
  }, [keystore]);

  return { resetOnboardingAnswer };
};
