import { memo } from 'react';
import { Box, Skeleton, radius, size, spacing } from '~/mobile-ui';

type IPrimary_Feed_ListFooterSkeletonViewProps = {};

export const Primary_Feed_ListFooterSkeletonView = memo<IPrimary_Feed_ListFooterSkeletonViewProps>(
  () => {
    return (
      <Box paddingX={spacing['4-x']} paddingTop={spacing['6-x']}>
        <Skeleton style={{ width: '100%', height: size['56-x'], borderRadius: radius['3-x'] }} />
      </Box>
    );
  },
);
