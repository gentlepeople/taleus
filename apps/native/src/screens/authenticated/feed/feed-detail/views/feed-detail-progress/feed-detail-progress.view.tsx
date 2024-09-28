import { memo } from 'react';

import { Box, Stack, palette, radius, size, spacing } from '~/mobile-ui';

type IFeed_Detail_ProgressViewProps = {
  progress: number;
};

export const Feed_Detail_ProgressView = memo<IFeed_Detail_ProgressViewProps>(({ progress }) => {
  return (
    <Stack horizontal space={spacing['2-x']} align="center" style={{ justifyContent: 'center' }}>
      {Array.from({ length: 3 }).map((_, i) => {
        const key = `${_}_${i}`;
        const backgroundColor = progress === i + 1 ? palette['primary'] : palette['white-100'];

        return (
          <Box
            key={key}
            style={{
              width: size['1.75-x'],
              height: size['1.75-x'],
              borderRadius: radius['1.75-x'],
              borderWidth: size['0.25-x'],
              borderColor: palette['primary'],
              backgroundColor,
            }}
          />
        );
      })}
    </Stack>
  );
});
