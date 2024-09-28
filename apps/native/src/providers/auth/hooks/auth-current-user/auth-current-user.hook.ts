import { EnumGender, useAuthCurrentUserQuery } from '@gentlepeople/taleus-codegen';

export type IAuthCurrentUser = {
  id: string;
  nickname: string;
  email: string;
  birthDate: any;
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
  const { data, loading: isLoadingUserData } = useAuthCurrentUserQuery({
    variables: {
      userId: userId,
    },
    skip: !userId,
    fetchPolicy: 'cache-first',
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

  const isLoadingCurrentUser = isLoadingUserData;
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
  const birthDate = data.user.birthday;
  const gender = data.user.gender;
  const personalCode = data.user.personalCode;
  const isProfileCompleted = true;

  return {
    currentUser: {
      id: userId,
      nickname,
      email,
      birthDate,
      gender,
      personalCode,
      isProfileCompleted,
    },
    isLoadingCurrentUser: isLoadingCurrentUser,
  };
};
