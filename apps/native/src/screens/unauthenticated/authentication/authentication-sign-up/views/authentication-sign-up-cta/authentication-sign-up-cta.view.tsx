import { memo, useCallback } from 'react';
import { CustomCTA, spacing } from '~/mobile-ui';

type IAuthentication_SignUp_CTAViewProps = {
  onPress: () => void;
};

export const Authentication_SignUp_CTAView = memo<IAuthentication_SignUp_CTAViewProps>(
  ({ onPress }) => {
    const handlePressCTA = useCallback(() => {
      onPress();
    }, [onPress]);

    return (
      <CustomCTA
        paddingX={spacing['4-x']}
        buttons={[
          {
            label: '테일어스 시작하기',
            onPress: handlePressCTA,
            textColor: 'white-100',
            textType: 'button',
          },
        ]}
      />
    );
  },
);
