import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { CompositeNavigationProp, RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { FC } from 'react';

import { BottomTabNavigator, Icon } from '~/mobile-ui';

import {
  AuthenticatedStackNavigationProp,
  AuthenticatedStackParamList,
} from '../authenticated.stack';

import { Primary_FeedScreen } from './primary-feed';
import { Primary_HomeScreen } from './primary-home';
import { Primary_MyPageScreen } from './primary-my-page';

export type PrimaryStackParamList = {
  Primary_FeedScreen: {};
  Primary_HomeScreen: {};
  Primary_MyPageScreen: {};
};

export type PrimaryStackNavigationProp = CompositeNavigationProp<
  AuthenticatedStackNavigationProp,
  StackNavigationProp<AuthenticatedStackParamList, 'PrimaryStack'>
>;

type PrimaryStackRouteProp = RouteProp<AuthenticatedStackParamList, 'PrimaryStack'>;

const Tab = createBottomTabNavigator<PrimaryStackParamList>();

export type IPrimaryStackProps = {
  navigation: PrimaryStackNavigationProp;
  route: PrimaryStackRouteProp;
};

export const PrimaryStack: FC<IPrimaryStackProps> = ({ navigation, route }) => {
  //   const { handlePressHomeTab, handlePressTodayTab, handlePressStatsTab, handlePressMoreTab } =
  //     usePrimaryTabMixpanel();

  return (
    <Tab.Navigator
      tabBar={BottomTabNavigator}
      screenOptions={{ headerShown: false }}
      initialRouteName="Primary_HomeScreen"
    >
      <Tab.Screen
        name="Primary_FeedScreen"
        component={Primary_FeedScreen}
        // listeners={() => ({
        //   tabPress: () => {
        //     return;
        //   },
        // })}
        options={{
          tabBarLabel: '우리기록',
          tabBarIcon: ({ color, size }) => {
            return <Icon name="file" color={color} size={size} />;
          },
        }}
      />
      <Tab.Screen
        name="Primary_HomeScreen"
        component={Primary_HomeScreen}
        options={{
          tabBarLabel: '오늘의 질문',
          tabBarIcon: ({ color, size }) => {
            return <Icon name="edit" color={color} size={size} />;
          },
        }}
      />
      <Tab.Screen
        name="Primary_MyPageScreen"
        component={Primary_MyPageScreen}
        options={{
          tabBarLabel: '마이페이지',
          tabBarIcon: ({ color, size }) => {
            return <Icon name="user" color={color} size={size} />;
          },
        }}
      />
    </Tab.Navigator>
  );
};
