import { CompositeNavigationProp, RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { FC } from 'react';

import { Stack } from '~/mobile-ui';

import { MembershipPurchaseStackNavigationProp, MembershipPurchaseStackParamList } from '..';
import { MembershipPurchase_SelectPayPlanLayout } from './membership-purchase-select-pay-plan.layout';
import {
  MembershipPurchase_SelectPayPlan_BannerView,
  MembershipPurchase_SelectPayPlan_CTAView,
  MembershipPurchase_SelectPayPlan_IntroductionView,
  MembershipPurchase_SelectPayPlan_ListView,
  MembershipPurchase_SelectPayPlan_NoteView,
  MembershipPurchase_SelectPayPlan_ReviewView,
} from './views';

export type MembershipPurchase_SelectPayPlanScreenNavigationProp = CompositeNavigationProp<
  StackNavigationProp<MembershipPurchaseStackParamList, 'MembershipPurchase_SelectPayPlanScreen'>,
  MembershipPurchaseStackNavigationProp
>;

export type MembershipPurchase_SelectPayPlanScreenRouteProp = RouteProp<
  MembershipPurchaseStackParamList,
  'MembershipPurchase_SelectPayPlanScreen'
>;

export type IMembershipPurchase_SelectPayPlanScreenProps = {
  navigation: MembershipPurchase_SelectPayPlanScreenNavigationProp;
  route: MembershipPurchase_SelectPayPlanScreenRouteProp;
};

export const MembershipPurchase_SelectPayPlanScreen: FC<
  IMembershipPurchase_SelectPayPlanScreenProps
> = () => {
  const renderContent = () => {
    return (
      <Stack>
        <MembershipPurchase_SelectPayPlan_BannerView />
        <MembershipPurchase_SelectPayPlan_IntroductionView />
        <MembershipPurchase_SelectPayPlan_ListView />
        <MembershipPurchase_SelectPayPlan_ReviewView />
        <MembershipPurchase_SelectPayPlan_NoteView />
      </Stack>
    );
  };

  return (
    <MembershipPurchase_SelectPayPlanLayout
      content={renderContent()}
      footer={<MembershipPurchase_SelectPayPlan_CTAView />}
    />
  );
};
