import { FC, ReactNode } from 'react';
import { BasicLayout, Row, Rows, ScrollView } from '~/mobile-ui';

type IPrimary_MyPageLayoutProps = {
  header: ReactNode;
  content: ReactNode;
};

export const Primary_MyPageLayout: FC<IPrimary_MyPageLayoutProps> = ({ header, content }) => {
  return (
    <BasicLayout>
      <Rows>
        <Row height="content">{header}</Row>
        <ScrollView contentContainerStyle={{ flex: 1 }}>
          <Row height="fluid">{content}</Row>
        </ScrollView>
      </Rows>
    </BasicLayout>
  );
};
