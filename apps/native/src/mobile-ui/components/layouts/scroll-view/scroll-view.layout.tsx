import { ComponentProps, FC, MutableRefObject } from 'react';
import { ScrollView as RNScrollView } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import { spacing } from '../../../theme/spacing';
import { useScroll } from '../../../ui-providers';

export type IScrollViewProps = Omit<ComponentProps<typeof KeyboardAwareScrollView>, 'innerRef'> & {
  scrollEventThrottle?: number;
  contentOffset?: number;
  innerRef?: MutableRefObject<RNScrollView>;
};

const NativeScrollView = (props) => (
  <KeyboardAwareScrollView contentInset={{ top: 0 }} {...props} />
);

export const ScrollView: FC<IScrollViewProps> = ({
  showsVerticalScrollIndicator = false,
  showsHorizontalScrollIndicator = false,
  keyboardShouldPersistTaps = 'handled',
  scrollEnabled: independentScrollEnabled = true,
  ...props
}) => {
  const { scrollEnabledState } = useScroll();

  return (
    <NativeScrollView
      showsVerticalScrollIndicator={showsVerticalScrollIndicator}
      showsHorizontalScrollIndicator={showsHorizontalScrollIndicator}
      keyboardShouldPersistTaps={keyboardShouldPersistTaps}
      scrollEnabled={scrollEnabledState ?? independentScrollEnabled}
      enableAutomaticScroll
      resetScrollToCoords={{ x: 0, y: 0 }}
      fadingEdgeLength={spacing['4-x']}
      {...props}
    />
  );
};
