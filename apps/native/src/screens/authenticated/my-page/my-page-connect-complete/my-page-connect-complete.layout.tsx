import { ReactNode, memo } from 'react';
import { BasicLayout, Row, Rows, ScrollView } from '~/mobile-ui';

type IMyPage_ConnectCompleteLayoutProps = {
  header: ReactNode;
  content: ReactNode;
};

export const MyPage_ConnectCompleteLayout = memo<IMyPage_ConnectCompleteLayoutProps>(
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
