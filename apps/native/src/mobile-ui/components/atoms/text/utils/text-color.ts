import { ColorValue } from 'react-native';

import { palette } from '../../../../theme/palette';

export type IGeneralTextColor =
  | 'primary'
  | 'white-100'
  | 'gray-10'
  | 'gray-20'
  | 'gray-30'
  | 'gray-40'
  | 'gray-50'
  | 'black-85'
  | 'black-100'
  | 'danger'
  | 'text-black'
  | 'disabled';

type ICustomTextColor = 'custom';

export type ITextColor = IGeneralTextColor | ICustomTextColor;

export const getTextColorStyle = (color: ITextColor, customColor?: ColorValue) => {
  if (color === 'primary') {
    return { color: palette['primary'] };
  }

  if (color === 'gray-10') {
    return { color: palette['gray-10'] };
  }

  if (color === 'gray-20') {
    return { color: palette['gray-20'] };
  }

  if (color === 'gray-30') {
    return { color: palette['gray-30'] };
  }

  if (color === 'gray-40') {
    return { color: palette['gray-40'] };
  }

  if (color === 'gray-50') {
    return { color: palette['gray-50'] };
  }

  if (color === 'white-100') {
    return { color: palette['white-100'] };
  }

  if (color === 'black-85') {
    return { color: palette['black-85'] };
  }

  if (color === 'black-100') {
    return { color: palette['black-100'] };
  }

  if (color === 'text-black') {
    return { color: palette['text-black'] };
  }

  if (color === 'danger') {
    return { color: palette['danger'] };
  }

  if (color === 'disabled') {
    return { color: palette['disabled'] };
  }

  if (color === 'custom') {
    return { color: customColor };
  }
};
