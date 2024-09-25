import { memo, useCallback } from 'react';
import { CustomCTA, radius, spacing } from '~/mobile-ui';

type IFeed_Detail_CTAViewProps = {
  onPressCTA: () => void;
  isEditable: boolean;
};

export const Feed_Detail_CTAView = memo<IFeed_Detail_CTAViewProps>(({ onPressCTA, isEditable }) => {
  const buttonLabel = '수정 완료';

  const handlePressCTA = useCallback(() => {
    onPressCTA();
  }, [onPressCTA]);

  if (isEditable) {
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
          },
        ]}
      />
    );
  }

  return null;
});
