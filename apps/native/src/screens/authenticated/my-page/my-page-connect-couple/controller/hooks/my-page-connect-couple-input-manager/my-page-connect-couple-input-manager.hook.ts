import { useRoute } from '@react-navigation/native';
import isNil from 'lodash/isNil';
import { useCallback, useState } from 'react';
import { MyPage_ConnectCoupleScreenRouteProp } from '../../../my-page-connect-couple.screen';

type IMyPage_ConnectCoupleInputManagerInput = void;
type IMyPage_ConnectCoupleInputManagerOuput = {
  partnerPersonalCode: string;
  changePartnerPersonalCode: (code: string) => void;
};

export const useMyPage_ConnectCoupleInputManager: Hook<
  IMyPage_ConnectCoupleInputManagerInput,
  IMyPage_ConnectCoupleInputManagerOuput
> = () => {
  const { params } = useRoute<MyPage_ConnectCoupleScreenRouteProp>();
  const partnerCodeFromDeeplink = !isNil(params) && params.partnerPersonalCode;

  const [partnerPersonalCode, setPartnerPersonalCode] = useState<string>(
    partnerCodeFromDeeplink ? partnerCodeFromDeeplink : '',
  );

  const changePartnerPersonalCode = useCallback(
    (code: string) => {
      setPartnerPersonalCode(code);
    },
    [setPartnerPersonalCode],
  );

  return { partnerPersonalCode, changePartnerPersonalCode };
};
