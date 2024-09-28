type ZIndexLevel = 'very-low' | 'low' | 'medium' | 'high' | 'very-high';

type IZIndex = {
  [key in ZIndexLevel]: number;
};

export const zIndex: IZIndex = {
  ['very-low']: 25,
  ['low']: 50,
  ['medium']: 75,
  ['high']: 100,
  ['very-high']: 125,
} as const;
