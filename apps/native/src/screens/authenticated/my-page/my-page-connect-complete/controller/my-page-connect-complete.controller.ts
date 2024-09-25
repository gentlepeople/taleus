import { useMyPage_ConnectCompleteNavigation } from './hooks';

type IMyPage_ConnectCompleteControllerInput = void;
type IMyPage_ConnectCompleteControllerOutput = {
  goHome: () => void;
};

export const useMyPage_ConnectCompleteController: Controller<
  IMyPage_ConnectCompleteControllerInput,
  IMyPage_ConnectCompleteControllerOutput
> = () => {
  const { goHome } = useMyPage_ConnectCompleteNavigation();

  return { goHome };
};
