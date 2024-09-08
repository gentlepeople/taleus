import { Inject, Injectable } from '@nestjs/common';
import isNull from 'lodash/isNull';

import { User } from '@/domain';
import {
  IUserRepository,
  USER_REPOSITORY,
  RegisterCoupleUsecase,
  COUPLE_REPOSITORY,
  ICoupleRepository,
} from '@/ports';

@Injectable()
export class RegisterCoupleService implements RegisterCoupleUsecase {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepository: IUserRepository,
    @Inject(COUPLE_REPOSITORY)
    private readonly coupleRepository: ICoupleRepository,
  ) {}

  async execute(
    inviterId: string,
    inviteePersonalCode: string,
  ): Promise<{ success: boolean; code?: string; message?: string }> {
    const findInvitee = await this.userRepository.findOneByPersonalCode(inviteePersonalCode);
    if (isNull(findInvitee)) {
      return {
        success: false,
        code: 'INVALID_CODE',
        message: "The invitee's personal code is invalid. Please enter it again.",
      };
    }
    const { userId: inviteeId } = findInvitee;

    const inviterCouple = await this.coupleRepository.findOneByUserId(inviterId);
    const isInviterAlreadyInCouple = !isNull(inviterCouple);
    if (isInviterAlreadyInCouple) {
      return {
        success: false,
        code: 'USER_ALREADY_IN_COUPLE',
        message: 'The user is already in a couple and cannot register with another partner.',
      };
    }

    const inviteeCouple = await this.coupleRepository.findOneByUserId(inviteeId);
    const isInviteeAlreadyInCouple = !isNull(inviteeCouple);
    if (isInviteeAlreadyInCouple) {
      return {
        success: false,
        code: 'INVITEE_ALREADY_IN_COUPLE',
        message: 'The invitee is already in a couple. Please choose another invitee.',
      };
    }

    await this.coupleRepository.createOneWithAssigningOnboardingMission(inviterId, inviteeId);

    return { success: true };
  }

  async findOneByUserId(userId: string): Promise<User | null> {
    const findUser = await this.userRepository.findOneByUserId(userId);
    return findUser;
  }

  async findPartnerByUserId(userId: string): Promise<User | null> {
    const findPartner = await this.userRepository.findPartnerByUserId(userId);

    return findPartner;
  }
}
