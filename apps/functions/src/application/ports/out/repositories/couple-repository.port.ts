import { Couple } from '@/domain';

export const COUPLE_REPOSITORY = Symbol('COUPLE_REPOSITORY');

export interface ICoupleRepository {
  createOneWithAssigningOnboardingMission(
    inviterId: string,
    inviteeId: string,
  ): Promise<Couple | null>;
  findOneByUserId(userId: string): Promise<Couple | null>;
  findOneByCoupleId(coupleId: number): Promise<Couple | null>;
  updateOne(
    coupleId: number,
    data: {
      startDate: Date;
    },
  ): Promise<boolean>;
  findManyWithoutActiveMissionsByNotificationTime(
    hour: number,
    minute: number,
  ): Promise<
    (Couple & {
      coupleMission: {
        missionId: number;
      }[];
    })[]
  >;
}
