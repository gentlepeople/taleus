import { CompositeNavigationProp, RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { FC } from 'react';

import { Divider, LoadingSpinner, Stack, spacing } from '~/mobile-ui';

import { PrimaryStackNavigationProp, PrimaryStackParamList } from '..';

import { usePrimary_MyPageController } from './controller';
import { Primary_MyPageLayout } from './primary-my-page.layout';
import {
  Primary_MyPage_AppInfoView,
  Primary_MyPage_HeaderView,
  Primary_MyPage_PolicyView,
  Primary_MyPage_SettingsView,
  Primary_MyPage_UserInfoView,
} from './views';

export type Primary_MyPageScreenNavigationProp = CompositeNavigationProp<
  StackNavigationProp<PrimaryStackParamList, 'Primary_MyPageScreen'>,
  PrimaryStackNavigationProp
>;

export type Primary_MyPageScreenRouteProp = RouteProp<
  PrimaryStackParamList,
  'Primary_MyPageScreen'
>;

export type IPrimary_MyPageScreenProps = {
  navigation: Primary_MyPageScreenNavigationProp;
  route: Primary_MyPageScreenRouteProp;
};

export const Primary_MyPageScreen: FC<IPrimary_MyPageScreenProps> = () => {
  const {
    isUserInfoDataLoading,
    nickname,
    isCoupled,
    coupleData,
    goEditUserInfo,
    goConnectCouple,
    deleteUserModal,
    signOutModal,
    openFeedbackAndInquiry,
    openPolicy,
    openTerms,
    openNotificationSetting,
  } = usePrimary_MyPageController();

  if (isUserInfoDataLoading) {
    return <LoadingSpinner />;
  }

  const renderContent = () => {
    return (
      <Stack paddingBottom={spacing['4-x']}>
        <Primary_MyPage_UserInfoView
          userName={nickname}
          isCoupled={isCoupled}
          coupleData={coupleData}
        />
        <Divider />
        <Primary_MyPage_SettingsView
          onPressInquiry={openFeedbackAndInquiry}
          onPressEditUserInfo={goEditUserInfo}
          onPressConnectCouple={goConnectCouple}
          onPressPushNotification={openNotificationSetting}
        />
        <Primary_MyPage_PolicyView onPressPolicy={openPolicy} onPressTerms={openTerms} />
        <Primary_MyPage_AppInfoView
          onPresssDeleteUser={deleteUserModal}
          onPressSignOut={signOutModal}
        />
      </Stack>
    );
  };

  return <Primary_MyPageLayout header={<Primary_MyPage_HeaderView />} content={renderContent()} />;
};
