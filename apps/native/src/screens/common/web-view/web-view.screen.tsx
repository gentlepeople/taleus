import { CompositeNavigationProp, RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { FC } from 'react';
import WebView from 'react-native-webview';

import { BasicLayout, HeaderOrganism } from '~/mobile-ui';

import { CommonStackNavigationProp, CommonStackParamList } from '../common.stack';

export type WebViewScreenNavigationProp = CompositeNavigationProp<
  CommonStackNavigationProp,
  StackNavigationProp<CommonStackParamList, 'WebViewScreen'>
>;

export type WebViewScreenRouteProp = RouteProp<CommonStackParamList, 'WebViewScreen'>;

export type IWebViewScreenProps = {
  navigation: WebViewScreenNavigationProp;
  route: WebViewScreenRouteProp;
};

export const WebViewScreen: FC<IWebViewScreenProps> = ({ route }) => {
  const linkUrl = route.params.linkUrl;
  const title = route.params.title;

  return (
    <BasicLayout>
      <HeaderOrganism title={title} titleSize="small" left={{ type: 'button' }} />
      <WebView
        androidLayerType="software"
        startInLoadingState
        source={{ uri: linkUrl }}
        containerStyle={{ flex: 1 }}
      />
    </BasicLayout>
  );
};
