import { NetworkStatus } from '@apollo/client';

type ICheckQueryInitialLoadingInput = {
  networkStatus: NetworkStatus;
  hasNoPreviousData: boolean;
};

type ICheckQueryInitialLoadingOutput = boolean;

export const checkQueryInitialLoading: Util<
  ICheckQueryInitialLoadingInput,
  ICheckQueryInitialLoadingOutput
> = ({ networkStatus, hasNoPreviousData }) => {
  return (
    (networkStatus === NetworkStatus.loading || networkStatus === NetworkStatus.setVariables) &&
    hasNoPreviousData
  );
};
