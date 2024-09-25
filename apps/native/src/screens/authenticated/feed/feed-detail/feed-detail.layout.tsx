import { ReactNode, memo } from 'react';
import { BasicLayout, Row, Rows, ScrollView } from '~/mobile-ui';

type IFeed_DetailLayoutProps = {
  header: ReactNode;
  content: ReactNode;
  footer: ReactNode;
};

export const Feed_DetailLayout = memo<IFeed_DetailLayoutProps>(({ header, content, footer }) => {
  return (
    <BasicLayout>
      <Rows>
        <Row height="content">{header}</Row>
        <ScrollView>
          <Row height="fluid">{content}</Row>
        </ScrollView>
        <Row height="content">{footer}</Row>
      </Rows>
    </BasicLayout>
  );
});
