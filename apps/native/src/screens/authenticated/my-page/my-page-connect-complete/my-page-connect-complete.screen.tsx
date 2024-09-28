import { CompositeNavigationProp, RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { FC } from 'react';

import { MyPageStackNavigationProp, MyPageStackParamList } from '..';

import { useMyPage_ConnectCompleteController } from './controller';
import { MyPage_ConnectCompleteLayout } from './my-page-connect-complete.layout';
import { MyPage_ConnectComplete_ContentView, MyPage_ConnectComplete_HeaderView } from './views';

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
  const { goHome } = useMyPage_ConnectCompleteController();

  return (
    <MyPage_ConnectCompleteLayout
      header={<MyPage_ConnectComplete_HeaderView />}
      content={
        <MyPage_ConnectComplete_ContentView
          userName="내 닉네임"
          partnerName="연인 닉네임"
          onPressCTA={goHome}
        />
      }
    />
  );
};
