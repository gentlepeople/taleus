import { Mission } from './mission';
import { Question } from './question';
import { User } from './user';

export const seedGenerator = async (): Promise<void> => {
  await User();
  await Mission();
  await Question();
};
