import { FC } from 'react';
import { ActivityIndicator } from 'react-native-paper';

import { Box } from '../../components';
import { size } from '../../theme';

type ILoadingSpinnerProps = {};

export const LoadingSpinner: FC<ILoadingSpinnerProps> = () => {
  return (
    <Box flex="fluid" alignX="center" alignY="center" style={{ backgroundColor: '#292929' }}>
      <ActivityIndicator size={size['16-x']} color="#636363" />
    </Box>
  );
};
