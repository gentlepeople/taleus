import { ReactNode, memo } from 'react';
import { BasicLayout, Row, Rows } from '~/mobile-ui';

type IMyPage_ConnectCoupleLayoutProps = {
  content: ReactNode;
  footer: ReactNode;
};

export const MyPage_ConnectCoupleLayout = memo<IMyPage_ConnectCoupleLayoutProps>(
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
