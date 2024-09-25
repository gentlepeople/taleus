import { View } from 'moti';
import { FC, ReactNode } from 'react';
import { useDimensions } from '~/hooks';
import { EDirection } from './slide-view.type';

type ISlideViewOrganismProps = {
  children: ReactNode;
  animationKeyIndex: string;
  animationDirection: EDirection;
};

export const SlideViewOrganism: FC<ISlideViewOrganismProps> = ({
  children,
  animationKeyIndex,
  animationDirection,
}) => {
  const { windowWidth } = useDimensions();

  return (
    <View
      key={animationKeyIndex}
      style={{ flex: 1 }}
      from={{ translateX: animationDirection * windowWidth, opacity: 0 }}
      animate={{ translateX: 0, opacity: 1 }}
      transition={{ type: 'timing', duration: 500 }}
      exit={{
        translateX: animationDirection * windowWidth * -1,
        opacity: 0,
      }}
      exitTransition={{
        type: 'timing',
        duration: 500,
      }}
    >
      {children}
    </View>
  );
};
