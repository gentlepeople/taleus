import { memo, useCallback } from 'react';
import { Pressable } from 'react-native';

import { Box, DOWN_ARROWS_IMAGE, Image, Stack, Text, palette, radius, spacing } from '~/mobile-ui';

type IPrimary_Home_BannerViewProps = {
  onPressBannerButton: () => Promise<void>;
  nickname: string;
  partnerNickname: string;
  shouldConnect: boolean;
  hasNoMyReply: boolean;
  hasNoPartnerReply: boolean;
};

export const Primary_Home_BannerView = memo<IPrimary_Home_BannerViewProps>(
  ({
    onPressBannerButton,
    nickname,
    partnerNickname,
    shouldConnect,
    hasNoMyReply,
    hasNoPartnerReply,
  }) => {
    const shouldShowButton = !(!shouldConnect && hasNoMyReply && !hasNoPartnerReply);

    const getBannerContent = () => {
      if (shouldConnect) {
        return '아직 커플연결이 안되어있어요😢';
      }

      if (!hasNoMyReply && hasNoPartnerReply) {
        return `아직 ${partnerNickname}님의 답변이 없어요😢`;
      }

      if (hasNoMyReply && !hasNoPartnerReply) {
        return `${partnerNickname}님이 ${nickname}님의 답변을 기다리고 있어요`;
      }
    };

    const getBannerButtonLabel = () => {
      if (shouldConnect) {
        return '커플 연결하러가기';
      }

      if (!hasNoMyReply && hasNoPartnerReply) {
        return '독촉 알림 보내기';
      }
    };

    const handlePressBannerButton = useCallback(async () => {
      await onPressBannerButton();
    }, [onPressBannerButton]);

    return (
      <Stack
        space={spacing['2-x']}
        paddingY={spacing['5.25-x']}
        align="center"
        style={{ backgroundColor: palette['banner-bg'] }}
      >
        <Text textType="banner" textAlignment="center">
          {'️️❤️'}
        </Text>
        <Text textType="banner-content" color="text-black" textAlignment="center">
          {getBannerContent()}
        </Text>
        {shouldShowButton ? (
          <Pressable
            onPress={handlePressBannerButton}
            style={({ pressed }) => [{ opacity: pressed ? 0.6 : 1 }]}
          >
            <Box
              paddingX={spacing['4.5-x']}
              paddingY={spacing['1-x']}
              style={{
                borderRadius: radius['5-x'],
                backgroundColor: palette['primary'],
              }}
            >
              <Text textType="banner-button" color="white-100">
                {getBannerButtonLabel()}
              </Text>
            </Box>
          </Pressable>
        ) : (
          <Image source={DOWN_ARROWS_IMAGE} style={{ width: 30, height: 10 }} />
        )}
      </Stack>
    );
  },
);
