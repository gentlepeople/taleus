export type ITextTypes =
  | 'headline-1'
  | 'headline-2'
  | 'headline-3'
  | 'body-1'
  | 'body-2'
  | 'bottom-tab';

export const getTextTypeStyle = (textType: ITextTypes) => {
  const textStyleMapping = {
    ['headline-1']: {
      fontSize: 18,
      lineHeight: 28,
      letterSpacing: -0.9,
      fontFamily: 'AppleSDGothicNeoSB',
    },
    ['headline-2']: {
      fontSize: 16,
      lineHeight: 24,
      letterSpacing: -0.8,
      fontFamily: 'AppleSDGothicNeoSB',
    },
    ['headline-3']: {
      fontSize: 14,
      lineHeight: 16,
      letterSpacing: -0.56,
      fontFamily: 'AppleSDGothicNeoSB',
    },
    ['body-1']: {
      fontSize: 14,
      lineHeight: 24,
      letterSpacing: -0.56,
      fontFamily: 'AppleSDGothicNeoR',
    },
    ['body-2']: {
      fontSize: 13,
      lineHeight: 20,
      letterSpacing: -0.65,
      fontFamily: 'AppleSDGothicNeoR',
    },
    ['bottom-tab']: {
      fontSize: 10,
      fontFamily: 'AppleSDGothicNeoSB',
    },
  };

  return textStyleMapping[textType];
};
