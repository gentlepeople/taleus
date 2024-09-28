import { NetworkStatus } from '@apollo/client';
import { EnumGender, useAuthCurrentUserQuery } from '@gentlepeople/taleus-codegen';

export type IAuthCurrentUser = {
  id: string;
  nickname: string;
  email: string;
  birthDate: Date;
  coupleStartDate: Date;
  gender: EnumGender;
  personalCode: string;
  isProfileCompleted: boolean;
} | null;

// type MembershipInfo = Merge<CustomerInfo, { activeMembership?: PurchasesEntitlementInfo }>;

type IAuthCurrentUserHookInput = {
  userId: string | null;
};
type IAuthCurrentUserHookReturn = {
  currentUser: IAuthCurrentUser;
  isLoadingCurrentUser: boolean;
};

export const useAuthCurrentUser: Hook<IAuthCurrentUserHookInput, IAuthCurrentUserHookReturn> = ({
  userId,
}) => {
  // const [membershipInfo, setMembershipInfo] = useState<CustomerInfo>(null);
  const {
    data,
    loading: isLoadingUserData,
    networkStatus,
  } = useAuthCurrentUserQuery({
    variables: {
      userId: userId,
    },
    skip: !userId,
    fetchPolicy: 'no-cache',
  });

  // const { execute: fetchMembershipInfo, loading: isFetchingMembershipInfo } = useAsyncCallback(
  //   async () => {
  //     const membershipInfo = await Purchases.getCustomerInfo();
  //     setMembershipInfo(membershipInfo);
  //   },
  // );

  // useDidUpdate(() => {
  //   (async () => {
  //     await fetchMembershipInfo();
  //   })();
  // }, [userId]);

  // Purchases.addCustomerInfoUpdateListener((info) => {
  //   setMembershipInfo(info);
  // });

  if (!userId) {
    return {
      currentUser: null,
      isLoadingCurrentUser: false,
    };
  }

  const isLoadingCurrentUser =
    isLoadingUserData ||
    networkStatus === NetworkStatus.refetch ||
    networkStatus === NetworkStatus.setVariables;
  if (isLoadingCurrentUser) {
    return {
      currentUser: null,
      isLoadingCurrentUser: true,
    };
  }

  const currentUser = data?.user;

  if (!currentUser) {
    return {
      currentUser: null,
      isLoadingCurrentUser: false,
    };
  }

  const nickname = data.user.nickname;
  const email = data.user.email;
  const birthDate = data.user.birthday as Date;
  const coupleStartDate = data.user.coupleStartDate as Date;
  const gender = data.user.gender;
  const personalCode = data.user.personalCode;
  const isProfileCompleted = data.user.isProfileCompleted;

  return {
    currentUser: {
      id: userId,
      nickname,
      email,
      birthDate,
      coupleStartDate,
      gender,
      personalCode,
      isProfileCompleted,
    },
    isLoadingCurrentUser: isLoadingCurrentUser,
  };
};
