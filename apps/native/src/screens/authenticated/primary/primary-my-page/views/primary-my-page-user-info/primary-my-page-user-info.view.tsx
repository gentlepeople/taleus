import { memo, useState } from 'react';
import { Pressable } from 'react-native';
import { BannerAd, BannerAdSize } from 'react-native-google-mobile-ads';
import { useDidUpdate } from 'rooks';

import { Column, Columns, Stack, Text, spacing } from '~/mobile-ui';
import { useAdMob } from '~/providers';

type IPrimary_MyPage_UserInfoViewProps = {
  userName: string;
  isCoupled: boolean;
  coupleData?: {
    relationshipDays: number;
    completedMissionCount: number;
  };
};

export const Primary_MyPage_UserInfoView = memo<IPrimary_MyPage_UserInfoViewProps>(
  ({ userName, isCoupled, coupleData }) => {
    // TODO:민기 애드몹 붙일 때 이스터에그 삭제
    const {
      showRewardedInterstitialAd,
      bannerAd: { bannerAdUnitId, bannerRef },
    } = useAdMob();

    const [count, setCount] = useState<number>(0);

    const relationshipDays = isCoupled ? 2 : '- ';
    const completedMissionCount = isCoupled ? coupleData.completedMissionCount : '- ';

    const handleCount = () => {
      setCount((prevCount) => prevCount + 1);
    };

    useDidUpdate(() => {
      console.log(count % 5);
      if (count % 5 === 0) {
        showRewardedInterstitialAd();
      }
    }, [count, showRewardedInterstitialAd]);

    return (
      <>
        <Stack space={spacing['3-x']} padding={spacing['4-x']}>
          <Pressable onPress={handleCount}>
            <Text textType="biggest" color="text-black">
              {userName}
            </Text>
          </Pressable>
          <Stack space={spacing['2-x']}>
            <Columns>
              <Column width="fluid">
                <Text textType="banner-content" color="text-black">
                  {'우리 커플 연애기간'}
                </Text>
              </Column>
              <Column width="content">
                <Text textType="body/15/bold" color="text-black">
                  {`${relationshipDays}일`}
                </Text>
              </Column>
            </Columns>
            <Columns>
              <Column width="fluid">
                <Text textType="banner-content" color="text-black">
                  {'우리 커플 대화 누적 기간'}
                </Text>
              </Column>
              <Column width="content">
                <Text textType="body/15/bold" color="text-black">
                  {`${completedMissionCount}일`}
                </Text>
              </Column>
            </Columns>
          </Stack>
        </Stack>
        {count === 3 && (
          <BannerAd
            ref={bannerRef}
            unitId={bannerAdUnitId}
            size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
          />
        )}
      </>
    );
  },
);
