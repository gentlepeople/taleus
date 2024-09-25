import { memo } from 'react';
import { HeaderOrganism } from '~/mobile-ui';

type IMyPage_ConnectComplete_HeaderViewProps = {};

export const MyPage_ConnectComplete_HeaderView = memo<IMyPage_ConnectComplete_HeaderViewProps>(
  () => {
    return <HeaderOrganism title={'커플 연결'} titleSize="small" left={{ type: 'button' }} />;
  },
);
