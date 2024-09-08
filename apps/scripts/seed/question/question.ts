import { Prisma, EnumResponseType } from '@gentlepeople/taleus-schema';

import { AUTO_QUESTION, AUTO_QUESTION_LENGTH, seedPrisma } from '../seed.config';
import { generatedLog, sampleAuditTimestamps, sampleSentence } from '../seed.method';

export const Question = async (): Promise<void> => {
  let count = 0;
  if (AUTO_QUESTION) {
    const findMissions = await seedPrisma.mission.findMany();
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
    const { count: autoCount } = await seedPrisma.question.createMany({
      data: autoQuestionData,
      skipDuplicates: true,
    });

    count = autoCount;
  } else {
    // const { count: questionCount } = await seedPrisma.questions.createMany({
    //   data: QuestionData.map((item) => ({
    //     ...item,
    //   })),
    //   skipDuplicates: true,
    // });
    // const questions = await seedPrisma.questions.findMany();
    // count = questionCount;
  }

  generatedLog(Question.name, count);
};
