import { Prisma } from '@gentlepeople/taleus-schema';
import { enum_gender } from '@gentlepeople/taleus-schema';

import { AUTO_MEMBER, AUTO_MEMBER_LENGTH, seedPrisma } from '../seed.config';
import { generatedLog, sample_created_and_updated_at, sample_item } from '../seed.method';

export const Member = async (): Promise<void> => {
  let count = 0;
  if (AUTO_MEMBER) {
    const autoMemberData = Array.from<Prisma.memberCreateManyInput, Prisma.memberCreateManyInput>(
      { length: AUTO_MEMBER_LENGTH },
      () => ({
        gender: sample_item(enum_gender),
        ...sample_created_and_updated_at(),
      }),
    );
    const { count: autoCount } = await seedPrisma.member.createMany({
      data: autoMemberData,
      skipDuplicates: true,
    });

    count = autoCount;
  } else {
    // const { count: memberCount } = await seedPrisma.member.createMany({
    //   data: MemberData.map((item) => ({
    //     ...item,
    //     ...sample_created_and_updated_at(),
    //   })),
    //   skipDuplicates: true,
    // });
    // const members = await seedPrisma.member.findMany();
    // count = memberCount;
  }

  generatedLog(Member.name, count);
};
