import { Prisma } from '@gentlepeople/taleus-schema';

import { AUTO_RESPONSE, ONBOARDING_MISSION_ID, seedPrisma } from '../seed.config';
import { generatedLog, sampleAuditTimestamps, sampleSentence } from '../seed.method';

export const Response = async (): Promise<void> => {
  let count = 0;
  if (AUTO_RESPONSE) {
    const autoResponseData: Prisma.responseCreateManyInput[] = [];
    const onboardingMissionQuestions = await seedPrisma.question.findMany({
      where: {
        missionId: ONBOARDING_MISSION_ID,
      },
    });
    const requiredOnboardingUsers = await seedPrisma.user.findMany({
      where: {
        OR: [
          {
            coupleAsInvitee: {
              isNot: null,
            },
          },
          {
            coupleAsInvitee: {
              isNot: null,
            },
          },
        ],
      },
    });
    autoResponseData.push(
      ...requiredOnboardingUsers.flatMap(({ userId }) =>
        onboardingMissionQuestions.map(({ questionId }) => ({
          coupleMissionId: null,
          userId,
          questionId,
          content: sampleSentence(),
          ...sampleAuditTimestamps(),
        })),
      ),
    );

    const findCoupleMissions = await seedPrisma.coupleMission.findMany({
      where: {
        isCompleted: true,
      },
      include: {
        mission: {
          include: {
            question: true,
          },
        },
        couple: true,
      },
    });

    autoResponseData.push(
      ...findCoupleMissions.flatMap(({ coupleMissionId, mission, couple }) =>
        mission.question.flatMap(({ questionId }) => [
          {
            coupleMissionId,
            userId: couple.inviterId,
            questionId,
            content: sampleSentence(),
            ...sampleAuditTimestamps(),
          },
          {
            coupleMissionId,
            userId: couple.inviteeId,
            questionId,
            content: sampleSentence(),
            ...sampleAuditTimestamps(),
          },
        ]),
      ),
    );

    const { count: autoCount } = await seedPrisma.response.createMany({
      data: autoResponseData,
      skipDuplicates: true,
    });

    count = autoCount;
  } else {
    // const { count: responseCount } = await seedPrisma.responses.createMany({
    //   data: ResponseData.map((item) => ({
    //     ...item,
    //   })),
    //   skipDuplicates: true,
    // });
    // const responses = await seedPrisma.responses.findMany();
    // count = responseCount;
  }

  generatedLog(Response.name, count);
};
