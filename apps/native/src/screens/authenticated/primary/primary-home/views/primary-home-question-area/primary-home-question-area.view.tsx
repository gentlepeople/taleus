import { memo } from 'react';

import { Box, Stack, Text, palette, radius, size, spacing } from '~/mobile-ui';

type IPrimary_Home_QuestionAreaViewProps = {
  question: string;
  progress: number;
};

export const Primary_Home_QuestionAreaView = memo<IPrimary_Home_QuestionAreaViewProps>(
  ({ question, progress }) => {
    return (
      <Stack paddingTop={spacing['3-x']} paddingBottom={spacing['5-x']} space={spacing['5-x']}>
        <Stack space={spacing['1-x']}>
          <Text
            textType="custom"
            textAlignment="center"
            style={{
              fontFamily: 'Pretendard-Bold',
              fontSize: 30,
              lineHeight: 42,
            }}
          >
            {'Q'}
          </Text>
          <Text textType="body/16/bold" textAlignment="center">
            {question}
          </Text>
        </Stack>
        <Stack
          horizontal
          space={spacing['2-x']}
          align="center"
          style={{ justifyContent: 'center' }}
        >
          {Array.from({ length: 3 }).map((_, i) => {
            const key = `${_}_${i}`;
            const backgroundColor = progress === i + 1 ? palette['primary'] : palette['white-100'];

            return (
              <Box
                key={key}
                style={{
                  width: size['1.75-x'],
                  height: size['1.75-x'],
                  borderRadius: radius['1.75-x'],
                  borderWidth: size['0.25-x'],
                  borderColor: palette['primary'],
                  backgroundColor,
                }}
              />
            );
          })}
        </Stack>
      </Stack>
    );
  },
);
