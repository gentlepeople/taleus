import { memo, useRef } from 'react';
import { ImageSourcePropType, useWindowDimensions } from 'react-native';
import { useSharedValue } from 'react-native-reanimated';
import Carousel, { ICarouselInstance, Pagination } from 'react-native-reanimated-carousel';

import {
  Box,
  CONVERSATION_IMAGE,
  DAILY_IMAGE,
  Image,
  LOGS_IMAGE,
  Stack,
  TALE_US_LOGO,
  Text,
  palette,
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

type IAuthentication_Landing_IntroViewProps = {};

export const Authentication_Landing_IntroView = memo<IAuthentication_Landing_IntroViewProps>(() => {
  const { width: windowWidth } = useWindowDimensions();
  const carouselRef = useRef<ICarouselInstance>(null);
  const progress = useSharedValue<number>(0);

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

    const paddingLeft = index === 0 ? 100 : 0;
    const paddingRight = index === 2 ? 100 : 0;
    return (
      <Box style={{ paddingHorizontal: spacing['16-x'] }}>
        <Stack
          align="center"
          space={spacing['7-x']}
          style={{
            paddingVertical: spacing['10-x'],
            borderWidth: 0.5,
            borderColor: '#00000026',
            borderRadius: 10,
          }}
        >
          <Image source={imageUri} style={{ width: size['30-x'], height: size['30-x'] }} />
          <Text textType="body/16/bold">{title}</Text>
          <Text textType="body/14/regular" color="black-100" textAlignment="center">
            {description}
          </Text>
        </Stack>
      </Box>
    );
  };

  return (
    <Stack space={spacing['8-x']} paddingTop={spacing['8-x']} align="center">
      <Image source={TALE_US_LOGO} />
      <Carousel
        ref={carouselRef}
        loop={false}
        mode="parallax"
        modeConfig={{
          parallaxScrollingScale: 1,
          parallaxScrollingOffset: 30,
        }}
        style={{
          width: windowWidth,
        }}
        data={data}
        renderItem={renderItem}
        vertical={false}
        width={windowWidth}
        height={340}
        onProgressChange={progress}
      />
      <Box paddingTop={340}>
        <Pagination.Basic
          progress={progress}
          data={[palette['primary'], palette['primary'], palette['primary']]}
          dotStyle={{
            width: size['1.75-x'],
            height: size['1.75-x'],
            borderRadius: radius['1.75-x'],
            borderWidth: size['0.25-x'],
            borderColor: palette['primary'],
          }}
          containerStyle={{ gap: spacing['2-x'] }}
          activeDotStyle={{ backgroundColor: palette['primary'] }}
        />
      </Box>
    </Stack>
  );
});
