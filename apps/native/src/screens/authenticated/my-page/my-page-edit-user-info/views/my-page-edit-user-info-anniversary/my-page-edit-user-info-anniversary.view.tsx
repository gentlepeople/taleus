import { memo, useCallback } from 'react';
import { Pressable } from 'react-native';

import { Stack, Text, TextInput, size, spacing } from '~/mobile-ui';

type IMyPage_EditUserInfo_AnniversaryViewProps = {
  onPress: () => void;
};

export const MyPage_EditUserInfo_AnniversaryView = memo<IMyPage_EditUserInfo_AnniversaryViewProps>(
  ({ onPress }) => {
    const handlePressBirthDate = useCallback(() => {
      onPress();
    }, [onPress]);

    return (
      <Stack paddingX={spacing['6-x']} space={spacing['2-x']}>
        <Text textType="body/14/medium" color="text-black">
          {'우리의 기념일'}
        </Text>
        <Pressable
          onPress={handlePressBirthDate}
          style={({ pressed }) => [{ opacity: pressed ? 0.6 : 1 }]}
        >
          <Stack horizontal align="center" space={spacing['2.5-x']}>
            <Stack horizontal align="center" space={spacing['2-x']}>
              <TextInput
                placeholder="2024"
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
                placeholder="01"
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
                placeholder="01"
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
