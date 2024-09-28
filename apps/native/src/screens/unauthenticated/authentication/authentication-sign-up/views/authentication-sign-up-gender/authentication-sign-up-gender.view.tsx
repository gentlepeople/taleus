import { EnumGender } from '@gentlepeople/taleus-codegen';
import { memo } from 'react';
import { Pressable } from 'react-native';

import { Box, Stack, Text, palette, radius, size, spacing } from '~/mobile-ui';

import { GENDER } from '../../authentication-sign-up.const';

type IAuthentication_SignUp_GenderViewProps = {
  onSelect: (value: EnumGender) => void;
  selectedValue: EnumGender;
};

export const Authentication_SignUp_GenderView = memo<IAuthentication_SignUp_GenderViewProps>(
  ({ onSelect, selectedValue }) => {
    return (
      <Stack paddingX={spacing['6-x']} space={spacing['2-x']}>
        <Text textType="body/14/medium" color="text-black">
          {'성별'}
        </Text>
        <Stack horizontal space={spacing['3.5-x']}>
          {GENDER.map(({ label, value }) => {
            const key = `${label}_${value}`;

            const backgroundColor =
              selectedValue === value ? palette['primary'] : palette['gray-20'];

            const handlePressGender = () => {
              onSelect(value);
            };

            return (
              <Pressable
                key={key}
                onPress={handlePressGender}
                style={({ pressed }) => [{ opacity: pressed ? 0.6 : 1 }]}
              >
                <Box
                  alignX="center"
                  alignY="center"
                  style={{
                    width: size['23.75-x'],
                    height: size['10-x'],
                    backgroundColor,
                    borderRadius: radius['5-x'],
                  }}
                >
                  <Text textType="body/12/regular" color="white-100" textAlignment="center">
                    {label}
                  </Text>
                </Box>
              </Pressable>
            );
          })}
        </Stack>
      </Stack>
    );
  },
);
