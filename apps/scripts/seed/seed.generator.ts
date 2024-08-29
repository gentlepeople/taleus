import { Member } from './member';

export const seedGenerator = async (): Promise<void> => {
  // member
  await Member();
};
