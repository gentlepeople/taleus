import { Couple } from '@/domain';

export const COUPLE_REPOSITORY = Symbol('COUPLE_REPOSITORY');

export interface ICoupleRepository {
  createOneWithAssigningOnboardingMission(
    inviterId: string,
    inviteeId: string,
  ): Promise<Couple | null>;
  findOneByUserId(userId: string): Promise<Couple | null>;
  findOneByCoupleId(coupleId: bigint): Promise<Couple | null>;
  updateOne(
    coupleId: bigint,
    data: {
      startDate: Date;
    },
  ): Promise<boolean>;
  findManyRequiredMissionByNotificationTimeWithLatestCompletedMission(
    hour: number,
    minute: number,
  ): Promise<
    (Couple & {
      latestCoupleMission: {
        missionId: bigint;
      };
    })[]
  >;
}
