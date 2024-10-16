import { memo } from 'react';
import { Box, Stack, Text, palette, radius, size, spacing } from '~/mobile-ui';

type IMembershipPurchase_SelectPayPlan_IntroductionViewProps = {};

export const MembershipPurchase_SelectPayPlan_IntroductionView =
  memo<IMembershipPurchase_SelectPayPlan_IntroductionViewProps>(() => {
    return (
      <Stack paddingX={spacing['2-x']} space={spacing['4-x']}>
        <Stack space={spacing['2-x']}>
          <Text textType="body/15/bold" color="text-black">
            {'7일간의 프리미엄 체험권을 드려요!'}
          </Text>
          <Stack
            paddingTop={spacing['4-x']}
            paddingBottom={spacing['6-x']}
            paddingX={spacing['4-x']}
            space={spacing['2-x']}
            style={{
              borderColor: palette['box-border'],
              borderWidth: size['0.25-x'],
              borderRadius: radius['4-x'],
            }}
          >
            <Text textType="title/18/bold" color="text-black">
              {'프리미엄 혜택'}
            </Text>
            <Text textType="banner-content" color="text-black">
              {'기본 기능 사용 가능'}
            </Text>
            <Text textType="banner-content" color="text-black">
              {'광고 삭제'}
            </Text>
            <Text textType="banner-content" color="text-black">
              {'문답 데이터 저장'}
            </Text>
          </Stack>
        </Stack>
        <Box paddingX={spacing['2-x']}>
          <Text textType="banner-button" color="text-black">
            {
              '7일 후에 변화가 느껴진다면, 테일어스 프리미엄을 계속 이용하세요. 커피 한 잔값으로 달라진 관계를 확인하실 수 있어요!'
            }
          </Text>
        </Box>
      </Stack>
    );
  });
