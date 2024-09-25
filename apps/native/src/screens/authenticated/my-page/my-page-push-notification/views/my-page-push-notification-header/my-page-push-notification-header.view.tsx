import { memo } from 'react';
import { HeaderOrganism } from '~/mobile-ui';

type IMyPage_PushNotification_HeaderViewProps = {};

export const MyPage_PushNoficiation_HeaderView = memo<IMyPage_PushNotification_HeaderViewProps>(
  () => {
    return <HeaderOrganism title={'알림 설정'} titleSize="small" left={{ type: 'button' }} />;
  },
);
