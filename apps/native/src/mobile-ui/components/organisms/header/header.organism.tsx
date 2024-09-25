import { useBackHandler } from '@react-native-community/hooks';
import { useNavigation } from '@react-navigation/native';
import { ComponentProps, FC, ReactElement } from 'react';
import { Pressable, ViewStyle, useWindowDimensions } from 'react-native';
import { ValueOf } from 'type-fest';
import { size, spacing } from '../../../theme';
import { Icon, Text } from '../../atoms';
import { Box, Stack } from '../../layouts';

type IHeaderOrganismProps = {
  title?: string | ReactElement;
  titleSize?: 'small' | 'large';
  onPressExit?: () => void;
  right?: {
    type: string;
    text: string;
    onPress?: () => void;
    label?: string;
  };
  transparent?: boolean;
  left?: {
    type: string;
    text?: string;
  };
  style?: ViewStyle;
  backgroundColor?: string;
  titleColor?: Exclude<ValueOf<ComponentProps<typeof Text>, 'color'>, 'custom'>;
};

export const HeaderOrganism: FC<IHeaderOrganismProps> = ({
  title,
  titleSize = 'large',
  onPressExit,
  right,
  left,
  style,
  transparent,
  backgroundColor,
  titleColor,
}) => {
  const navigation = useNavigation();
  const { width } = useWindowDimensions();

  useBackHandler(() => {
    if (!!onPressExit) {
      onPressExit();
      return true;
    }
    return false;
  });

  const renderLeft = () => {
    const { type: leftButtonType, text } = left;

    if (leftButtonType === null) {
      return null;
    }

    const handlePressLeftButton = () => {
      if (!!onPressExit) {
        onPressExit();
        return;
      }

      if (navigation.canGoBack()) {
        navigation.goBack();
      }
    };

    // 나중에는 left button type back이랑 close 로 구분? 아이콘 뒤로가기 and 닫기 버튼

    return (
      <Pressable
        onPress={handlePressLeftButton}
        style={({ pressed }) => [{ opacity: pressed ? 0.6 : 1 }]}
      >
        <Icon name="arrow-left" size={size['6-x']} />
      </Pressable>
    );
  };

  const renderRight = () => {
    return null;
  };

  return (
    <Stack
      style={{
        ...(transparent && {
          position: 'absolute',
          zIndex: 1,
        }),
        elevation: 0.5,
        borderBottomWidth: 0.1,
      }}
    >
      <Box
        alignX="between"
        alignY="center"
        style={[
          {
            height: size['16-x'],
            width: '100%',
          },
          style,
        ]}
        direction="row"
      >
        <Box
          paddingLeft={spacing['4-x']}
          alignX="left"
          alignY="center"
          style={{
            flexGrow: 1,
            flexBasis: spacing['18-x'],
            flexShrink: 0,
          }}
        >
          {left ? renderLeft() : null}
        </Box>
        <Box
          alignX="center"
          alignY="center"
          style={{
            flexBasis: 'auto',
            flexShrink: 0,
            maxWidth: width - 2 * spacing['18-x'],
          }}
        >
          {typeof title === 'string' ? (
            <Text
              textType={titleSize === 'large' ? 'header' : 'header-2'}
              textAlignment="center"
              color={titleColor ? titleColor : 'text-black'}
              numberOfLines={1}
            >
              {title}
            </Text>
          ) : (
            title
          )}
        </Box>
        <Box
          paddingRight={spacing['4-x']}
          alignX="right"
          alignY="center"
          style={{ flexGrow: 1, flexBasis: spacing['18-x'], flexShrink: 0 }}
        >
          {right ? renderRight() : null}
        </Box>
      </Box>
    </Stack>
  );
};
