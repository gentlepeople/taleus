import { memo, useCallback } from 'react';
import { Pressable } from 'react-native';

import { Column, Columns, Stack, Text, palette, radius, spacing } from '~/mobile-ui';

type IPrimary_Feed_ContentCardViewProps = {
  submissionDate: string;
  questionCategory: string;
  userName: string;
  userAnswer: string;
  partnerName: string;
  partnerAnswer: string;
  questionTitle: string;
  onPress: () => void;
};

export const Primary_Feed_ContentCardView = memo<IPrimary_Feed_ContentCardViewProps>(
  ({
    submissionDate,
    questionCategory,
    userName,
    userAnswer,
    partnerName,
    partnerAnswer,
    questionTitle,
    onPress,
  }) => {
    const handlePressCard = useCallback(() => {
      onPress();
    }, [onPress]);

    return (
      <Pressable
        onPress={handlePressCard}
        style={({ pressed }) => [{ opacity: pressed ? 0.6 : 1 }]}
      >
        <Stack space={spacing['2-x']} paddingX={spacing['4-x']}>
          <Columns space={spacing['2-x']} alignY="center" paddingRight={spacing['6-x']}>
            <Column width="content">
              <Text
                textType="custom"
                textAlignment="center"
                style={{
                  fontFamily: 'Pretendard-Bold',
                  fontSize: 30,
                  lineHeight: 42,
                }}
              >
                {'Q'}
              </Text>
            </Column>
            <Column width="fluid">
              <Text textType="body/16/bold">{questionTitle}</Text>
            </Column>
          </Columns>
          <Stack
            space={spacing['3-x']}
            paddingX={spacing['4-x']}
            paddingTop={spacing['6-x']}
            paddingBottom={spacing['4-x']}
            style={{
              borderRadius: radius['4-x'],
              backgroundColor: palette['content-card-bg'],
            }}
          >
            <Stack space={spacing['1-x']}>
              <Text textType="body/16/bold">{partnerName}</Text>
              <Text textType="card-content" color="text-black" numberOfLines={1}>
                {partnerAnswer}
              </Text>
            </Stack>
            <Stack space={spacing['1-x']}>
              <Text textType="body/16/bold">{userName}</Text>
              <Text textType="card-content" color="text-black" numberOfLines={1}>
                {userAnswer}
              </Text>
            </Stack>
            <Text textType="body/12/bold" color="text-black" textAlignment="right">
              {submissionDate}
            </Text>
          </Stack>
        </Stack>
      </Pressable>
    );
  },
);
