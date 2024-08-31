import { Stack as MobilyStack } from '@mobily/stacks';
import { Children, ComponentProps } from 'react';
import flattenChildren from 'react-keyed-flatten-children';
import { Merge } from 'type-fest';

import { spacing } from '../../../theme/spacing';
import { Divider } from '../../atoms';
import { Box } from '../box';

export type IStackProps = Merge<
  ComponentProps<typeof MobilyStack>,
  {
    divider?: boolean;
  }
>;

export const Stack = ({ children, divider, ...props }: IStackProps) => {
  const stackItems = flattenChildren(children);

  return (
    <MobilyStack {...props}>
      {Children.map(stackItems, (child, index) => {
        return (
          <>
            {divider && index > 0 && (
              <Box
                {...(props.horizontal
                  ? { paddingRight: props.space }
                  : { paddingBottom: props.space })}
                paddingX={spacing['1.5-x']}
              >
                <Divider key={index} />
              </Box>
            )}
            {child}
          </>
        );
      })}
    </MobilyStack>
  );
};
