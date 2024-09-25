import { memo } from 'react';
import { Box, ScrollView, Stack, Text, palette, radius, size, spacing } from '~/mobile-ui';

type IFeed_Detail_PartnerAnswerViewProps = {
  partnerName: string;
  partnerAnswer: string;
};

export const Feed_Detail_PartnerAnswerView = memo<IFeed_Detail_PartnerAnswerViewProps>(
  ({ partnerName, partnerAnswer }) => {
    return (
      <Stack
        space={spacing['3-x']}
        paddingX={spacing['4-x']}
        paddingY={spacing['6-x']}
        style={{
          borderRadius: radius['3.75-x'],
          backgroundColor: palette['content-card-bg'],
          width: size['82-x'],
          height: size['60-x'],
        }}
      >
        <Text textType="body/16/bold">{partnerName}</Text>
        <Box paddingBottom={spacing['6-x']}>
          <ScrollView>
            <Text textType="card-content" color="text-black">
              {partnerAnswer}
            </Text>
          </ScrollView>
        </Box>
      </Stack>
    );
  },
);
