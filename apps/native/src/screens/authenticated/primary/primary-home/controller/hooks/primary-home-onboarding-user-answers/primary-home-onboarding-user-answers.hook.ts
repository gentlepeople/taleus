import isEmpty from 'lodash/isEmpty';
import isUndefined from 'lodash/isUndefined';
import { useCallback } from 'react';
import { EnumMMKVKeystoreString, useMMKV } from '~/providers';
import { IUserAnswers } from '../../../primary-home.type';

type IPrimary_HomeOnboardingUserAnswerInput = void;
type IPrimary_HomeOnboardingUserAnswerOutput = {
  savedOnboardingData: IUserAnswers;
  saveOnboardingUserAnswer: (answer: IUserAnswers) => void;
};

export const usePrimary_HomeOnboardingUserAnswer: Hook<
  IPrimary_HomeOnboardingUserAnswerInput,
  IPrimary_HomeOnboardingUserAnswerOutput
> = () => {
  const { keystore } = useMMKV();

  const onboardingData = keystore.getString(EnumMMKVKeystoreString.ANSWER_BEFORE_SIGN_IN);
  const hasOnboardingData = !isUndefined(onboardingData) && !isEmpty(onboardingData);
  const savedOnboardingData = hasOnboardingData && (JSON.parse(onboardingData) as IUserAnswers);

  const saveOnboardingUserAnswer = useCallback(
    (answers: IUserAnswers) => {
      const jsonAnswers = JSON.stringify(answers);

      keystore.set(EnumMMKVKeystoreString.ANSWER_BEFORE_SIGN_IN, jsonAnswers);
    },
    [keystore],
  );

  return { savedOnboardingData, saveOnboardingUserAnswer };
};
