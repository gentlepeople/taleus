import { memo } from 'react';

import { HeaderOrganism } from '~/mobile-ui';

type IFeed_Detail_HeaderViewProps = {
  title: string;
};

export const Feed_Detail_HeaderView = memo<IFeed_Detail_HeaderViewProps>(({ title }) => {
  return (
    <HeaderOrganism
      title={title}
      titleSize="small"
      left={{
        type: 'back',
      }}
    />
  );
});
