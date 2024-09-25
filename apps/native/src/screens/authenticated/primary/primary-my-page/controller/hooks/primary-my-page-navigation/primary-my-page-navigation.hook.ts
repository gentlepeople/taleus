import { useNavigation } from '@react-navigation/native';
import { useCallback } from 'react';

import { Primary_MyPageScreenNavigationProp } from '../../../primary-my-page.screen';
import { IWebViewParams } from '../../../primary-my-page.type';

type IPrimary_MyPageNavigationInput = void;
type IPrimary_MyPageNavigationOutput = {
  goWebView: ({ title, uri }: IWebViewParams) => void;
  goEditUserInfo: () => void;
  goConnectCouple: () => void;
  goPushNotification: () => void;
  goLanding: () => void;
};

export const usePrimary_MyPageNavigation: Hook<
  IPrimary_MyPageNavigationInput,
  IPrimary_MyPageNavigationOutput
> = () => {
  const navigation = useNavigation<Primary_MyPageScreenNavigationProp>();

  const goWebView = useCallback(
    ({ title, uri }: IWebViewParams) => {
      navigation.navigate('CommonStack', {
        screen: 'WebViewScreen',
        params: {
          title,
          linkUrl: uri,
        },
      });
    },
    [navigation],
  );

  const goEditUserInfo = useCallback(() => {
    navigation.navigate('MyPageStack', {
      screen: 'MyPage_EditUserInfoScreen',
    });
  }, [navigation]);

  const goConnectCouple = useCallback(() => {
    navigation.navigate('MyPageStack', {
      screen: 'MyPage_ConnectCoupleScreen',
    });
  }, [navigation]);

  const goPushNotification = useCallback(() => {
    navigation.navigate('MyPageStack', {
      screen: 'MyPage_PushNotificationScreen',
    });
  }, [navigation]);

  const goLanding = useCallback(() => {
    navigation.navigate('UnauthenticatedStack', {
      screen: 'AuthenticationStack',
      params: {
        screen: 'Authentication_LandingScreen',
      },
    });
  }, [navigation]);

  return { goWebView, goEditUserInfo, goConnectCouple, goPushNotification, goLanding };
};
