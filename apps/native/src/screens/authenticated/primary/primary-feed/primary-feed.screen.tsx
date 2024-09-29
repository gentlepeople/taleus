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

type IFeedContent = {
  id: number;
  submissionDate: string;
  questionCategory: string;
  userName: string;
  userAnswer: string;
  partnerName: string;
  partnerAnswer: string;
};

const data = [
  {
    id: 1,
    submissionDate: '2024/09/22',
    questionCategory: '질문 카테고리',
    userName: '영기',
    userAnswer: '바보야 우영기 정말 바보야 바보야 우영기 정말 바보야',
    partnerName: '바나나',
    partnerAnswer: '바보야 우영기 정말 바보야 바보야 우영기 정말 바보야',
  },
  {
    id: 2,
    submissionDate: '2024/09/22',
    questionCategory: '질문 카테고리',
    userName: '영기',
    userAnswer: '바보야 우영기 정말 바보야 바보야 우영기 정말 바보야',
    partnerName: '바나나',
    partnerAnswer: '바보야 우영기 정말 바보야 바보야 우영기 정말 바보야',
  },
  {
    id: 3,
    submissionDate: '2024/09/22',
    questionCategory: '질문 카테고리',
    userName: '영기',
    userAnswer: '바보야 우영기 정말 바보야 바보야 우영기 정말 바보야',
    partnerName: '바나나',
    partnerAnswer: '바보야 우영기 정말 바보야 바보야 우영기 정말 바보야',
  },
];

export const Primary_FeedScreen: FC<IPrimary_FeedScreenProps> = () => {
  const { isInitialLoading, isLoadingMore, refetchList, fetchMoreList, goFeedDetail } =
    usePrimary_FeedController();

  if (isInitialLoading) {
    return <LoadingSpinner />;
  }

  const renderListFooterComponent = () => {
    if (isLoadingMore) {
      return <Primary_Feed_ListFooterSkeletonView />;
    }
  };

  const renderItem: ValueOf<FlashListProps<IFeedContent>, 'renderItem'> = ({ item, index }) => {
    const {
      id,
      submissionDate,
      questionCategory,
      userName,
      userAnswer,
      partnerName,
      partnerAnswer,
    } = item;

    const handlePressContentCard = () => {
      goFeedDetail(id);
    };

    return (
      <Primary_Feed_ContentCardView
        submissionDate={submissionDate}
        questionCategory={questionCategory}
        userName={userName}
        userAnswer={userAnswer}
        partnerName={partnerName}
        partnerAnswer={partnerAnswer}
        onPress={handlePressContentCard}
      />
    );
  };

  const renderContent = () => {
    return (
      <FlashList
        data={data}
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
