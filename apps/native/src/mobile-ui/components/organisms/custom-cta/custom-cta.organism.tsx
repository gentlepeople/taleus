import { FC } from 'react';
import { Pressable } from 'react-native';
import { palette, radius, size, spacing } from '../../../theme';
import { ITextColor, ITextTypes, Icon, Text } from '../../atoms';
import { Box, Stack } from '../../layouts';

export type ICustomCTA = {
  label: string;
  onPress: () => void;
  color?: string;
  iconName?: string;
  textColor?: ITextColor;
  textType?: ITextTypes;
  disabled?: boolean;
};

export type ICustomCTAOrganismProps = {
  paddingX?: number;
  labelPaddingY?: number;
  borderRadius?: number;
  buttons: ICustomCTA[];
};

export const CustomCTA: FC<ICustomCTAOrganismProps> = ({
  buttons,
  paddingX,
  labelPaddingY,
  borderRadius,
}) => {
  return (
    <Stack
      space={spacing['2.5-x']}
      paddingY={spacing['4-x']}
      paddingX={paddingX ? paddingX : spacing['7.5-x']}
      style={{ backgroundColor: palette['white-100'] }}
    >
      {buttons.map(
        ({ label, onPress, color = 'primary', iconName, textColor, textType, disabled }, index) => {
          return (
            <Pressable
              key={index}
              onPress={onPress}
              style={({ pressed }) => [{ opacity: pressed ? 0.6 : 1 }]}
              disabled={disabled}
            >
              <Stack
                horizontal
                align="center"
                style={{
                  backgroundColor: disabled ? palette['disabled'] : palette[color],
                  justifyContent: 'center',
                  borderRadius: borderRadius ? borderRadius : radius['1.5-x'],
                }}
                paddingY={labelPaddingY ? labelPaddingY : spacing['3-x']}
              >
                {iconName ? (
                  <Box padding={spacing['0.625-x']}>
                    <Icon name={iconName} size={size['4.5-x']} />
                  </Box>
                ) : (
                  <Box paddingY={10.25} />
                )}
                <Text
                  textType={textType ? textType : 'button-2'}
                  color={textColor ? textColor : 'black-85'}
                >
                  {label}
                </Text>
              </Stack>
            </Pressable>
          );
        },
      )}
    </Stack>
  );
};
