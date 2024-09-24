import { DEFAULT_PROFILE_IMAGE_URL } from '@/common';
import { IKakaoAuthPortUserAccountType } from '@/ports';

export const sampleKakaoAccount: IKakaoAuthPortUserAccountType = {
  id: 123456789,
  kakao_account: {
    profile_needs_agreement: false,
    profile: {
      nickname: '홍길동',
      thumbnail_image_url: 'http://yyy.kakao.com/.../img_110x110.jpg',
      profile_image_url: DEFAULT_PROFILE_IMAGE_URL,
      is_default_image: false,
      is_default_nickname: false,
    },
    email_needs_agreement: false,
    is_email_valid: true,
    is_email_verified: true,
    email: 'sample@sample.com',
    name_needs_agreement: false,
    name: '홍길동',
    age_range_needs_agreement: false,
    age_range: '20~29',
    birthday_needs_agreement: false,
    birthday: '1130',
    gender_needs_agreement: false,
    gender: 'female',
  },
  properties: {
    nickname: '홍길동카톡',
    thumbnail_image: 'http://xxx.kakao.co.kr/.../aaa.jpg',
    profile_image: DEFAULT_PROFILE_IMAGE_URL,
  },
};
