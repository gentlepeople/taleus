import { memo, useCallback } from 'react';
import { CustomCTA, spacing } from '~/mobile-ui';

type IMyPage_EditUserInfo_CTAViewProps = {
  onPress: () => void;
  disabled: boolean;
};

export const MyPage_EditUserInfo_CTAView = memo<IMyPage_EditUserInfo_CTAViewProps>(
  ({ onPress, disabled }) => {
    const handlePressCTA = useCallback(() => {
      onPress();
    }, [onPress]);

    return (
      <CustomCTA
        paddingX={spacing['4-x']}
        buttons={[
          {
            label: '저장',
            onPress: handlePressCTA,
            textColor: 'white-100',
            textType: 'button',
            disabled,
          },
        ]}
      />
    );
  },
);
