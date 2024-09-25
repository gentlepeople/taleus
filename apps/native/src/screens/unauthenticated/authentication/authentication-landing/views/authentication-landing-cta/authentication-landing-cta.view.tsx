import { memo } from 'react';
import { CustomCTA } from '~/mobile-ui';

type IAuthentication_Landing_CTAViewProps = {
  onPressKakao: () => void;
  onPressBrowse: () => void;
};

export const Authentication_Landing_CTAView = memo<IAuthentication_Landing_CTAViewProps>(
  ({ onPressKakao, onPressBrowse }) => {
    return (
      <CustomCTA
        buttons={[
          {
            label: '카카오로 시작하기',
            onPress: onPressKakao,
            color: 'kakao-bg',
            iconName: 'kakao_logo',
          },
          {
            label: '둘러보기',
            onPress: onPressBrowse,
          },
        ]}
      />
    );
  },
);
