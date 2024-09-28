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
  const {
    isLoading,
    isWritable,
    progress,
    question,
    questionId,
    currentValue,
    currentUserAnswer,
    isCTADisabled,
    isLastQuestion,
    setAnswer,
    pressCTA,
  } = usePrimary_HomeController();

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
        <Primary_Home_QuestionAreaView question={question} progress={progress} />
        <Primary_Home_ContentAreaView
          isWritable={isWritable}
          currentValue={currentValue}
          onChangeText={setAnswer}
          progress={progress}
          currentAnswer={currentUserAnswer}
        />
      </ScrollView>
    );
  };

  const renderFooter = () => {
    return (
      isWritable && (
        <Primary_Home_CTAView
          isCTADisabled={isCTADisabled}
          isLastQuestion={isLastQuestion}
          onPressCTA={pressCTA}
        />
      )
    );
  };

  return <Primary_HomeLayout content={renderContent()} footer={renderFooter()} />;
};
