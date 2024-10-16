import { memo, useCallback } from 'react';
import { Pressable } from 'react-native';

import {
  Box,
  Column,
  Columns,
  Icon,
  Inline,
  ScrollView,
  Stack,
  Text,
  TextInput,
  palette,
  radius,
  size,
  spacing,
} from '~/mobile-ui';

type IFeed_Detail_UserAnswerViewProps = {
  userName: string;
  userAnswer: string;
  newContent: string;
  isEdit: boolean;
  onEditStart: () => void;
  onChangeText: (text: string) => void;
};

export const Feed_Detail_UserAnswerView = memo<IFeed_Detail_UserAnswerViewProps>(
  ({ userName, userAnswer, newContent, isEdit, onEditStart, onChangeText }) => {
    const handlePressEdit = useCallback(() => {
      onEditStart();
    }, [onEditStart]);

    if (isEdit) {
      const isLengthOvered = userAnswer.length > 200;

      const handleChangeText = (text: string) => {
        onChangeText(text);
      };

      return (
        <Stack space={spacing['3-x']}>
          <TextInput
            placeholder="답변을 채워주세요"
            currentValue={newContent}
            onChangeText={handleChangeText}
            style={{
              backgroundColor: '#F0F0F0',
              borderRadius: radius['3.75-x'],
              width: size['82-x'],
              height: size['55-x'],
            }}
            multiLine
            isLengthOvered={isLengthOvered}
          />
          <Inline alignX="right">
            <Text textType="body/12/regular" color={isLengthOvered ? 'danger' : 'primary'}>
              {userAnswer.length}
            </Text>
            <Text textType="body/12/regular" color="custom" customColor={'#C1C1C1'}>
              {'/200자'}
            </Text>
          </Inline>
        </Stack>
      );
    }

    return (
      <Stack
        space={spacing['3-x']}
        paddingX={spacing['4-x']}
        paddingY={spacing['6-x']}
        style={{
          borderRadius: radius['3.75-x'],
          backgroundColor: palette['content-card-bg'],
          width: size['82-x'],
          height: size['55-x'],
        }}
      >
        <Columns>
          <Column width="fluid">
            <Text textType="body/16/bold">{userName}</Text>
          </Column>
          <Column width="content">
            <Pressable
              onPress={handlePressEdit}
              style={({ pressed }) => [
                { opacity: pressed ? 0.6 : 1 },
                { marginTop: -spacing['2-x'] },
              ]}
            >
              <Icon name="edit-post" size={size['6-x']} />
            </Pressable>
          </Column>
        </Columns>
        <Box paddingBottom={spacing['6-x']}>
          <ScrollView>
            <Text textType="card-content" color="text-black">
              {userAnswer}
            </Text>
          </ScrollView>
        </Box>
      </Stack>
    );
  },
);
