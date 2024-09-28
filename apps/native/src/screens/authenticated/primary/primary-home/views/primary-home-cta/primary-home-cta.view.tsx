import { memo, useCallback } from 'react';

import { CustomCTA, radius, spacing } from '~/mobile-ui';

type IPrimary_Home_CTAViewProps = {
  isLastQuestion: boolean;
  isCTADisabled: boolean;
  onPressCTA: () => Promise<void>;
};

export const Primary_Home_CTAView = memo<IPrimary_Home_CTAViewProps>(
  ({ isLastQuestion, isCTADisabled, onPressCTA }) => {
    const buttonLabel = isLastQuestion ? '답변 제출하기' : '다음';

    const handlePressCTA = useCallback(async () => {
      await onPressCTA();
    }, [onPressCTA]);

    return (
      <CustomCTA
        paddingX={spacing['4-x']}
        borderRadius={radius['3.75-x']}
        buttons={[
          {
            label: buttonLabel,
            onPress: handlePressCTA,
            textColor: 'white-100',
            textType: 'button',
            disabled: isCTADisabled,
          },
        ]}
      />
    );
  },
);
