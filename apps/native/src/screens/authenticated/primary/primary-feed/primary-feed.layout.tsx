import { ReactNode, memo } from 'react';

import { BasicLayout, Box, spacing } from '~/mobile-ui';

type IPrimary_FeedLayoutProps = {
  content: ReactNode;
};

export const Primary_FeedLayout = memo<IPrimary_FeedLayoutProps>(({ content }) => {
  return (
    <BasicLayout>
      <Box style={{ height: spacing['6-x'] }} />
      {content}
    </BasicLayout>
  );
});
