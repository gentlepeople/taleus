import { Hidden as MobilyHidden } from '@mobily/stacks';
import { ComponentProps } from 'react';

export type IHiddenProps = ComponentProps<typeof MobilyHidden> & {};

export const Hidden = MobilyHidden;
