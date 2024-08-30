import NativeLottie from 'lottie-react-native';
import { ComponentProps, forwardRef, ForwardRefExoticComponent, RefAttributes } from 'react';
import { Merge } from 'type-fest';

export type ILottieProps = Merge<ComponentProps<typeof NativeLottie>, {}>;

interface CompoundedComponent
  extends ForwardRefExoticComponent<
    ComponentProps<typeof NativeLottie> & RefAttributes<NativeLottie>
  > {}

export const Lottie = forwardRef<NativeLottie, ILottieProps>(({ source, ...rest }, ref) => {
  return <NativeLottie source={source} ref={ref} {...rest} />;
}) as CompoundedComponent;
