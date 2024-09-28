import { CompositeNavigationProp, RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { FC } from 'react';

import { LoadingSpinner, ScrollView, palette } from '~/mobile-ui';

import { PrimaryStackNavigationProp, PrimaryStackParamList } from '..';

import { usePrimary_HomeController } from './controller';
import { Primary_HomeLayout } from './primary-home.layout';
import {
  Primary_Home_BannerView,
  Primary_Home_CTAView,
  Primary_Home_ContentAreaView,
  Primary_Home_QuestionAreaView,
} from './views';

export type Primary_HomeScreenNavigationProp = CompositeNavigationProp<
  StackNavigationProp<PrimaryStackParamList, 'Primary_HomeScreen'>,
  PrimaryStackNavigationProp
>;

export type Primary_HomeScreenRouteProp = RouteProp<PrimaryStackParamList, 'Primary_HomeScreen'>;

export type IPrimary_HomeScreenProps = {
  navigation: Primary_HomeScreenNavigationProp;
  route: Primary_HomeScreenRouteProp;
};

export const Primary_HomeScreen: FC<IPrimary_HomeScreenProps> = () => {
  const { isLoading } = usePrimary_HomeController();

  if (isLoading) {
    return <LoadingSpinner />;
  }

  const renderContent = () => {
    return (
      <ScrollView style={{ backgroundColor: palette['white-100'] }}>
        <Primary_Home_BannerView
          onPressBannerButton={() => {
            // 여기서 커플 연결(마이페이지 네비) or 독촉 알림 보내기 기능 필요
          }}
          shouldConnect={true}
          hasNoMyReply={false}
          hasNoPartnerReply={false}
        />
        <Primary_Home_QuestionAreaView
          question={'처음 만나게 된 순간을 기억하시나요?\n그 때 어떤 기분이 들었나요?'}
          progress={1}
        />
        <Primary_Home_ContentAreaView
          isWritable={false}
          currentValue=""
          onChangeText={() => {}}
          progress={1}
          currentAnswer="안녕안녕안녕"
        />
      </ScrollView>
    );
  };

  const renderFooter = () => {
    return <Primary_Home_CTAView disabled isLastQuestion={false} onPressCTA={() => {}} />;
  };

  return <Primary_HomeLayout content={renderContent()} footer={renderFooter()} />;
};
