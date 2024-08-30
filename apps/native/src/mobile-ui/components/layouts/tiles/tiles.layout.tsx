import { Tiles as MobilyTiles } from '@mobily/stacks';
import { ComponentProps } from 'react';

export type ITilesProps = ComponentProps<typeof MobilyTiles> & {};

export const Tiles = MobilyTiles;
