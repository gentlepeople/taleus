import { ReactNode, memo } from 'react';

import { BasicLayout, Row, Rows, ScrollView } from '~/mobile-ui';

type IMyPage_ConnectCoupleLayoutProps = {
  header: ReactNode;
  content: ReactNode;
};

export const MyPage_ConnectCoupleLayout = memo<IMyPage_ConnectCoupleLayoutProps>(
  ({ header, content }) => {
    return (
      <BasicLayout>
        <Rows>
          <Row height="content">{header}</Row>
          <ScrollView>
            <Row height="fluid">{content}</Row>
          </ScrollView>
        </Rows>
      </BasicLayout>
    );
  },
);
