import { memo, useCallback } from 'react';

import { Box, Inline, Stack, Text, TextInput, palette, radius, size, spacing } from '~/mobile-ui';

type IPrimary_Home_ContentAreaViewProps = {
  isWritable: boolean;
  currentValue: string;
  progress: number;
  onChangeText: (answer: string) => void;
  currentAnswer: string;
};

export const Primary_Home_ContentAreaView = memo<IPrimary_Home_ContentAreaViewProps>(
  ({ isWritable, currentValue, onChangeText, progress, currentAnswer }) => {
    const handleChangeText = useCallback(
      (text: string) => {
        onChangeText(text);
      },
      [onChangeText],
    );

    const renderContent = () => {
      if (isWritable) {
        const isLengthOvered = currentValue.length > 200;

        return (
          <Stack paddingX={spacing['4-x']} space={spacing['3-x']}>
            <TextInput
              placeholder="답변을 채워주세요"
              currentValue={currentValue}
              onChangeText={handleChangeText}
              style={{
                backgroundColor: '#F0F0F0',
                borderRadius: radius['3.75-x'],
                width: size['82-x'],
                height: size['70-x'],
              }}
              multiLine
              isLengthOvered={isLengthOvered}
            />
            <Inline alignX="right">
              <Text textType="body/12/regular" color={isLengthOvered ? 'danger' : 'primary'}>
                {currentValue.length}
              </Text>
              <Text textType="body/12/regular" color="custom" customColor={'#C1C1C1'}>
                {'/200자'}
              </Text>
            </Inline>
          </Stack>
        );
      }

      const getTitle = () => {
        if (progress === 1) {
          return '첫';
        }

        if (progress === 2) {
          return '두';
        }

        if (progress === 3) {
          return '세';
        }
      };

      return (
        <Box paddingX={spacing['4-x']}>
          <Stack
            space={spacing['3-x']}
            paddingX={spacing['4-x']}
            paddingY={spacing['6-x']}
            style={{
              backgroundColor: palette['banner-bg'],
              borderRadius: radius['3.75-x'],
              width: size['82-x'],
              height: size['70-x'],
            }}
          >
            <Text textType="body/16/bold">{`나의 ${getTitle()}번째 답변`}</Text>
            <Text textType="body/14/regular" color="text-black">
              {currentAnswer}
            </Text>
          </Stack>
        </Box>
      );
    };

    return renderContent();
  },
);
