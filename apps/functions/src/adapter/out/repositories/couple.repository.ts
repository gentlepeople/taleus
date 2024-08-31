import { Injectable, Inject } from '@nestjs/common';

import { Couple } from '@/domain';
import { DATABASE_PORT, DatabasePort, ICoupleRepository } from '@/ports';

@Injectable()
export class CoupleRepository implements ICoupleRepository {
  constructor(
    @Inject(DATABASE_PORT)
    private readonly databasePort: DatabasePort,
  ) {}

  async createOne(inviterId: string, inviteeId: string): Promise<Couple | null> {
    const createCouple = await this.databasePort.couple.create({
      data: {
        inviterId,
        inviteeId,
      },
    });
    return createCouple;
  }

  async findOneByUserId(userId: string): Promise<Couple | null> {
    const findCouple = await this.databasePort.couple.findFirst({
      where: {
        OR: [
          {
            inviteeId: userId,
          },
          { inviterId: userId },
        ],
      },
    });

    return findCouple;
  }
}
