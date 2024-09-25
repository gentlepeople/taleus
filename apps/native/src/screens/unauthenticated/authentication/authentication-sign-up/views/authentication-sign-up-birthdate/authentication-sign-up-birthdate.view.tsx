import { memo, useCallback, useState } from 'react';
import { Pressable } from 'react-native';
import { Stack, Text, TextInput, size, spacing } from '~/mobile-ui';

type IAuthentication_SignUp_BirthDateViewProps = {
  onPress: () => void;
};

export const Authentication_SignUp_BirthDateView = memo<IAuthentication_SignUp_BirthDateViewProps>(
  ({ onPress }) => {
    const [isPressed, setIsPressed] = useState<boolean>(false);

    const handlePressBirthDate = useCallback(() => {
      onPress();
    }, [onPress]);

    return (
      <Stack paddingX={spacing['6-x']} space={spacing['2-x']}>
        <Text textType="body/14/medium" color="text-black">
          {'생년월일'}
        </Text>
        <Pressable
          onPress={handlePressBirthDate}
          style={({ pressed }) => [{ opacity: pressed ? 0.6 : 1 }]}
        >
          <Stack horizontal align="center" space={spacing['2.5-x']}>
            <Stack horizontal align="center" space={spacing['2-x']}>
              <TextInput
                placeholder="1930"
                currentValue=""
                editable={false}
                width={size['21.25-x']}
                textAlignCenter
              />
              <Text textType="body/14/medium" color="text-black">
                {'년'}
              </Text>
            </Stack>
            <Stack horizontal align="center" space={spacing['2-x']}>
              <TextInput
                placeholder="11"
                currentValue=""
                editable={false}
                width={size['18.5-x']}
                textAlignCenter
              />
              <Text textType="body/14/medium" color="text-black">
                {'월'}
              </Text>
            </Stack>
            <Stack horizontal align="center" space={spacing['2-x']}>
              <TextInput
                placeholder="11"
                currentValue=""
                editable={false}
                width={size['18.5-x']}
                textAlignCenter
              />
              <Text textType="body/14/medium" color="text-black">
                {'일'}
              </Text>
            </Stack>
          </Stack>
        </Pressable>
      </Stack>
    );
  },
);
