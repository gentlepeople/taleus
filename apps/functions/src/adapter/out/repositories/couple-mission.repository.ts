import { Injectable, Inject } from '@nestjs/common';

import { DATABASE_PORT, DatabasePort, ICoupleMissionRepository } from '@/ports';

@Injectable()
export class CoupleMissionRepository implements ICoupleMissionRepository {
  constructor(
    @Inject(DATABASE_PORT)
    private readonly databasePort: DatabasePort,
  ) {}

  async createMany(
    data: {
      coupleId: number;
      missionId: number;
    }[],
  ): Promise<number> {
    const { count: createCoupleMissionsCount } = await this.databasePort.coupleMission.createMany({
      data,
    });

    return createCoupleMissionsCount;
  }
}
