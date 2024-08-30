import { FC } from 'react';
import { StyleProp, TextStyle } from 'react-native';
import IconMoon, { IconMoonProps } from 'react-native-icomoon';
import { Merge } from 'type-fest';

import iconMoonConfig from './selection.json';

type IIconProps = Merge<
  Omit<IconMoonProps, 'iconSet'>,
  {
    style?: StyleProp<TextStyle>;
  }
>;

export const Icon: FC<IIconProps> = ({ name, ...restProps }) => {
  return <IconMoon iconSet={iconMoonConfig} name={name} {...restProps} />;
};
