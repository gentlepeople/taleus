import {
  EnumGender,
  EnumOAuthProviderType,
  EnumSubscriptionStatus,
} from '@gentlepeople/taleus-schema';

import { UserProps } from '@/domain';

export const DEFAULT_PROFILE_IMAGE_URL =
  'https://img1.kakaocdn.net/thumb/R640x640.q70/?fname=https://t1.kakaocdn.net/account_images/default_profile.jpeg';

export const DEFAULT_LOCAL_USER_ID = 'local-user-id';

export const DEFAULT_ANONYMOUS_USER_OBJECT: UserProps = {
  userId: 'anonymous',
  nickname: '탈퇴한 유저',
  email: 'N/A',
  profileImageUrl: DEFAULT_PROFILE_IMAGE_URL,
  gender: EnumGender.UNKNOWN,
  birthday: new Date('0000-01-01'),
  oauthProviderType: EnumOAuthProviderType.KAKAO,
  personalCode: 'N/A',
  notificationTime: 'N/A',
  subscriptionStatus: EnumSubscriptionStatus.UNSUBSCRIBED,
  isProfileCompleted: true,
  createdAt: new Date('0000-01-01'),
  updatedAt: new Date('0000-01-01'),
  deletedAt: new Date('0000-01-01'),
};

export const ONBOARDING_MISSION_ID: bigint = BigInt(1);
