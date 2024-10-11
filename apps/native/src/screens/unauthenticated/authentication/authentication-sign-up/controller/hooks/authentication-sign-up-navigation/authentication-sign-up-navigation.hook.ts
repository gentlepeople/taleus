import { useNavigation } from '@react-navigation/native';
import { useCallback } from 'react';

import { Authentication_SignUpScreenNavigationProp } from '../../../authentication-sign-up.screen';

type IAuthentication_SignUpNavigationInput = void;
type IAuthentication_SignUpNavigationOutput = {
  goHome: () => void;
  goPolicyWebView: () => void;
  goTermsWebView: () => void;
};

export const useAuthentication_SignUpNavigation: Hook<
  IAuthentication_SignUpNavigationInput,
  IAuthentication_SignUpNavigationOutput
> = () => {
  const navigation = useNavigation<Authentication_SignUpScreenNavigationProp>();

  const goHome = useCallback(() => {
    navigation.replace('AuthenticatedStack', {
      screen: 'PrimaryStack',
      params: {
        screen: 'Primary_HomeScreen',
      },
    });
  }, [navigation]);

  const goPolicyWebView = useCallback(() => {
    navigation.navigate('CommonStack', {
      screen: 'WebViewScreen',
      params: {
        title: '개인정보 수집 및 이용 동의',
        linkUrl: 'https://www.notion.so/kyewmw/TaleUs-11068bc12aea80c7ac3ddb9450170323',
      },
    });
  }, [navigation]);

  const goTermsWebView = useCallback(() => {
    navigation.navigate('CommonStack', {
      screen: 'WebViewScreen',
      params: {
        title: '서비스 이용약관 동의',
        linkUrl: 'https://www.notion.so/kyewmw/TaleUs-11068bc12aea80288ff4e6189d366e9e',
      },
    });
  }, [navigation]);

  return { goHome, goPolicyWebView, goTermsWebView };
};
