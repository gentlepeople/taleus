import { memo } from 'react';

import { HeaderOrganism } from '~/mobile-ui';

type IPrimary_MyPage_HeaderViewProps = {};

export const Primary_MyPage_HeaderView = memo<IPrimary_MyPage_HeaderViewProps>(() => {
  return <HeaderOrganism title="마이페이지" titleSize="small" />;
});
