import { CompositeNavigationProp, RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { FC } from 'react';
import { HeaderOrganism, ScrollView, Stack, spacing } from '~/mobile-ui';
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
  const { signUp } = useAuthentication_SignUpController();

  const renderContent = () => {
    return (
      <Stack space={spacing['9-x']}>
        <HeaderOrganism title={'회원가입'} left={{ type: 'button' }} />
        <ScrollView>
          <Stack space={spacing['11.5-x']}>
            <Authentication_SignUp_NicknameView />
            <Authentication_SignUp_GenderView
              onSelect={(value: string) => {
                console.log(value);
              }}
              selectedValue={'male'}
            />
            <Authentication_SignUp_BirthDateView
              onPress={() => {
                console.log('presssed');
              }}
            />
            <Authentication_SignUp_AnniversaryView
              onPress={() => {
                console.log('pressed');
              }}
            />
            <Authentication_SignUp_PolicyView />
          </Stack>
        </ScrollView>
      </Stack>
    );
  };

  return (
    <Authentication_SignUpLayout
      content={renderContent()}
      footer={<Authentication_SignUp_CTAView onPress={signUp} />}
    />
  );
};
