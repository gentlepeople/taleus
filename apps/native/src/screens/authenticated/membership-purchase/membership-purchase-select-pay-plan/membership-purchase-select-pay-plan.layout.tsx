import { ReactNode, memo } from 'react';

import { BasicLayout, Row, Rows, ScrollView } from '~/mobile-ui';

type IMembershipPurchase_SelectPayPlanLayoutProps = {
  content: ReactNode;
  footer: ReactNode;
};

export const MembershipPurchase_SelectPayPlanLayout =
  memo<IMembershipPurchase_SelectPayPlanLayoutProps>(({ content, footer }) => {
    return (
      <BasicLayout>
        <Rows>
          <Row height="fluid">
            <ScrollView>{content}</ScrollView>
          </Row>
          <Row height="content">{footer}</Row>
        </Rows>
      </BasicLayout>
    );
  });
