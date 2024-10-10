import { CompositeNavigationProp, RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { FC } from 'react';

import { HeaderOrganism, Stack, spacing } from '~/mobile-ui';

import { AuthenticationStackNavigationProp, AuthenticationStackParamList } from '..';

import { Authentication_SignUpLayout } from './authentication-sign-up.layout';
import { useAuthentication_SignUpController } from './controller';
import {
  Authentication_SignUp_AnniversaryView,
  Authentication_SignUp_BirthDateView,
  Authentication_SignUp_CTAView,
  Authentication_SignUp_GenderView,
  Authentication_SignUp_NicknameView,
  Authentication_SignUp_PolicyView,
} from './views';

export type Authentication_SignUpScreenNavigationProp = CompositeNavigationProp<
  AuthenticationStackNavigationProp,
  StackNavigationProp<AuthenticationStackParamList, 'Authentication_SignUpScreen'>
>;

export type Authentication_SignUpScreenRouteProp = RouteProp<
  AuthenticationStackParamList,
  'Authentication_SignUpScreen'
>;

export type IAuthentication_SignUpScreenProps = {
  navigation: Authentication_SignUpScreenNavigationProp;
  route: Authentication_SignUpScreenRouteProp;
};

export const Authentication_SignUpScreen: FC<IAuthentication_SignUpScreenProps> = ({}) => {
  const {
    userData,
    isCTADisabled,
    writeNickname,
    selectGender,
    setBirthDate,
    setCoupleStartDate,
    checkPolicy,
    checkTerms,
    goPolicyWebView,
    goTermsWebView,
    signUp,
  } = useAuthentication_SignUpController();

  const {
    nickname,
    gender,
    birthDate,
    coupleStartDate,
    consentToCollectPersonalInformation,
    termsOfServiceAgreement,
  } = userData;

  const renderContent = () => {
    return (
      <Stack paddingTop={spacing['9-x']} space={spacing['11.5-x']}>
        <Authentication_SignUp_NicknameView value={nickname} onChangeText={writeNickname} />
        <Authentication_SignUp_GenderView onSelect={selectGender} selectedValue={gender} />
        <Authentication_SignUp_BirthDateView birthDate={birthDate} onChangeDate={setBirthDate} />
        <Authentication_SignUp_AnniversaryView
          coupleStartDate={coupleStartDate}
          onChangeDate={setCoupleStartDate}
        />
        <Authentication_SignUp_PolicyView
          isCheckedPolicy={consentToCollectPersonalInformation}
          isCheckedTerms={termsOfServiceAgreement}
          onPressPolicy={checkPolicy}
          onPressTerms={checkTerms}
          onPressShowPolicy={goPolicyWebView}
          onPressShowTerms={goTermsWebView}
        />
      </Stack>
    );
  };

  return (
    <Authentication_SignUpLayout
      header={<HeaderOrganism title={'회원가입'} left={{ type: 'button' }} />}
      content={renderContent()}
      footer={<Authentication_SignUp_CTAView isCTADisabled={isCTADisabled} onPress={signUp} />}
    />
  );
};
