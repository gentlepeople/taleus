import { NetworkStatus } from '@apollo/client';
import { EnumGender, useAuthCurrentUserQuery } from '@gentlepeople/taleus-codegen';
import isNull from 'lodash/isNull';
import { useState } from 'react';
import { useAsyncCallback } from 'react-async-hook';
import Purchases, { CustomerInfo, PurchasesEntitlementInfo } from 'react-native-purchases';
import { useDidUpdate } from 'rooks';
import { Merge } from 'type-fest';

export type IAuthCurrentUser = {
  id: string;
  nickname: string;
  email: string;
  birthDate: Date;
  coupleStartDate: Date;
  gender: EnumGender;
  personalCode: string;
  isProfileCompleted: boolean;
  isCoupled: boolean;
  coupleId: number;
  partnerNickname: string;
  isPartnerDeleted: boolean;
} | null;

type MembershipInfo = Merge<CustomerInfo, { activeMembership?: PurchasesEntitlementInfo }>;

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
  const [membershipInfo, setMembershipInfo] = useState<CustomerInfo>(null);
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

  const { execute: fetchMembershipInfo, loading: isFetchingMembershipInfo } = useAsyncCallback(
    async () => {
      const membershipInfo = await Purchases.getCustomerInfo();
      setMembershipInfo(membershipInfo);
    },
  );

  useDidUpdate(() => {
    (async () => {
      await fetchMembershipInfo();
    })();
  }, [userId]);

  Purchases.addCustomerInfoUpdateListener((info) => {
    setMembershipInfo(info);
  });

  if (!userId) {
    return {
      currentUser: null,
      isLoadingCurrentUser: false,
    };
  }

  const isLoadingCurrentUser =
    isLoadingUserData ||
    networkStatus === NetworkStatus.refetch ||
    networkStatus === NetworkStatus.setVariables ||
    isFetchingMembershipInfo;
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
  const isCoupled = data.user.isCoupled;
  const coupleId = isCoupled && data.user.couple && data.user.couple.coupleId;
  const partnerNickname = isCoupled ? data.user?.partner?.nickname : '';
  const isPartnerDeleted = isCoupled && data.user.partner && data.user.partner.isDeleted;

  const userActiveEntitlementInfo = !isNull(membershipInfo) && membershipInfo.entitlements.active;
  const userActiveEntitlements = Object.keys(userActiveEntitlementInfo);
  const userActiveMembership = userActiveEntitlements.length > 0 ? userActiveEntitlements[0] : null;
  const userActiveMembershipInfo = userActiveMembership
    ? userActiveEntitlementInfo[userActiveMembership]
    : null;

  const isPremiumUser = !!userActiveMembershipInfo;

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
      isCoupled,
      coupleId,
      partnerNickname,
      isPartnerDeleted,
    },
    isLoadingCurrentUser: isLoadingCurrentUser,
  };
};
