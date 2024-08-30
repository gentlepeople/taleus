import { ComponentProps, memo } from 'react';
import { ColorValue } from 'react-native';

import { radius, spacing } from '../../../theme';
import { Button } from '../../atoms';
import { Column, Columns } from '../../layouts';

export type ICTAButton = Omit<ComponentProps<typeof Button>, 'children'> & {
  label: string;
};

export type ICTASectionProps = {
  caption?: string;
  buttons: ICTAButton[];
  backgroundColor?: ColorValue | undefined;
  isFullWidth?: boolean;
  topRound?: boolean;
};

export const CTASection = memo<ICTASectionProps>(
  ({ buttons, backgroundColor, isFullWidth, topRound }) => {
    return (
      <Columns
        space={spacing['4-x']}
        padding={isFullWidth ? 0 : spacing['6-x']}
        style={{
          backgroundColor: backgroundColor && backgroundColor,
          borderTopLeftRadius: topRound && radius['4-x'],
          borderTopRightRadius: topRound && radius['4-x'],
        }}
      >
        {buttons.map(({ mode, label, disabled, ...buttonProps }, index) => (
          <Column key={index}>
            <Button
              {...buttonProps}
              mode={mode || 'contained'}
              disabled={disabled}
              size="xLarge"
              textColor="white"
              isFullWidth={isFullWidth}
            >
              {label}
            </Button>
          </Column>
        ))}
      </Columns>
    );
  }
);
