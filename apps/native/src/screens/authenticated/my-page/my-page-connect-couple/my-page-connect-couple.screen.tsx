import { CompositeNavigationProp, RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { FC } from 'react';

import { Box } from '~/mobile-ui';
import { MyPageStackNavigationProp, MyPageStackParamList } from '..';

import { MyPage_ConnectCoupleLayout } from './my-page-connect-couple.layout';

export type MyPage_ConnectCoupleScreenNavigationProp = CompositeNavigationProp<
  StackNavigationProp<MyPageStackParamList, 'MyPage_ConnectCoupleScreen'>,
  MyPageStackNavigationProp
>;

export type MyPage_ConnectCoupleScreenRouteProp = RouteProp<
  MyPageStackParamList,
  'MyPage_ConnectCoupleScreen'
>;

export type IMyPage_ConnectCoupleScreenProps = {
  navigation: MyPage_ConnectCoupleScreenNavigationProp;
  route: MyPage_ConnectCoupleScreenRouteProp;
};

export const MyPage_ConnectCoupleScreen: FC<IMyPage_ConnectCoupleScreenProps> = () => {
  const renderContent = () => {
    return <Box />;
  };

  return <MyPage_ConnectCoupleLayout content={renderContent()} footer={<Box />} />;
};
