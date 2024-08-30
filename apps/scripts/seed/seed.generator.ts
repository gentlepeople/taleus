import { User } from './user';

export const seedGenerator = async (): Promise<void> => {
  // user
  await User();
};
