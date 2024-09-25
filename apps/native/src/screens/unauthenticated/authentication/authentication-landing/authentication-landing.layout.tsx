import { ReactNode, memo } from 'react';
import { BasicLayout, Row, Rows } from '~/mobile-ui';

type IAuthentication_LandingLayoutProps = {
  content: ReactNode;
  footer: ReactNode;
};

export const Authentication_LandingLayout = memo<IAuthentication_LandingLayoutProps>(
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
