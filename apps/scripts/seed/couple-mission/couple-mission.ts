import { Prisma } from '@gentlepeople/taleus-schema';

import { AUTO_COUPLE_MISSION, AUTO_COUPLE_MISSION_LENGTH, seedPrisma } from '../seed.config';
import { generatedLog, sampleAuditTimestamps, sampleItem } from '../seed.method';

export const CoupleMission = async (): Promise<void> => {
  let count = 0;
  if (AUTO_COUPLE_MISSION) {
    const findCouples = await seedPrisma.couple.findMany({});

    const coupleIds = findCouples.map(({ coupleId }) => coupleId);

    const findMissions = await seedPrisma.mission.findMany();
    const missionIds = findMissions.map(({ missionId }) => missionId);
    const calledCouple = new Map<bigint, boolean>();

    const autoCoupleMissionData = Array.from<
      Prisma.coupleMissionCreateManyInput,
      Prisma.coupleMissionCreateManyInput
    >({ length: AUTO_COUPLE_MISSION_LENGTH }, () => {
      const coupleId = sampleItem(coupleIds);
      const isCompleted = calledCouple.get(coupleId);
      if (!isCompleted) {
        calledCouple.set(coupleId, true);
      }
      return {
        coupleId,
        missionId: sampleItem(missionIds),
        isCompleted,
        ...sampleAuditTimestamps(),
      };
    });
    const { count: autoCount } = await seedPrisma.coupleMission.createMany({
      data: autoCoupleMissionData,
      skipDuplicates: true,
    });

    count = autoCount;
  } else {
    // const { count: coupleMissionCount } = await seedPrisma.coupleMissions.createMany({
    //   data: CoupleMissionData.map((item) => ({
    //     ...item,
    //   })),
    //   skipDuplicates: true,
    // });
    // const coupleMissions = await seedPrisma.coupleMissions.findMany();
    // count = coupleMissionCount;
  }

  generatedLog(CoupleMission.name, count);
};
