import { memo } from 'react';

import { Stack, Text, spacing } from '~/mobile-ui';

type IFeed_Detail_QuestionViewProps = {
  question: string;
};

export const Feed_Detail_QuestionView = memo<IFeed_Detail_QuestionViewProps>(({ question }) => {
  return (
    <Stack horizontal space={spacing['2-x']} align="center">
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
      <Text textType="body/16/bold">{question}</Text>
    </Stack>
  );
});
