import { Inline as MobilyInline } from '@mobily/stacks';
import { ComponentProps } from 'react';

export type IInlineProps = ComponentProps<typeof MobilyInline> & {};

export const Inline = MobilyInline;
