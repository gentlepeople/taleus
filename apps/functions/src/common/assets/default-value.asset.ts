import {
  EnumGender,
  EnumOAuthProviderType,
  EnumSubscriptionStatus,
} from '@gentlepeople/taleus-schema';

import { User } from '../../domain';

export const DEFAULT_PROFILE_IMAGE_URL =
  'https://img1.kakaocdn.net/thumb/R640x640.q70/?fname=https://t1.kakaocdn.net/account_images/default_profile.jpeg';

export const DEFAULT_LOCAL_USER_ID = 'local-user-id';

export const DEFAULT_ANONYMOUS_USER_OBJECT: User = {
  userId: 'anonymous',
  isAnonymous: true,
  nickname: '탈퇴한 유저',
  email: 'N/A',
  profileImageUrl: DEFAULT_PROFILE_IMAGE_URL,
  gender: EnumGender.UNKNOWN,
  birthday: new Date('0000-01-01'),
  oauthProviderType: EnumOAuthProviderType.KAKAO,
  personalCode: 'N/A',
  notificationTime: 'N/A',
  subscriptionStatus: EnumSubscriptionStatus.UNSUBSCRIBED,
  createdAt: new Date('0000-01-01'),
  updatedAt: new Date('0000-01-01'),
};

export const ONBOARDING_MISSION_ID = 1;
