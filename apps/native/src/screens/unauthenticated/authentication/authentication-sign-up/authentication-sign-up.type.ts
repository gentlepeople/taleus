import { EnumGender } from '@gentlepeople/taleus-codegen';

export type IUserData = {
  nickname: string;
  gender: EnumGender;
  birthDate: Date;
  coupleStartDate: Date;
  consentToCollectPersonalInformation: boolean;
  termsOfServiceAgreement: boolean;
};

export type IUpdateUserInfoParams = {
  userData: IUserData;
  onSuccess: () => void;
};
