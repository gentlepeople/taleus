import { ReactNode, memo } from 'react';

import { BasicLayout, Row, Rows } from '~/mobile-ui';

type IPrimary_HomeLayoutProps = {
  content: ReactNode;
  footer: ReactNode;
};

export const Primary_HomeLayout = memo<IPrimary_HomeLayoutProps>(({ content, footer }) => {
  return (
    <BasicLayout>
      <Rows>
        <Row height="fluid">{content}</Row>
        <Row height="content">{footer}</Row>
      </Rows>
    </BasicLayout>
  );
});
