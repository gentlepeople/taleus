import { CompositeNavigationProp, RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { FC } from 'react';

import { Box } from '~/mobile-ui';
import { MyPageStackNavigationProp, MyPageStackParamList } from '..';

export type MyPage_ConnectCompleteScreenNavigationProp = CompositeNavigationProp<
  StackNavigationProp<MyPageStackParamList, 'MyPage_ConnectCompleteScreen'>,
  MyPageStackNavigationProp
>;

export type MyPage_ConnectCompleteScreenRouteProp = RouteProp<
  MyPageStackParamList,
  'MyPage_ConnectCompleteScreen'
>;

export type IMyPage_ConnectCompleteScreenProps = {
  navigation: MyPage_ConnectCompleteScreenNavigationProp;
  route: MyPage_ConnectCompleteScreenRouteProp;
};

export const MyPage_ConnectCompleteScreen: FC<IMyPage_ConnectCompleteScreenProps> = () => {
  return <Box />;
};
