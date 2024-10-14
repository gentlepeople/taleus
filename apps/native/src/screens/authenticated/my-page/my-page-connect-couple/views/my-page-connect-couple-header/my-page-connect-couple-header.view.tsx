import { memo } from 'react';

import { HeaderOrganism } from '~/mobile-ui';

type IMyPage_ConnectCouple_HeaderViewProps = {
  onExit: () => void;
};

export const MyPage_ConnectCouple_HeaderView = memo<IMyPage_ConnectCouple_HeaderViewProps>(
  ({ onExit }) => {
    return (
      <HeaderOrganism
        title={'커플 연결'}
        titleSize="small"
        left={{ type: 'button' }}
        onPressExit={onExit}
      />
    );
  },
);
