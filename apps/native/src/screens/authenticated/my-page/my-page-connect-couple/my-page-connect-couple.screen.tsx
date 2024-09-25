import { CompositeNavigationProp, RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { FC } from 'react';

import { Stack, spacing } from '~/mobile-ui';
import { MyPageStackNavigationProp, MyPageStackParamList } from '..';

import { useMyPage_ConnectCoupleController } from './controller';
import { MyPage_ConnectCoupleLayout } from './my-page-connect-couple.layout';
import {
  MyPage_ConnectCouple_HeaderView,
  MyPage_ConnectCouple_InputCodeView,
  MyPage_ConnectCouple_MyCodeView,
} from './views';

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
  const { copyUserCode, connect } = useMyPage_ConnectCoupleController();

  const renderContent = () => {
    return (
      <Stack space={spacing['4-x']}>
        <MyPage_ConnectCouple_MyCodeView
          userCode="XV821D"
          onPressCopy={copyUserCode}
          onPressShare={() => {}}
        />
        <MyPage_ConnectCouple_InputCodeView onPressConnect={connect} disabled={false} />
      </Stack>
    );
  };

  return (
    <MyPage_ConnectCoupleLayout
      header={<MyPage_ConnectCouple_HeaderView />}
      content={renderContent()}
    />
  );
};
