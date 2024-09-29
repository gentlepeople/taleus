import { memo } from 'react';

import { Stack, Text, size, spacing } from '~/mobile-ui';
import { useDimensions } from '../../../../../../hooks';

type IFeed_Detail_QuestionViewProps = {
  question: string;
};

export const Feed_Detail_QuestionView = memo<IFeed_Detail_QuestionViewProps>(({ question }) => {
  const { windowWidth } = useDimensions();

  return (
    <Stack horizontal align="center" paddingX={spacing['4-x']} space={spacing['2-x']}>
      <Text
        textType="custom"
        style={{
          fontFamily: 'Pretendard-Bold',
          fontSize: 30,
          lineHeight: 42,
        }}
      >
        {'Q'}
      </Text>
      <Text textType="body/16/bold" style={{ width: windowWidth - size['16-x'] }}>
        {question}
      </Text>
    </Stack>
  );
});
