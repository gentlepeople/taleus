import { CompositeNavigationProp, RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { FC } from 'react';

import { ScrollView, Stack, spacing } from '~/mobile-ui';

import { MyPageStackNavigationProp, MyPageStackParamList } from '..';

import { useMyPage_EditUserInfoController } from './controller';
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
  } = useMyPage_EditUserInfoController();

  const { nickname, gender, birthDate, coupleStartDate } = userData;

  const renderContent = () => {
    return (
      <Stack space={spacing['9-x']}>
        <MyPage_EditUserInfo_HeaderView />
        <ScrollView>
          <Stack space={spacing['11.5-x']}>
            <MyPage_EditUserInfo_NicknameView value={nickname} onChangeText={writeNickname} />
            <MyPage_EditUserInfo_GenderView onSelect={selectGender} selectedValue={gender} />
            <MyPage_EditUserInfo_BirthDateView birthDate={birthDate} onChangeDate={setBirthDate} />
            <MyPage_EditUserInfo_AnniversaryView
              coupleStartDate={coupleStartDate}
              onChangeDate={setCoupleStartDate}
            />
          </Stack>
        </ScrollView>
      </Stack>
    );
  };

  return (
    <MyPage_EditUserInfoLayout
      content={renderContent()}
      footer={<MyPage_EditUserInfo_CTAView onPress={editComplete} isCTADisabled={isCTADisabled} />}
    />
  );
};
