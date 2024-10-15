import { CompositeNavigationProp, RouteProp } from '@react-navigation/native';
import { StackNavigationProp, createStackNavigator } from '@react-navigation/stack';
import { FC } from 'react';

import { AuthenticatedStackNavigationProp, AuthenticatedStackParamList } from '..';
import { MembershipPurchase_SelectPayPlanScreen } from './membership-purchase-select-pay-plan';

export type MembershipPurchaseStackParamList = {
  MembershipPurchase_SelectPayPlanScreen: {};
};

export type MembershipPurchaseStackNavigationProp = CompositeNavigationProp<
  AuthenticatedStackNavigationProp,
  StackNavigationProp<AuthenticatedStackParamList, 'MembershipPurchaseStack'>
>;

type MembershipPurchaseStackRouteProp = RouteProp<
  AuthenticatedStackParamList,
  'MembershipPurchaseStack'
>;

const Stack = createStackNavigator<MembershipPurchaseStackParamList>();

export type IMembershipPurchaseStackProps = {
  navigation: MembershipPurchaseStackNavigationProp;
  route: MembershipPurchaseStackRouteProp;
};

export const MembershipPurchaseStack: FC<IMembershipPurchaseStackProps> = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="MembershipPurchase_SelectPayPlanScreen"
        component={MembershipPurchase_SelectPayPlanScreen}
      />
    </Stack.Navigator>
  );
};
