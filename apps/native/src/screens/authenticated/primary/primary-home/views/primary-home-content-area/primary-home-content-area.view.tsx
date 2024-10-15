import { memo, useCallback } from 'react';

import { Box, Inline, Stack, Text, TextInput, palette, radius, size, spacing } from '~/mobile-ui';

type IPrimary_Home_ContentAreaViewProps = {
  isWritable: boolean;
  showPartnerAnswer: boolean;
  currentValue: string;
  progress: number;
  onChangeText: (answer: string) => void;
  currentAnswer: string;
  partnerNickname: string;
  currentPartnerAnswer: string;
};

export const Primary_Home_ContentAreaView = memo<IPrimary_Home_ContentAreaViewProps>(
  ({
    isWritable,
    showPartnerAnswer,
    currentValue,
    onChangeText,
    progress,
    currentAnswer,
    partnerNickname,
    currentPartnerAnswer,
  }) => {
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
          <Stack align="center" paddingX={spacing['4-x']} space={spacing['3-x']}>
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
          if (showPartnerAnswer) {
            return `${partnerNickname}님의 첫`;
          }

          return '나의 첫';
        }

        if (progress === 2) {
          if (showPartnerAnswer) {
            return `${partnerNickname}님의 두`;
          }

          return '나의 두';
        }

        if (progress === 3) {
          if (showPartnerAnswer) {
            return `${partnerNickname}님의 세`;
          }

          return '나의 세';
        }
      };

      return (
        <Box paddingX={spacing['4-x']} alignX="center" alignY="center">
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
              {showPartnerAnswer ? currentPartnerAnswer : currentAnswer}
            </Text>
          </Stack>
        </Box>
      );
    };

    return renderContent();
  },
);
