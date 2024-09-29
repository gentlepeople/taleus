import { CompositeNavigationProp, RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { FC } from 'react';
import { GestureDetector } from 'react-native-gesture-handler';

import { LoadingSpinner, SlideViewOrganism, Stack, spacing } from '~/mobile-ui';

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
  const {
    isFeedDataLoading,
    currentAnswer,
    currentQuestion,
    submittedDate,
    nickname,
    partnerNickname,
    newContent,
    isEdit,
    isCTADisabled,
    direction,
    animationKeyIndex,
    panGesture,
    progress,
    startEdit,
    pressCTA,
    setNewContent,
  } = useFeed_DetailController();

  if (isFeedDataLoading) {
    return <LoadingSpinner />;
  }

  const renderContent = () => {
    return (
      <Stack space={spacing['2-x']}>
        <GestureDetector gesture={panGesture}>
          <SlideViewOrganism animationKeyIndex={animationKeyIndex} animationDirection={direction}>
            <Stack
              align="center"
              space={spacing['4-x']}
              paddingTop={spacing['3-x']}
              paddingBottom={spacing['6-x']}
            >
              <Feed_Detail_QuestionView question={currentQuestion} />
              <Stack space={spacing['6-x']} paddingX={spacing['4-x']}>
                <Feed_Detail_PartnerAnswerView
                  partnerName={partnerNickname}
                  partnerAnswer={currentAnswer.partnerAnswer}
                />
                <Feed_Detail_UserAnswerView
                  userName={nickname}
                  userAnswer={currentAnswer.userAnswer}
                  newContent={newContent}
                  isEdit={isEdit}
                  onEditStart={startEdit}
                  onChangeText={setNewContent}
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
      header={<Feed_Detail_HeaderView title={submittedDate} />}
      content={renderContent()}
      footer={
        <Feed_Detail_CTAView onPressCTA={pressCTA} isEdit={isEdit} isCTADisabled={isCTADisabled} />
      }
    />
  );
};
