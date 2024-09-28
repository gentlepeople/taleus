import { shareFeedTemplate } from '@react-native-kakao/share';
import { useCallback } from 'react';

type IMyPage_ConnectCoupleKakaoShareInput = void;
type IMyPage_ConnectCoupleKakaoShareOutput = {
  kakaoShare: (personalCode: string) => Promise<void>;
};

export const useMyPage_ConnectCoupleKakaoShare: Hook<
  IMyPage_ConnectCoupleKakaoShareInput,
  IMyPage_ConnectCoupleKakaoShareOutput
> = () => {
  const kakaoShare = useCallback(
    async (personalCode: string) => {
      await shareFeedTemplate({
        template: {
          content: {
            title: '❤️ 내 연인의 커플 코드 ❤️',
            description: personalCode,
            link: {
              mobileWebUrl: `taleUs://my-page/connect-couple?partnerPersonalCode=${personalCode}`,
              webUrl: `taleUs://my-page/connect-couple?partnerPersonalCode=${personalCode}`,
            },
            imageUrl: '',
          },
          buttons: [
            {
              title: '앱에서 연결하기',
              link: {
                mobileWebUrl: `taleUs://my-page/connect-couple?partnerPersonalCode=${personalCode}`,
                webUrl: `taleUs://my-page/connect-couple?partnerPersonalCode=${personalCode}`,
              },
            },
          ],
        },
        useWebBrowserIfKakaoTalkNotAvailable: true,
      });
    },
    [shareFeedTemplate],
  );

  return { kakaoShare };
};
