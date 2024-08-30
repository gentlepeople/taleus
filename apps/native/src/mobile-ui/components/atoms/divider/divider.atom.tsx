import { ComponentProps } from 'react';
import { Divider as PaperDivider } from 'react-native-paper';

export type DividerProps = ComponentProps<typeof PaperDivider> & {};

export const Divider = ({ ...props }: DividerProps) => {
  return (
    <PaperDivider
      style={[
        {
          backgroundColor: '#959595',
        },
        props.style,
      ]}
      {...props}
    />
  );
};
