import { CompositeNavigationProp, RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { FC } from 'react';

import { ScrollView, Stack, spacing } from '~/mobile-ui';

import { MyPageStackNavigationProp, MyPageStackParamList } from '..';

import { MyPage_EditUserInfoController } from './controller';
import { MyPage_EditUserInfoLayout } from './my-page-edit-user-info.layout';
import {
  MyPage_EditUserInfo_AnniversaryView,
  MyPage_EditUserInfo_BirthDateView,
  MyPage_EditUserInfo_CTAView,
  MyPage_EditUserInfo_GenderView,
  MyPage_EditUserInfo_HeaderView,
  MyPage_EditUserInfo_NicknameView,
} from './views';

export type MyPage_EditUserInfoScreenNavigationProp = CompositeNavigationProp<
  StackNavigationProp<MyPageStackParamList, 'MyPage_EditUserInfoScreen'>,
  MyPageStackNavigationProp
>;

export type MyPage_EditUserInfoScreenRouteProp = RouteProp<
  MyPageStackParamList,
  'MyPage_EditUserInfoScreen'
>;

export type IMyPage_EditUserInfoScreenProps = {
  navigation: MyPage_EditUserInfoScreenNavigationProp;
  route: MyPage_EditUserInfoScreenRouteProp;
};

export const MyPage_EditUserInfoScreen: FC<IMyPage_EditUserInfoScreenProps> = () => {
  const {
    userData,
    isCTADisabled,
    writeNickname,
    selectGender,
    setBirthDate,
    setCoupleStartDate,
    editComplete,
  } = MyPage_EditUserInfoController();

  const { nickname, gender, birthDate, coupleStartDate } = userData;

  const renderContent = () => {
    return (
      <Stack space={spacing['9-x']}>
        <MyPage_EditUserInfo_HeaderView />
        <ScrollView>
          <Stack space={spacing['11.5-x']}>
            <MyPage_EditUserInfo_NicknameView />
            <MyPage_EditUserInfo_GenderView
              onSelect={(value: string) => {
                console.log(value);
              }}
              selectedValue={'male'}
            />
            <MyPage_EditUserInfo_BirthDateView
              onPress={() => {
                console.log('presssed');
              }}
            />
            <MyPage_EditUserInfo_AnniversaryView
              onPress={() => {
                console.log('pressed');
              }}
            />
          </Stack>
        </ScrollView>
      </Stack>
    );
  };

  return (
    <MyPage_EditUserInfoLayout
      content={renderContent()}
      footer={<MyPage_EditUserInfo_CTAView onPress={editComplete} disabled={false} />}
    />
  );
};
