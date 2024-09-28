import { FC } from 'react';
import { ActivityIndicator } from 'react-native-paper';

import { palette, zIndex } from '../../../theme';
import { FillView } from '../fill-view';

export type IMutationIndicatorProps = {};

export const MutationIndicator: FC<IMutationIndicatorProps> = () => {
  return (
    <FillView
      alignX="center"
      alignY="center"
      alignSelf="center"
      style={{
        position: 'absolute',
        zIndex: zIndex['very-high'],
        backgroundColor: palette['white-a60'],
      }}
    >
      <ActivityIndicator animating color={palette['primary']} />
    </FillView>
  );
};
