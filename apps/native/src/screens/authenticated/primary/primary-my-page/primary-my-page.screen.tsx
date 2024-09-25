import { CompositeNavigationProp, RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { FC } from 'react';

import { Divider, Stack } from '~/mobile-ui';

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
  const { goEditUserInfo, goConnectCouple, goPushNotification } = usePrimary_MyPageController();

  //   1. 피드백 문의 -> 웹뷰?
  //   2. 개인정보 수정 -> 스크린 이동
  //   3. 커플 연결 -> 스크린 이동
  //   4. 푸쉬 알림 -> 스크린 이동
  //   5. 이용 약관 -> 웹뷰
  //   6. 개인정보 처리 방침 -> 웹뷰
  //   8. 로그아웃 -> 이후 landing으로
  //   9. 회원 탈퇴 -> 모달
  // 구독 관리 어따가 넣을지?

  const renderContent = () => {
    return (
      <Stack>
        <Primary_MyPage_UserInfoView userName="영기" datePeriod={500} taleUsUsagePeriod={36} />
        <Divider />
        <Primary_MyPage_SettingsView
          onPressInquiry={({ title, uri }) => {}}
          onPressEditUserInfo={goEditUserInfo}
          onPressConnectCouple={goConnectCouple}
          onPressPushNotification={goPushNotification}
        />
        <Primary_MyPage_PolicyView />
        <Primary_MyPage_AppInfoView />
      </Stack>
    );
  };

  return <Primary_MyPageLayout header={<Primary_MyPage_HeaderView />} content={renderContent()} />;
};
