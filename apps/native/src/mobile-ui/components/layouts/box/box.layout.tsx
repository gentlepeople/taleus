import { Box as MobilyBox } from '@mobily/stacks';
import { ComponentProps } from 'react';

export type IBoxProps = ComponentProps<typeof MobilyBox> & {};

export const Box = MobilyBox;
