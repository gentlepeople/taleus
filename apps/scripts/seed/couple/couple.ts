import { Prisma } from '@gentlepeople/taleus-schema';

import { AUTO_COUPLE, seedPrisma } from '../seed.config';
import { generatedLog, sampleAuditTimestamps, samplePastTime } from '../seed.method';

export const Couple = async (): Promise<void> => {
  let count = 0;
  if (AUTO_COUPLE) {
    const findUsers = await seedPrisma.user.findMany({
      where: {
        deletedAt: null,
      },
    });
    const userIds = findUsers.map(({ userId }) => userId);

    const AUTO_COUPLE_LENGTH = Math.floor(userIds.length / 2);

    const autoCoupleData = Array.from<Prisma.coupleCreateManyInput, Prisma.coupleCreateManyInput>(
      { length: AUTO_COUPLE_LENGTH },
      (_, idx) => ({
        inviterId: userIds[idx * 2],
        inviteeId: userIds[idx * 2 + 1],
        startDate: samplePastTime(),
        ...sampleAuditTimestamps(),
      }),
    );

    const { count: autoCount } = await seedPrisma.couple.createMany({
      data: autoCoupleData,
      skipDuplicates: true,
    });

    count = autoCount;
  } else {
    // const { count: coupleCount } = await seedPrisma.couples.createMany({
    //   data: CoupleData.map((item) => ({
    //     ...item,
    //   })),
    //   skipDuplicates: true,
    // });
    // const couples = await seedPrisma.couples.findMany();
    // count = coupleCount;
  }

  generatedLog(Couple.name, count);
};
