import { memo } from 'react';
import { Platform } from 'react-native';

import {
  APPLE_LOGO_IMAGE,
  CustomCTA,
  GOOGLE_LOGO_IMAGE,
  ICustomCTA,
  KAKAO_LOGO_IMAGE,
} from '~/mobile-ui';

type IAuthentication_Landing_CTAViewProps = {
  onPressKakao: () => Promise<void>;
  onPressGoogle: () => Promise<void>;
  onPressApple: () => Promise<void>;
  onPressBrowse: () => void;
};

export const Authentication_Landing_CTAView = memo<IAuthentication_Landing_CTAViewProps>(
  ({ onPressKakao, onPressGoogle, onPressApple, onPressBrowse }) => {
    const isIOS = Platform.OS === 'ios';

    const buttons = [
      {
        label: '카카오로 시작하기',
        onPress: onPressKakao,
        color: 'kakao-bg',
        imageSource: KAKAO_LOGO_IMAGE,
      },
      {
        label: '구글로 시작하기',
        onPress: onPressGoogle,
        color: 'white-100',
        imageSource: GOOGLE_LOGO_IMAGE,
        border: true,
      },
      {
        label: '둘러보기',
        color: 'gray-20',
        onPress: onPressBrowse,
      },
    ] as ICustomCTA[];

    if (isIOS) {
      buttons.splice(1, 0, {
        label: 'Apple로 시작하기',
        onPress: onPressApple,
        color: 'black-100',
        textColor: 'white-100',
        imageSource: APPLE_LOGO_IMAGE,
      });
    }

    return <CustomCTA buttons={buttons} />;
  },
);
