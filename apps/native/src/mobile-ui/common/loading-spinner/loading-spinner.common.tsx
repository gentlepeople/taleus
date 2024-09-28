import { FC } from 'react';
import { ActivityIndicator } from 'react-native-paper';

import { Box } from '../../components';
import { palette, size } from '../../theme';

type ILoadingSpinnerProps = {};

export const LoadingSpinner: FC<ILoadingSpinnerProps> = () => {
  return (
    <Box
      flex="fluid"
      alignX="center"
      alignY="center"
      style={{ backgroundColor: palette['white-a60'] }}
    >
      <ActivityIndicator size={size['8-x']} color={palette['primary']} />
    </Box>
  );
};
