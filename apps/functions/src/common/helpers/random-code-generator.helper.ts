import { randomBytes } from 'crypto';

export const generateRandomCode = (length: number = 8): string => {
  const bytes = randomBytes(Math.ceil(length / 2));
  return bytes.toString('hex').toUpperCase().slice(0, length);
};
