import { IKakaoAuthPortUserAccountType } from '@/ports';

export const sampleKakaoAccount: IKakaoAuthPortUserAccountType = {
  id: 123456789,
  kakao_account: {
    profile_needs_agreement: false,
    profile: {
      nickname: '홍길동',
      thumbnail_image_url: 'http://yyy.kakao.com/.../img_110x110.jpg',
      profile_image_url:
        'https://img1.kakaocdn.net/thumb/R640x640.q70/?fname=https://t1.kakaocdn.net/account_images/default_profile.jpeg',
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
    profile_image:
      'https://img1.kakaocdn.net/thumb/R640x640.q70/?fname=https://t1.kakaocdn.net/account_images/default_profile.jpeg',
  },
};
