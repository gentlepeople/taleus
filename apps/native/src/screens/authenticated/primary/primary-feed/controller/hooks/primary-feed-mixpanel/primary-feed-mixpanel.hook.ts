import dayjs from 'dayjs';
import { useCallback } from 'react';
import { EMixpanelEventType, useMixpanel } from '~/providers';
import { convertCategory } from '~/utils';
import { ISelectRecordMixpanelEventParams } from '../../../primary-feed.type';

type IPrimary_FeedMixpanelInput = void;
type IPrimary_FeedMixpanelOutput = {
  selectRecordMixpanelEvent: ({
    missionId,
    questionIds,
    questionOrders,
    category,
    formattedDate,
  }: ISelectRecordMixpanelEventParams) => void;
};

export const usePrimary_FeedMixpanel: Hook<
  IPrimary_FeedMixpanelInput,
  IPrimary_FeedMixpanelOutput
> = () => {
  const { mixpanel } = useMixpanel();

  const selectRecordMixpanelEvent = useCallback(
    ({
      missionId,
      questionIds,
      questionOrders,
      category,
      formattedDate,
    }: ISelectRecordMixpanelEventParams) => {
      const submitDate = dayjs(formattedDate, 'YYYY/MM/DD').toDate();
      const questionCategory = convertCategory(category);

      mixpanel.trackEvent({
        type: EMixpanelEventType.SELECT_RECORD,
        properties: {
          mission_id: missionId,
          question_ids: questionIds,
          question_orders: questionOrders,
          question_category: questionCategory,
          submit_date: submitDate,
        },
      });
    },
    [mixpanel, dayjs],
  );

  return { selectRecordMixpanelEvent };
};
