export const KAKAO_AUTH_PORT = Symbol('KAKAO_AUTH_PORT');

export type IKakaoAuthPortUserAccountType = {
  id: number; //사용자 ID
  synched_at?: Date; //카카오싱크 간편가입을 통해 로그인한 시각, UTC (RFC3339 internet date/time format)
  connected_at?: Date; //서비스에 연결 완료된 시각, UTC (RFC3339 internet date/time format)
  //추가 정보
  properties?: {
    nickname?: string;
    thumbnail_image?: string;
    profile_image?: string;
  };
  //카카오계정 정보
  kakao_account?: {
    profile_needs_agreement?: boolean;
    profile_nickname_needs_agreement?: boolean;
    profile_image_needs_agreement?: boolean;
    // 카카오계정 프로필 정보
    profile: {
      nickname: string; //닉네임
      profile_image_url?: string; //프로필 이미지 URL, 640px * 640px 또는 480px * 480px
      thumbnail_image_url?: string; //프로필 미리보기 이미지 URL, 110px * 110px 또는 100px * 100px
      profile_needs_agreement?: boolean; //사용자 동의 시 프로필 제공 가능
      is_default_image?: boolean;
      is_default_nickname?: boolean;
    };
    name_needs_agreement?: boolean; //사용자 동의 시 이름 제공 가능
    name?: string; //카카오계정 이름
    email_needs_agreement?: boolean; //사용자 동의 시 이메일 제공 가능
    email?: string; //카카오계정 대표 이메일
    is_email_valid?: boolean; //이메일이 다른 카카오계정에 사용돼 만료되었다면 무효(false)
    is_email_verified?: boolean; //이메일 인증 여부
    age_range_needs_agreement?: boolean; //사용자 동의 시 연령대 제공 가능
    age_range?: string; //연령대
    birthday_needs_agreement?: boolean; //사용자 동의 시 생일 제공 가능
    birthday?: string; //생일, MMDD 형식
    birthday_type?: string; //생일 양력/음력 구분, 양력(SOLAR)/음력(LUNAR)
    birthyear_needs_agreement?: boolean; //사용자 동의 시 출생연도 제공 가능
    birthyear?: string; //태어난 해, YYYY 형식
    gender_needs_agreement?: boolean; //사용자 동의 시 성별 제공 가능
    gender?: string; //성별, female/male
    phone_number_needs_agreement?: boolean; //사용자 동의 시 전화번호 제공 가능
    phone_number?: string; //전화번호, +00 00-0000-0000 Ehsms +00 00 0000 0000 형식, 국가마다 하이픈(-) 위치나 값 다를 수 있음
    ci_needs_agreement?: boolean; //사용자 동의 시 CI 참고 가능
    ci?: string; //암호화된 이용자 확인 값
    ci_authenticated_at?: string; //본인인증기관이 CI를 발급한 시각, UTC(RFC3339 internet date/time format)
  };
};

export interface KakaoAuthPort {
  getUserAccount(access_token: string): Promise<IKakaoAuthPortUserAccountType>;
}
