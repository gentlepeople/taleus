import { memo } from 'react';
import { SharedValue } from 'react-native-reanimated';
import { Pagination } from 'react-native-reanimated-carousel';
import { palette, radius, size, spacing } from '~/mobile-ui';

type IAuthentication_Landing_ProgressDotsViewProps = {
  progress: SharedValue<number>;
};

export const Authentication_Landing_ProgressDotsView =
  memo<IAuthentication_Landing_ProgressDotsViewProps>(({ progress }) => {
    return (
      <Pagination.Basic
        progress={progress}
        data={[palette['primary'], palette['primary'], palette['primary']]}
        dotStyle={{
          width: size['1.75-x'],
          height: size['1.75-x'],
          borderRadius: radius['1.75-x'],
          borderWidth: size['0.25-x'],
          borderColor: palette['primary'],
        }}
        containerStyle={{
          gap: spacing['2-x'],
        }}
        activeDotStyle={{ backgroundColor: palette['primary'] }}
      />
    );
  });
