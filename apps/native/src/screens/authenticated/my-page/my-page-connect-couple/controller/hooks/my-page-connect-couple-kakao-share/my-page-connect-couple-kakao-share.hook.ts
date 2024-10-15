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
            imageUrl: null,
            link: {
              mobileWebUrl: `taleus://my-page/connect-couple`,
              webUrl: `taleus://my-page/connect-couple`,
              iosExecutionParams: {
                partnerPersonalCode: personalCode,
              },
              androidExecutionParams: {
                partnerPersonalCode: personalCode,
              },
            },
          },
          buttons: [
            {
              title: '앱에서 연결하기',
              link: {
                mobileWebUrl: `taleus://my-page/connect-couple`,
                webUrl: `taleus://my-page/connect-couple`,
                iosExecutionParams: {
                  partnerPersonalCode: personalCode,
                },
                androidExecutionParams: {
                  partnerPersonalCode: personalCode,
                },
              },
            },
          ],
        },
        useWebBrowserIfKakaoTalkNotAvailable: true,
      }).catch((e) => console.log(e));
    },
    [shareFeedTemplate],
  );

  return { kakaoShare };
};
