import { memo } from 'react';

import { EMPTY_LIST_LOTTIE, Lottie, Stack, Text, size, spacing } from '~/mobile-ui';

type IPrimary_Feed_ContentEmptyViewProps = {};

export const Primary_Feed_ContentEmptyView = memo<IPrimary_Feed_ContentEmptyViewProps>(() => {
  return (
    <Stack align="center" paddingTop={spacing['40-x']} space={spacing['2-x']}>
      <Lottie
        source={EMPTY_LIST_LOTTIE}
        style={{ width: size['50-x'], height: size['50-x'] }}
        autoPlay
      />
      <Text textType="title/20/bold" textAlignment="center">
        {'아직 답변이 완료된 질문이 없어요\n상대방과 같이 답변해봐요!'}
      </Text>
    </Stack>
  );
});
