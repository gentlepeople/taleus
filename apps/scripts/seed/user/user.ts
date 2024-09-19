import { EnumGender, EnumOAuthProviderType, Prisma } from '@gentlepeople/taleus-schema';

import { AUTO_USER, AUTO_USER_LENGTH, seedPrisma } from '../seed.config';
import {
  generatedLog,
  sampleAuditTimestamps,
  sampleBoolean,
  sampleEmail,
  sampleImageUrl,
  sampleItem,
  sampleName,
  samplePastTime,
  sampleUUID,
} from '../seed.method';

export const User = async (): Promise<void> => {
  let count = 0;
  if (AUTO_USER) {
    const autoUserData = Array.from<Prisma.userCreateManyInput, Prisma.userCreateManyInput>(
      { length: AUTO_USER_LENGTH },
      () => ({
        userId: sampleUUID(),
        nickname: sampleName(),
        email: sampleEmail(),
        emailVerified: sampleBoolean(),
        profileImageUrl: sampleImageUrl(),
        gender: sampleItem(EnumGender),
        birthday: samplePastTime(),
        coupleStartDate: samplePastTime(),
        oauthProviderType: EnumOAuthProviderType.KAKAO,
        oauthProviderId: `kakao:${sampleUUID()}`,
        personalCode: sampleUUID().slice(0, 8),
        ...sampleAuditTimestamps(true),
      }),
    );
    const { count: autoCount } = await seedPrisma.user.createMany({
      data: autoUserData,
      skipDuplicates: true,
    });

    count = autoCount;
  } else {
    // const { count: userCount } = await seedPrisma.users.createMany({
    //   data: UserData.map((item) => ({
    //     ...item,
    //   })),
    //   skipDuplicates: true,
    // });
    // const users = await seedPrisma.users.findMany();
    // count = userCount;
  }

  generatedLog(User.name, count);
};
