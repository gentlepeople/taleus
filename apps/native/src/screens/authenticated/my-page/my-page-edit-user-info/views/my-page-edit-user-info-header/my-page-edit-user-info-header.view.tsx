import { memo } from 'react';

import { HeaderOrganism } from '~/mobile-ui';

type IMyPage_EditUserInfo_HeaderViewProps = {};

export const MyPage_EditUserInfo_HeaderView = memo<IMyPage_EditUserInfo_HeaderViewProps>(() => {
  return <HeaderOrganism title={'개인정보 수정'} titleSize="small" left={{ type: 'button' }} />;
});
