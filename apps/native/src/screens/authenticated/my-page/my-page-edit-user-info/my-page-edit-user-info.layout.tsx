import { ReactNode, memo } from 'react';

import { BasicLayout, Row, Rows } from '~/mobile-ui';

type IMyPage_EditUserInfoLayoutProps = {
  content: ReactNode;
  footer: ReactNode;
};

export const MyPage_EditUserInfoLayout = memo<IMyPage_EditUserInfoLayoutProps>(
  ({ content, footer }) => {
    return (
      <BasicLayout>
        <Rows>
          <Row height="fluid">{content}</Row>
          <Row height="content">{footer}</Row>
        </Rows>
      </BasicLayout>
    );
  },
);
