import { Injectable, Inject } from '@nestjs/common';

import { DATABASE_PORT, DatabasePort, IMissionReminderRepository } from '@/ports';

@Injectable()
export class MissionReminderRepository implements IMissionReminderRepository {
  constructor(
    @Inject(DATABASE_PORT)
    private readonly databasePort: DatabasePort,
  ) {}

  async findLatestDateByCoupleMissionId(coupleMissionId: bigint): Promise<Date | null> {
    const findMissionReminder = await this.databasePort.missionReminder.findFirst({
      where: {
        coupleMissionId,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
    return findMissionReminder ? findMissionReminder.reminderTime : null;
  }

  async createOneAndIncrementCount(data: {
    coupleMissionId: bigint;
    senderId: string;
    receiverId: string;
    reminderTime: Date;
  }): Promise<boolean> {
    await this.databasePort.$transaction(async (tx) => {
      await tx.missionReminder.create({
        data,
      });
      await tx.coupleMission.update({
        where: {
          coupleMissionId: data.coupleMissionId,
        },
        data: {
          reminderCount: {
            increment: 1,
          },
        },
      });
    });
    return true;
  }
}
