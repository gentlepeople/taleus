import { memo } from 'react';
import {
  Column,
  Columns,
  Icon,
  PressableQuark,
  Stack,
  Text,
  palette,
  size,
  spacing,
} from '~/mobile-ui';

type IPrimary_MyPage_PolicyViewProps = {};

export const Primary_MyPage_PolicyView = memo<IPrimary_MyPage_PolicyViewProps>(() => {
  return (
    <Stack space={spacing['4-x']} paddingX={spacing['4-x']} paddingTop={spacing['8-x']}>
      <Text textType="body/12/regular" color="disabled">
        {'약관 및 정책'}
      </Text>
      <PressableQuark onPress={() => {}}>
        <Columns alignY="center">
          <Column width="fluid">
            <Text textType="header-2" color="text-black">
              {'이용약관'}
            </Text>
          </Column>
          <Column width="content">
            <Icon name="right-arrow" size={size['4-x']} color={palette['disabled']} />
          </Column>
        </Columns>
      </PressableQuark>
      <PressableQuark onPress={() => {}}>
        <Columns alignY="center">
          <Column width="fluid">
            <Text textType="header-2" color="text-black">
              {'개인정보 처리 방침'}
            </Text>
          </Column>
          <Column width="content">
            <Icon name="right-arrow" size={size['4-x']} color={palette['disabled']} />
          </Column>
        </Columns>
      </PressableQuark>
    </Stack>
  );
});
