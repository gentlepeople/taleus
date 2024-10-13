import { CompositeNavigationProp, RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { FC } from 'react';

import { LoadingSpinner, ScrollView, SlideViewOrganism, palette } from '~/mobile-ui';

import { PrimaryStackNavigationProp, PrimaryStackParamList } from '..';

import { GestureDetector } from 'react-native-gesture-handler';
import { useDidMount } from 'rooks';
import { useAdMob } from '../../../../providers';
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
  const { showRewardedInterstitialAd } = useAdMob();

  const {
    isLoading,
    isWritable,
    progress,
    question,
    currentValue,
    currentUserAnswer,
    currentPartnerAnswer,
    nickname,
    partnerNickname,
    isCTADisabled,
    isLastQuestion,
    direction,
    animationKeyIndex,
    panGesture,
    showBanner,
    shouldConnect,
    hasNoMyReply,
    hasNoPartnerReply,
    showPartnerAnswer,
    setAnswer,
    pressCTA,
    pressBannerButton,
  } = usePrimary_HomeController();

  useDidMount(() => {
    showRewardedInterstitialAd();
  });

  if (isLoading) {
    return <LoadingSpinner />;
  }

  const renderContent = () => {
    return (
      <>
        {showBanner && (
          <Primary_Home_BannerView
            nickname={nickname}
            partnerNickname={partnerNickname}
            onPressBannerButton={pressBannerButton}
            shouldConnect={shouldConnect}
            hasNoMyReply={hasNoMyReply}
            hasNoPartnerReply={hasNoPartnerReply}
          />
        )}
        <GestureDetector gesture={panGesture}>
          {/* TODO:민기 이거 ScrollView로 처리 가능할지 연구해보기 */}
          <SlideViewOrganism animationKeyIndex={animationKeyIndex} animationDirection={direction}>
            <ScrollView style={{ backgroundColor: palette['white-100'] }}>
              <Primary_Home_QuestionAreaView question={question} progress={progress} />
              <Primary_Home_ContentAreaView
                isWritable={isWritable}
                showPartnerAnswer={showPartnerAnswer}
                currentValue={currentValue}
                onChangeText={setAnswer}
                progress={progress}
                currentAnswer={currentUserAnswer}
                partnerNickname={partnerNickname}
                currentPartnerAnswer={currentPartnerAnswer}
              />
            </ScrollView>
          </SlideViewOrganism>
        </GestureDetector>
      </>
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
