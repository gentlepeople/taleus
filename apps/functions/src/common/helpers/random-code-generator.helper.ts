import { randomBytes } from 'crypto';

export const generateRandomCode = (length: number = 8): string => {
  const bytes = randomBytes(Math.ceil((length * 3) / 4));
  return bytes
    .toString('base64')
    .replace(/[^a-zA-Z0-9]/g, '')
    .slice(0, length);
};
