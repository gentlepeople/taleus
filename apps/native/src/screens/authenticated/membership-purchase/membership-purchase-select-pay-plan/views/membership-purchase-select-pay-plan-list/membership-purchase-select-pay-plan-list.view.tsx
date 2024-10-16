import { memo } from 'react';
import {
  Box,
  Column,
  Columns,
  Icon,
  PressableQuark,
  Stack,
  Text,
  palette,
  radius,
  size,
  spacing,
} from '~/mobile-ui';

type IMembershipPurchase_SelectPayPlan_ListViewProps = {};

export const MembershipPurchase_SelectPayPlan_ListView =
  memo<IMembershipPurchase_SelectPayPlan_ListViewProps>(() => {
    const isCheckedPolicy = true;
    return (
      <Stack space={spacing['4-x']}>
        <Box style={{ height: size['1-x'], backgroundColor: palette['code-divider'] }} />
        <Stack paddingX={spacing['2-x']} space={spacing['3-x']}>
          <PressableQuark>
            <Columns>
              <Column width="fluid">
                <Text textType="title/18/bold" color="text-black">
                  {'월간 구독 4,500원'}
                </Text>
              </Column>
              <Column width="content">
                <Box
                  alignX="center"
                  alignY="center"
                  style={{
                    width: size['5-x'],
                    height: size['5-x'],
                    backgroundColor: isCheckedPolicy ? palette['primary'] : palette['disabled'],
                    borderRadius: radius['5-x'],
                  }}
                >
                  <Icon name="check" size={size['5-x']} color={palette['white-100']} />
                </Box>
              </Column>
            </Columns>
          </PressableQuark>
          <PressableQuark>
            <Columns>
              <Column width="fluid">
                <Text textType="title/18/bold" color="text-black">
                  {'연간 구독 4,000원'}
                </Text>
              </Column>
              <Column width="content">
                <Box
                  alignX="center"
                  alignY="center"
                  style={{
                    width: size['5-x'],
                    height: size['5-x'],
                    backgroundColor: isCheckedPolicy ? palette['primary'] : palette['disabled'],
                    borderRadius: radius['5-x'],
                  }}
                >
                  <Icon name="check" size={size['5-x']} color={palette['white-100']} />
                </Box>
              </Column>
            </Columns>
          </PressableQuark>
        </Stack>
        <Box style={{ height: size['1-x'], backgroundColor: palette['code-divider'] }} />
      </Stack>
    );
  });
