import { useMyPage_ConnectCompleteData, useMyPage_ConnectCompleteNavigation } from './hooks';

type IMyPage_ConnectCompleteControllerInput = void;
type IMyPage_ConnectCompleteControllerOutput = {
  goHome: () => void;
  isPartnerDataLoading: boolean;
  nickname: string;
  partnerNickname: string;
};

export const useMyPage_ConnectCompleteController: Controller<
  IMyPage_ConnectCompleteControllerInput,
  IMyPage_ConnectCompleteControllerOutput
> = () => {
  const { goHome } = useMyPage_ConnectCompleteNavigation();
  const { isPartnerDataLoading, nickname, partnerNickname } = useMyPage_ConnectCompleteData();

  return { goHome, isPartnerDataLoading, nickname, partnerNickname };
};
