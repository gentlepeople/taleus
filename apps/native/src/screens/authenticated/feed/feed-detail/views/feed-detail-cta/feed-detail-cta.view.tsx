import { memo, useCallback } from 'react';

import { CustomCTA, radius, spacing } from '~/mobile-ui';

type IFeed_Detail_CTAViewProps = {
  onPressCTA: () => Promise<void>;
  isEdit: boolean;
  isCTADisabled: boolean;
};

export const Feed_Detail_CTAView = memo<IFeed_Detail_CTAViewProps>(
  ({ onPressCTA, isEdit, isCTADisabled }) => {
    const buttonLabel = '수정 완료';

    const handlePressCTA = useCallback(async () => {
      await onPressCTA();
    }, [onPressCTA]);

    if (isEdit) {
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
    }

    return null;
  },
);
