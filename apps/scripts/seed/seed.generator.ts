import { Couple } from './couple';
import { CoupleMission } from './couple-mission';
import { Mission } from './mission';
import { Question } from './question';
import { Response } from './response';
import { User } from './user';

export const seedGenerator = async (): Promise<void> => {
  await User();
  await Mission();
  await Question();
  await Couple();
  await CoupleMission();
  await Response();
};
