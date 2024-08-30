export type ITextAligns = 'auto' | 'left' | 'right' | 'center' | 'justify';

export const getTextAlignStyle = (textAlign?: ITextAligns): { textAlign: ITextAligns } => {
  if (!textAlign) {
    return { textAlign: 'auto' };
  }
  return { textAlign };
};
