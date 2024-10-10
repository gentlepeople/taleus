import { ReactNode, memo } from 'react';

import { BasicLayout, Row, Rows, ScrollView } from '~/mobile-ui';

type IAuthentication_SignUpLayoutProps = {
  header: ReactNode;
  content: ReactNode;
  footer: ReactNode;
};

export const Authentication_SignUpLayout = memo<IAuthentication_SignUpLayoutProps>(
  ({ header, content, footer }) => {
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
  },
);
