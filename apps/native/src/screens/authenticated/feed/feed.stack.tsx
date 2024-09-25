import { CompositeNavigationProp, RouteProp } from '@react-navigation/native';
import { StackNavigationProp, createStackNavigator } from '@react-navigation/stack';
import { FC } from 'react';
import { AuthenticatedStackNavigationProp, AuthenticatedStackParamList } from '..';
import { Feed_DetailScreen } from './feed-detail';

export type FeedStackParamList = {
  Feed_DetailScreen: { id: number };
};

export type FeedStackNavigationProp = CompositeNavigationProp<
  AuthenticatedStackNavigationProp,
  StackNavigationProp<AuthenticatedStackParamList, 'FeedStack'>
>;

type FeedStackRouteProp = RouteProp<AuthenticatedStackParamList, 'FeedStack'>;

const Stack = createStackNavigator<FeedStackParamList>();

export type IFeedStackProps = {
  navigation: FeedStackNavigationProp;
  route: FeedStackRouteProp;
};

export const FeedStack: FC<IFeedStackProps> = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Feed_DetailScreen" component={Feed_DetailScreen} />
    </Stack.Navigator>
  );
};
