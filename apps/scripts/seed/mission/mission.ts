import { EnumMissionCategory, Prisma } from '@gentlepeople/taleus-schema';

import { AUTO_MISSION, AUTO_MISSION_LENGTH, seedPrisma } from '../seed.config';
import { generatedLog, sampleAuditTimestamps, sampleItem, sampleName } from '../seed.method';

export const Mission = async (): Promise<void> => {
  let count = 0;
  if (AUTO_MISSION) {
    const autoMissionData = Array.from<
      Prisma.missionCreateManyInput,
      Prisma.missionCreateManyInput
    >({ length: AUTO_MISSION_LENGTH }, () => ({
      title: sampleName(),
      category: sampleItem(EnumMissionCategory),
      ...sampleAuditTimestamps(),
    }));
    const { count: autoCount } = await seedPrisma.mission.createMany({
      data: autoMissionData,
      skipDuplicates: true,
    });

    count = autoCount;
  } else {
    // const { count: missionCount } = await seedPrisma.missions.createMany({
    //   data: MissionData.map((item) => ({
    //     ...item,
    //   })),
    //   skipDuplicates: true,
    // });
    // const missions = await seedPrisma.missions.findMany();
    // count = missionCount;
  }

  generatedLog(Mission.name, count);
};
