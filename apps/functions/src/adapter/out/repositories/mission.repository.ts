import { EnumMissionCategory, mission } from '@gentlepeople/taleus-schema';
import { Injectable, Inject } from '@nestjs/common';
import isNull from 'lodash/isNull';

import { Mission } from '@/domain';
import { DATABASE_PORT, DatabasePort, IMissionRepository } from '@/ports';

@Injectable()
export class MissionRepository implements IMissionRepository {
  constructor(
    @Inject(DATABASE_PORT)
    private readonly databasePort: DatabasePort,
  ) {}

  private enumConvert(object: mission): Mission {
    if (isNull(object)) {
      return null;
    }

    return {
      ...object,
      category: object.category as EnumMissionCategory,
    };
  }

  async findAll(): Promise<Mission[]> {
    const findMissions = await this.databasePort.mission.findMany();
    return findMissions.map((mission) => this.enumConvert(mission));
  }
}
