import { Column as MobilyColumn } from '@mobily/stacks';
import { ComponentProps } from 'react';

export type IColumnProps = ComponentProps<typeof MobilyColumn> & {};

export const Column = MobilyColumn;
