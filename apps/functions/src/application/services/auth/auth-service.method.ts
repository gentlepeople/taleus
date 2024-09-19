import { EnumGender, EnumOAuthProviderType } from '@gentlepeople/taleus-schema';
import isNull from 'lodash/isNull';

import { generateRandomCode } from '@/common';
import { AuthenticationPort, IUserRepository } from '@/ports';

export const findOrSaveUserWithProvider = async (
  userRepository: IUserRepository,
  authenticationPort: AuthenticationPort,
  data: {
    oauthProviderId: string;
    oauthProviderType: EnumOAuthProviderType;
    oauthUserProperties: {
      nickname: string;
      email: string;
      emailVerified: boolean;
      profileImageUrl: string;
      birthday: Date;
      gender: EnumGender;
    };
  },
): Promise<string> => {
  const { oauthProviderId, oauthProviderType, oauthUserProperties } = data;
  const findUser = await userRepository.findOneByOAuthProviderId(oauthProviderId);

  const userNotFound = isNull(findUser);
  if (userNotFound) {
    const { uid: authenticationUid } = await authenticationPort.createUser();

    const createUserId = await saveUser(userRepository, {
      ...oauthUserProperties,
      userId: authenticationUid,
      oauthProviderId,
      oauthProviderType,
    });

    return createUserId;
  }
  const { userId: findUserId } = findUser;
  return findUserId;
};

export const saveUser = async (
  userRepository: IUserRepository,
  userProperties: {
    userId: string;
    email: string;
    emailVerified: boolean;
    profileImageUrl: string;
    nickname: string;
    birthday: Date;
    gender: EnumGender;
    oauthProviderType: EnumOAuthProviderType;
    oauthProviderId: string;
  },
): Promise<string> => {
  const uniquePersonalCode = await generateUniqueUserPersonalCodeWithCheck(userRepository);

  const { userId: createUserId } = await userRepository.createOne({
    ...userProperties,
    personalCode: uniquePersonalCode,
  });
  return createUserId;
};

export const generateUniqueUserPersonalCodeWithCheck = async (
  userRepository: IUserRepository,
  length: number = 8,
  maxAttempts: number = 10,
): Promise<string> => {
  let code: string;
  let attempts = 0;

  while (attempts < maxAttempts) {
    code = generateRandomCode(length);

    if (await isUserPersonalCodeUnique(userRepository, code)) {
      return code;
    }

    attempts++;
  }

  throw new Error(`Failed to generate a unique user personalCode after ${maxAttempts} attempts.`);
};

export const isUserPersonalCodeUnique = async (
  userRepository: IUserRepository,
  code: string,
): Promise<boolean> => {
  const existingUser = await userRepository.findOneByPersonalCode(code);
  return !existingUser; // Return true if no user with the code exists
};
