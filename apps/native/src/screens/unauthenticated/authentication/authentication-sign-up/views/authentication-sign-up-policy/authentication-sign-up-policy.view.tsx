import { memo, useCallback } from 'react';
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

type IAuthentication_SignUp_PolicyViewProps = {
  isCheckedPolicy: boolean;
  isCheckedTerms: boolean;
  onPressPolicy: () => void;
  onPressTerms: () => void;
  onPressShowPolicy: () => void;
  onPressShowTerms: () => void;
};

export const Authentication_SignUp_PolicyView = memo<IAuthentication_SignUp_PolicyViewProps>(
  ({
    isCheckedPolicy,
    isCheckedTerms,
    onPressPolicy,
    onPressTerms,
    onPressShowPolicy,
    onPressShowTerms,
  }) => {
    const handlePressPolicy = useCallback(() => {
      onPressPolicy();
    }, [onPressPolicy]);

    const handlePressTerms = useCallback(() => {
      onPressTerms();
    }, [onPressTerms]);

    const handlePressShowPolicy = useCallback(() => {
      onPressShowPolicy();
    }, [onPressShowPolicy]);

    const handlePressShowTerms = useCallback(() => {
      onPressShowTerms();
    }, [onPressShowTerms]);

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
            <Pressable
              onPress={handlePressPolicy}
              style={({ pressed }) => [{ opacity: pressed ? 0.6 : 1 }]}
            >
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
            </Pressable>
          </Column>
          <Column width="fluid">
            <Columns alignY="center">
              <Column width="fluid">
                <Text textType="button-2" color="text-black">
                  {'개인정보 수집이용 동의'}
                </Text>
              </Column>
              <Column width="content">
                <Pressable
                  onPress={handlePressShowPolicy}
                  style={({ pressed }) => [
                    { opacity: pressed ? 0.6 : 1 },
                    {
                      width: size['6-x'],
                      height: size['6-x'],
                      alignItems: 'center',
                      justifyContent: 'center',
                    },
                  ]}
                >
                  <Icon name="right-arrow" size={12} />
                </Pressable>
              </Column>
            </Columns>
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
            <Pressable
              onPress={handlePressTerms}
              style={({ pressed }) => [{ opacity: pressed ? 0.6 : 1 }]}
            >
              <Box
                alignX="center"
                alignY="center"
                style={{
                  width: size['5-x'],
                  height: size['5-x'],
                  backgroundColor: isCheckedTerms ? palette['primary'] : palette['disabled'],
                  borderRadius: radius['5-x'],
                }}
              >
                <Icon name="check" size={size['5-x']} color={palette['white-100']} />
              </Box>
            </Pressable>
          </Column>
          <Column width="fluid">
            <Columns alignY="center">
              <Column width="fluid">
                <Text textType="button-2" color="text-black">
                  {'서비스 이용약관 동의'}
                </Text>
              </Column>
              <Column width="content">
                <Pressable
                  onPress={handlePressShowTerms}
                  style={({ pressed }) => [
                    { opacity: pressed ? 0.6 : 1 },
                    {
                      width: size['6-x'],
                      height: size['6-x'],
                      alignItems: 'center',
                      justifyContent: 'center',
                    },
                  ]}
                >
                  <Icon name="right-arrow" size={12} />
                </Pressable>
              </Column>
            </Columns>
          </Column>
        </Columns>
      </Stack>
    );
  },
);
