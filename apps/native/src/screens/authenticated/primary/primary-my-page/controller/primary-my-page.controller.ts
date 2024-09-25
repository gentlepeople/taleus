import { usePrimary_MyPageNavigation } from './hooks';

type IPrimary_MyPageControllerInput = void;
type IPrimary_MyPageControllerOutput = {
  goEditUserInfo: () => void;
  goConnectCouple: () => void;
  goPushNotification: () => void;
};

export const usePrimary_MyPageController: Controller<
  IPrimary_MyPageControllerInput,
  IPrimary_MyPageControllerOutput
> = () => {
  const { goWebView, goEditUserInfo, goConnectCouple, goPushNotification, goLanding } =
    usePrimary_MyPageNavigation();

  return { goEditUserInfo, goConnectCouple, goPushNotification };
};
