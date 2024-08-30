import { Columns as MobilyColumns } from '@mobily/stacks';
import { ComponentProps } from 'react';

export type IColumnsProps = ComponentProps<typeof MobilyColumns> & {};

export const Columns = MobilyColumns;
