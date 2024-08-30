import { ColorValue } from 'react-native';

import { palette } from '../../../../theme/palette';

export type IGeneralTextColor = 'textPrimary' | 'textSecondary' | 'white' | 'blueMain';

type ICustomTextColor = 'custom';

export type ITextColor = IGeneralTextColor | ICustomTextColor;

export const getTextColorStyle = (color: ITextColor, customColor?: ColorValue) => {
  if (color === 'textPrimary') {
    return { color: palette['black-100'] };
  }

  if (color === 'textSecondary') {
    return { color: palette['black-80'] };
  }

  if (color === 'white') {
    return { color: palette['white-100'] };
  }

  if (color === 'blueMain') {
    return { color: palette['blue-main'] };
  }

  if (color === 'custom') {
    return { color: customColor };
  }
};
