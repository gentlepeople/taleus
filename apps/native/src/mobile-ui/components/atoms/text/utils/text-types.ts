export type ITextTypes =
  | 'title/20/bold'
  | 'title/18/bold'
  | 'subtitle/16/bold'
  | 'subtitle/16/semibold'
  | 'body/16/bold'
  | 'body/16/semibold'
  | 'body/16/regular'
  | 'body/14/bold'
  | 'body/14/semibold'
  | 'body/14/medium'
  | 'body/14/regular'
  | 'body/12/bold'
  | 'body/12/semibold'
  | 'body/12/regular'
  | 'body/15/bold'
  | 'caption'
  | 'button'
  | 'button-2'
  | 'bottom-tab'
  | 'header'
  | 'header-2'
  | 'banner'
  | 'banner-content'
  | 'banner-button'
  | 'card-content'
  | 'biggest'
  | 'custom';

export const getTextTypeStyle = (textType: ITextTypes) => {
  const textStyleMapping = {
    ['title/20/bold']: {
      fontFamily: 'Pretendard-Bold',
      fontSize: 20,
      lineHeight: 23.87,
    },
    ['title/18/bold']: {
      fontFamily: 'Pretendard-Bold',
      fontSize: 18,
      lineHeight: 25.2,
    },
    ['subtitle/16/bold']: {
      fontFamily: 'Pretendard-Bold',
      fontSize: 16,
      lineHeight: 19.09,
    },
    ['subtitle/16/semibold']: {
      fontFamily: 'Pretendard-SemiBold',
      fontSize: 16,
      lineHeight: 19.09,
    },
    ['body/16/bold']: {
      fontFamily: 'Pretendard-Bold',
      fontSize: 16,
      lineHeight: 22.4,
    },
    ['body/16/semibold']: {
      fontFamily: 'Pretendard-SemiBold',
      fontSize: 16,
      lineHeight: 19.09,
    },
    ['body/16/regular']: {
      fontFamily: 'Pretendard-Regular',
      fontSize: 16,
      lineHeight: 19.09,
    },
    ['body/14/bold']: {
      fontFamily: 'Pretendard-Bold',
      fontSize: 14,
      lineHeight: 19.6,
    },
    ['body/14/semibold']: {
      fontFamily: 'Pretendard-SemiBold',
      fontSize: 14,
      lineHeight: 16.71,
    },
    ['body/14/medium']: {
      fontFamily: 'Pretendard-Medium',
      fontSize: 14,
      lineHeight: 20.27,
    },
    ['body/14/regular']: {
      fontFamily: 'Pretendard-Regular',
      fontSize: 14,
      lineHeight: 19.6,
    },
    ['body/12/bold']: {
      fontFamily: 'Pretendard-Bold',
      fontSize: 12,
      lineHeight: 16.8,
    },
    ['body/12/semibold']: {
      fontFamily: 'Pretendard-SemiBold',
      fontSize: 12,
      lineHeight: 14.32,
    },
    ['body/12/regular']: {
      fontFamily: 'Pretendard-Regular',
      fontSize: 12,
      lineHeight: 14.32,
    },
    ['caption']: {
      fontFamily: 'Pretendard-Regular',
      fontSize: 12,
      lineHeight: 14.32,
    },
    ['button']: {
      fontFamily: 'Pretendard-Medium',
      fontSize: 18,
      lineHeight: 26.06,
    },
    'button-2': {
      fontFamily: 'Pretendard-SemiBold',
      fontSize: 15,
      lineHeight: 22.5,
    },
    'bottom-tab': {
      fontFamily: 'Pretendard-Regular',
      fontSize: 8,
      lineHeight: 11.58,
    },
    header: {
      fontFamily: 'Pretendard-Medium',
      fontSize: 21,
      lineHeight: 30.41,
    },
    'header-2': {
      fontFamily: 'Pretendard-Medium',
      fontSize: 15,
      lineHeight: 18.82,
    },
    banner: {
      fontFamily: 'Pretendard-Bold',
      fontSize: 13,
      lineHeight: 18.82,
    },
    'banner-content': {
      fontFamily: 'Pretendard-Regular',
      fontSize: 15,
      lineHeight: 15,
    },
    'banner-button': {
      fontFamily: 'Pretendard-Regular',
      fontSize: 13,
      lineHeight: 14,
    },
    'card-content': {
      fontFamily: 'Pretendard-Regular',
      fontSize: 15,
      lineHeight: 25.5,
    },
    biggest: {
      fontFamily: 'Pretendard-Bold',
      fontSize: 25,
      lineHeight: 36.2,
    },
    ['body/15/bold']: {
      fontFamily: 'Pretendard-Bold',
      fontSize: 15,
      lineHeight: 15,
    },
    custom: {},
  };

  return textStyleMapping[textType];
};
