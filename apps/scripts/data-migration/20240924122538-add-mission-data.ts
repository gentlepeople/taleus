import {
  EnumMissionCategory,
  EnumResponseType,
  Prisma,
  PrismaClient,
} from '@gentlepeople/taleus-schema';

import { AUTO_MISSION_LENGTH, AUTO_QUESTION_LENGTH } from '../seed/seed.config';
import { sampleName, sampleItem, sampleAuditTimestamps, sampleSentence } from '../seed/seed.method';

export default async ({ prisma = new PrismaClient() }) => {
  const autoMissionData = Array.from<Prisma.missionCreateManyInput, Prisma.missionCreateManyInput>(
    { length: AUTO_MISSION_LENGTH },
    () => ({
      title: sampleName(),
      category: sampleItem(EnumMissionCategory),
      ...sampleAuditTimestamps(),
    }),
  );
  const { count: autoCountMission } = await prisma.mission.createMany({
    data: autoMissionData,
    skipDuplicates: true,
  });

  const findMissions = await prisma.mission.findMany();
  const missionIds = findMissions.map(({ missionId }) => missionId);
  const autoQuestionData = missionIds.flatMap((missionId) =>
    Array.from<Prisma.questionCreateManyInput, Prisma.questionCreateManyInput>(
      { length: AUTO_QUESTION_LENGTH },
      (_, idx) => ({
        missionId,
        questionOrder: idx + 1,
        responseType: EnumResponseType.TEXT,
        content: sampleSentence(),
        ...sampleAuditTimestamps(),
      }),
    ),
  );
  const { count: autoCount } = await prisma.question.createMany({
    data: autoQuestionData,
    skipDuplicates: true,
  });

  await prisma.$disconnect();
};
