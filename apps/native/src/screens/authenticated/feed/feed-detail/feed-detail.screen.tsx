import { CompositeNavigationProp, RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { FC } from 'react';
import { GestureDetector } from 'react-native-gesture-handler';

import { SlideViewOrganism, Stack, spacing } from '~/mobile-ui';

import { FeedStackNavigationProp, FeedStackParamList } from '..';

import { useFeed_DetailController } from './controller';
import { Feed_DetailLayout } from './feed-detail.layout';
import {
  Feed_Detail_CTAView,
  Feed_Detail_HeaderView,
  Feed_Detail_PartnerAnswerView,
  Feed_Detail_ProgressView,
  Feed_Detail_QuestionView,
  Feed_Detail_UserAnswerView,
} from './views';

export type Feed_DetailScreenNavigationProp = CompositeNavigationProp<
  StackNavigationProp<FeedStackParamList, 'Feed_DetailScreen'>,
  FeedStackNavigationProp
>;

export type Feed_DetailScreenRouteProp = RouteProp<FeedStackParamList, 'Feed_DetailScreen'>;

export type IFeed_DetailScreenProps = {
  navigation: Feed_DetailScreenNavigationProp;
  route: Feed_DetailScreenRouteProp;
};

export const Feed_DetailScreen: FC<IFeed_DetailScreenProps> = () => {
  const { direction, animationKeyIndex, panGesture, progress } = useFeed_DetailController();

  const data = [
    {
      question: '첫번째 질문',
      partnerAnswer:
        '바보야 우영기 정말 바보야 바보야 우영기 정말 바보야 바보야 우영기 정말 바보야 바보야 우영기 정말 바보야 바보야 우영기 정말 바보야 바보야 우영기 정말 바보야 바보야 우영기 정말 바보야 바보야 우영기 정말',
      userAnswer: '가나다라마바사 아자차카 타파하',
    },
    {
      question: '두번째 질문',
      partnerAnswer: '가나다라마바사 아자차카 타파하',
      userAnswer:
        '바보야 우영기 정말 바보야 바보야 우영기 정말 바보야 바보야 우영기 정말 바보야 바보야 우영기 정말 바보야 바보야 우영기 정말 바보야 바보야 우영기 정말 바보야 바보야 우영기 정말 바보야 바보야 우영기 정말',
    },
    {
      question: '세번째 질문',
      partnerAnswer: '가지마 바보야~ 난 정말 괜찮아',
      userAnswer: '서울시 은평구 역촌동 ㅋ',
    },
  ];

  const currentData = data[progress - 1];

  const renderContent = () => {
    return (
      <Stack space={spacing['2-x']}>
        <GestureDetector gesture={panGesture}>
          <SlideViewOrganism animationKeyIndex={animationKeyIndex} animationDirection={direction}>
            <Stack align="center" space={spacing['4-x']} paddingBottom={spacing['6-x']}>
              <Feed_Detail_QuestionView question={currentData.question} />
              <Stack space={spacing['6-x']} paddingX={spacing['4-x']}>
                <Feed_Detail_PartnerAnswerView
                  partnerName="영기"
                  partnerAnswer={currentData.partnerAnswer}
                />
                <Feed_Detail_UserAnswerView
                  userName="바나나"
                  userAnswer={currentData.userAnswer}
                  onEdit={() => {}}
                />
              </Stack>
            </Stack>
          </SlideViewOrganism>
        </GestureDetector>
        <Feed_Detail_ProgressView progress={progress} />
      </Stack>
    );
  };

  return (
    <Feed_DetailLayout
      header={<Feed_Detail_HeaderView title="여기에 제출 일자 받아와서 넘겨주자" />}
      content={renderContent()}
      footer={<Feed_Detail_CTAView onPressCTA={() => {}} isEditable={false} />}
    />
  );
};
