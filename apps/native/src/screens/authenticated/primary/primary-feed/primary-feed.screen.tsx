import { CompositeNavigationProp, RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { FlashList, FlashListProps } from '@shopify/flash-list';
import { FC } from 'react';
import { RefreshControl } from 'react-native';
import { ValueOf } from 'type-fest';

import { Box, LoadingSpinner, palette, size, spacing } from '~/mobile-ui';

import { PrimaryStackNavigationProp, PrimaryStackParamList } from '..';

import { usePrimary_FeedController } from './controller';
import { Primary_FeedLayout } from './primary-feed.layout';
import { IFeed } from './primary-feed.type';
import {
  Primary_Feed_ContentCardView,
  Primary_Feed_ContentEmptyView,
  Primary_Feed_ListFooterSkeletonView,
} from './views';

export type Primary_FeedScreenNavigationProp = CompositeNavigationProp<
  StackNavigationProp<PrimaryStackParamList, 'Primary_FeedScreen'>,
  PrimaryStackNavigationProp
>;

export type Primary_FeedScreenRouteProp = RouteProp<PrimaryStackParamList, 'Primary_FeedScreen'>;

export type IPrimary_FeedScreenProps = {
  navigation: Primary_FeedScreenNavigationProp;
  route: Primary_FeedScreenRouteProp;
};

export const Primary_FeedScreen: FC<IPrimary_FeedScreenProps> = () => {
  const {
    isInitialLoading,
    isLoadingMore,
    listData,
    nickname,
    partnerNickname,
    refetchList,
    fetchMoreList,
    goFeedDetail,
    selectRecordMixpanelEvent,
  } = usePrimary_FeedController();

  if (isInitialLoading) {
    return <LoadingSpinner />;
  }

  const renderListFooterComponent = () => {
    if (isLoadingMore) {
      return <Primary_Feed_ListFooterSkeletonView />;
    }
  };

  const renderItem: ValueOf<FlashListProps<IFeed>, 'renderItem'> = ({ item, index }) => {
    const { missionId, coupleMissionId, category, answers, formattedDate } = item;

    const { questionIds, questionOrders } = answers.reduce(
      (acc, q) => {
        acc.questionIds.push(q.questionId);
        acc.questionOrders.push(q.questionOrder);
        return acc;
      },
      { questionIds: [], questionOrders: [] } as {
        questionIds: number[];
        questionOrders: number[];
      },
    );

    const { questionTitle, partnerAnswer, userAnswer } = answers[0];

    const handlePressContentCard = () => {
      selectRecordMixpanelEvent({
        missionId,
        questionIds,
        questionOrders,
        category,
        formattedDate,
      });
      goFeedDetail(coupleMissionId);
    };

    return (
      <Primary_Feed_ContentCardView
        submissionDate={formattedDate}
        questionCategory={category}
        userName={nickname}
        userAnswer={userAnswer}
        partnerName={partnerNickname}
        partnerAnswer={partnerAnswer}
        questionTitle={questionTitle}
        onPress={handlePressContentCard}
      />
    );
  };

  const renderContent = () => {
    return (
      <FlashList
        data={listData}
        renderItem={renderItem}
        estimatedItemSize={size['50-x']}
        ListEmptyComponent={<Primary_Feed_ContentEmptyView />}
        onEndReachedThreshold={0.2}
        onEndReached={fetchMoreList}
        refreshControl={
          <RefreshControl
            onRefresh={refetchList}
            refreshing={false}
            colors={[palette['primary']]}
            tintColor={palette['primary']}
          />
        }
        fadingEdgeLength={spacing['10-x']}
        ItemSeparatorComponent={() => <Box style={{ height: spacing['6-x'] }} />}
        ListFooterComponent={renderListFooterComponent()}
      />
    );
  };

  return <Primary_FeedLayout content={renderContent()} />;
};
