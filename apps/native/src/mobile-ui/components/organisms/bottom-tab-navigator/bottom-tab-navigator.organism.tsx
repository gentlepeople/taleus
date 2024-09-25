import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { FC } from 'react';
import { TouchableOpacity } from 'react-native';
import { Merge } from 'type-fest';

import { size, spacing } from '../../../theme';
import { Text } from '../../atoms';
import { Box, Stack } from '../../layouts';

type IBottomTabNavigatorProps = Merge<BottomTabBarProps, {}>;

export const BottomTabNavigator: FC<IBottomTabNavigatorProps> = ({
  state,
  descriptors,
  navigation,
}) => {
  return (
    <Box
      direction="row"
      style={{
        backgroundColor: '#FFFFFF',
      }}
    >
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const isFocused = state.index === index;

        const getLabel = () => {
          if (options.tabBarLabel) {
            return options.tabBarLabel;
          }

          if (options.title) {
            return options.title;
          }

          return route.name;
        };

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        return (
          <TouchableOpacity
            key={route.key}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={{ flex: 1 }}
          >
            <Stack align="center" paddingY={spacing['3-x']}>
              {options.tabBarIcon({
                focused: isFocused,
                color: isFocused ? '#FF8A00' : '#D1D1D1',
                size: size['6-x'],
              })}
              <Text
                textType="bottom-tab"
                color="custom"
                customColor={isFocused ? '#FF8A00' : '#D1D1D1'}
              >
                {/* @ts-ignore */}
                {getLabel()}
              </Text>
            </Stack>
          </TouchableOpacity>
        );
      })}
    </Box>
  );
};
