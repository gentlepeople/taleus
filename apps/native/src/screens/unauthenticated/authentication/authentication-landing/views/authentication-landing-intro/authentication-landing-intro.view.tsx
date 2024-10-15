import { memo, useRef } from 'react';
import { ImageSourcePropType, useWindowDimensions } from 'react-native';
import { SharedValue } from 'react-native-reanimated';
import Carousel, { ICarouselInstance } from 'react-native-reanimated-carousel';

import {
  CONVERSATION_IMAGE,
  DAILY_IMAGE,
  Image,
  LOGS_IMAGE,
  Stack,
  TALE_US_LOGO,
  Text,
  radius,
  size,
  spacing,
} from '~/mobile-ui';

export type IBannerCarouselItem = {
  title: string;
  description: string;
  imageUri: ImageSourcePropType;
};

type IBannerCarouselContent = {
  item: IBannerCarouselItem;
  index: number;
};

type IAuthentication_Landing_IntroViewProps = {
  progress: SharedValue<number>;
};

export const Authentication_Landing_IntroView = memo<IAuthentication_Landing_IntroViewProps>(
  ({ progress }) => {
    const { width: windowWidth } = useWindowDimensions();
    const carouselRef = useRef<ICarouselInstance>(null);

    const data = [
      {
        imageUri: DAILY_IMAGE,
        title: '매일 새로운 질문으로',
        description: '평소 이야기하지 않은\n색다른 질문과 함께\n매일 새로운 대화를 나눠요!',
      },
      {
        imageUri: CONVERSATION_IMAGE,
        title: '깊고 풍부한 둘만의 대화',
        description: '단순한 대화를 넘어\n깊은 생각과 감정을\n둘이서 함께 공유해요!',
      },
      {
        imageUri: LOGS_IMAGE,
        title: '작지만 소중한 추억',
        description: '조금씩 빠르게 쌓이는\n질문과 답변 목롤을 통해\n둘만의 추억을 만들어가요!',
      },
    ];

    const renderItem = ({ item, index }: IBannerCarouselContent) => {
      const { imageUri, title, description } = item;

      return (
        <Stack
          align="center"
          space={spacing['7-x']}
          paddingBottom={spacing['15-x']}
          style={{
            paddingVertical: spacing['10-x'],
            borderWidth: size['0.25-x'] / 2,
            borderColor: '#00000026',
            borderRadius: radius['2.5-x'],
          }}
        >
          <Image source={imageUri} style={{ width: size['30-x'], height: size['30-x'] }} />
          <Text textType="body/16/bold">{title}</Text>
          <Text textType="body/14/regular" color="black-100" textAlignment="center">
            {description}
          </Text>
        </Stack>
      );
    };

    return (
      <Stack space={spacing['8-x']} paddingTop={spacing['8-x']} align="center">
        <Image source={TALE_US_LOGO} />
        <Carousel
          ref={carouselRef}
          loop={true}
          autoPlay
          autoPlayInterval={2000}
          mode="parallax"
          modeConfig={{
            parallaxScrollingScale: 0.9,
            parallaxScrollingOffset: 50,
          }}
          style={{
            width: windowWidth,
          }}
          data={data}
          renderItem={renderItem}
          vertical={false}
          width={windowWidth}
          height={size['85-x']}
          onProgressChange={progress}
        />
      </Stack>
    );
  },
);
