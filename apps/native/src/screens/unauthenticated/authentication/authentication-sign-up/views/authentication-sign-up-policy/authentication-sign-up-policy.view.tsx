import { memo } from 'react';
import { Pressable } from 'react-native';
import {
  Box,
  Column,
  Columns,
  Icon,
  Stack,
  Text,
  palette,
  radius,
  size,
  spacing,
} from '~/mobile-ui';

type IAuthentication_SignUp_PolicyViewProps = {};

export const Authentication_SignUp_PolicyView = memo<IAuthentication_SignUp_PolicyViewProps>(() => {
  return (
    <Stack align="center" space={spacing['3-x']}>
      {/* button 1 */}
      <Columns
        space={spacing['4-x']}
        alignX="center"
        alignY="center"
        style={{ width: size['55-x'] }}
      >
        <Column width="content">
          <Pressable onPress={() => {}} style={({ pressed }) => [{ opacity: pressed ? 0.6 : 1 }]}>
            <Box
              alignX="center"
              alignY="center"
              style={{
                width: size['5-x'],
                height: size['5-x'],
                backgroundColor: palette['disabled'],
                borderRadius: radius['5-x'],
              }}
            >
              <Icon name="check" size={size['5-x']} color={palette['white-100']} />
            </Box>
          </Pressable>
        </Column>
        <Column width="fluid">
          <Pressable>
            <Columns alignY="center">
              <Column width="fluid">
                <Text textType="button-2" color="text-black">
                  {'개인정보 수집이용 동의'}
                </Text>
              </Column>
              <Column width="content">
                <Icon name="right-arrow" size={12} />
              </Column>
            </Columns>
          </Pressable>
        </Column>
      </Columns>
      {/* button 2 */}
      <Columns
        space={spacing['4-x']}
        alignX="center"
        alignY="center"
        style={{ width: size['55-x'] }}
      >
        <Column width="content">
          <Pressable onPress={() => {}} style={({ pressed }) => [{ opacity: pressed ? 0.6 : 1 }]}>
            <Box
              alignX="center"
              alignY="center"
              style={{
                width: size['5-x'],
                height: size['5-x'],
                backgroundColor: palette['disabled'],
                borderRadius: radius['5-x'],
              }}
            >
              <Icon name="check" size={size['5-x']} color={palette['white-100']} />
            </Box>
          </Pressable>
        </Column>
        <Column width="fluid">
          <Pressable>
            <Columns alignY="center">
              <Column width="fluid">
                <Text textType="button-2" color="text-black">
                  {'서비스 이용약관 동의'}
                </Text>
              </Column>
              <Column width="content">
                <Icon name="right-arrow" size={12} />
              </Column>
            </Columns>
          </Pressable>
        </Column>
      </Columns>
    </Stack>
  );
});
