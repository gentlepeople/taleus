import { ReactNode, memo } from 'react';

import { BasicLayout, Box } from '~/mobile-ui';

type INotification_MissionLayoutProps = {
  content: ReactNode;
};

export const Notification_MissionLayout = memo<INotification_MissionLayoutProps>(({ content }) => {
  return (
    <BasicLayout>
      <Box flex="fluid">{content}</Box>
    </BasicLayout>
  );
});
