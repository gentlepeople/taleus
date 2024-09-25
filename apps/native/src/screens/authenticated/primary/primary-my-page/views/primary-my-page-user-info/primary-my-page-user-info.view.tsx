import { memo } from 'react';
import { Column, Columns, Stack, Text, spacing } from '~/mobile-ui';

type IPrimary_MyPage_UserInfoViewProps = {
  userName: string;
  datePeriod: number;
  taleUsUsagePeriod: number;
};

export const Primary_MyPage_UserInfoView = memo<IPrimary_MyPage_UserInfoViewProps>(
  ({ userName, datePeriod, taleUsUsagePeriod }) => {
    return (
      <Stack space={spacing['3-x']} padding={spacing['4-x']}>
        <Text textType="biggest" color="text-black">
          {userName}
        </Text>
        <Stack space={spacing['2-x']}>
          <Columns>
            <Column width="fluid">
              <Text textType="banner-content" color="text-black">
                {'우리 커플 연애기간'}
              </Text>
            </Column>
            <Column width="content">
              <Text textType="body/15/bold" color="text-black">
                {`${datePeriod}일`}
              </Text>
            </Column>
          </Columns>
          <Columns>
            <Column width="fluid">
              <Text textType="banner-content" color="text-black">
                {'우리 커플 대화 누적 기간'}
              </Text>
            </Column>
            <Column width="content">
              <Text textType="body/15/bold" color="text-black">
                {`${taleUsUsagePeriod}일`}
              </Text>
            </Column>
          </Columns>
        </Stack>
      </Stack>
    );
  },
);
