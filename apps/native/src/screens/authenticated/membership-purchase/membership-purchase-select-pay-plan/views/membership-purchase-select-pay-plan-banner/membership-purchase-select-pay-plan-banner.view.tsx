import { memo } from 'react';
import { ImageBackground } from 'react-native';
import { Box, MEMBERSHIP_COUPLE_IMAGE, Text, radius, spacing } from '~/mobile-ui';

type IMembershipPurchase_SelectPayPlan_BannerViewProps = {};

export const MembershipPurchase_SelectPayPlan_BannerView =
  memo<IMembershipPurchase_SelectPayPlan_BannerViewProps>(() => {
    return (
      <Box paddingTop={spacing['6-x']}>
        <Box style={{ borderRadius: radius['4-x'] }}>
          <ImageBackground
            source={MEMBERSHIP_COUPLE_IMAGE}
            style={{
              aspectRatio: 340 / 179,
              paddingTop: spacing['6-x'],
              paddingLeft: spacing['4-x'],
            }}
          >
            <Text textType="biggest-regular" color="white-100">
              {'커피 한 잔 값으로,'}
            </Text>
            <Text textType="biggest" color="white-100">
              {'연인 관계를 더 단단하게'}
            </Text>
          </ImageBackground>
        </Box>
      </Box>
    );
  });
