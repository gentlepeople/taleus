import { ReactNode, memo } from 'react';
import { BasicLayout, Row, Rows } from '~/mobile-ui';

type IAuthentication_SignUpLayoutProps = {
  content: ReactNode;
  footer: ReactNode;
};

export const Authentication_SignUpLayout = memo<IAuthentication_SignUpLayoutProps>(
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
