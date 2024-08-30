import { PrismaClient } from '@gentlepeople/taleus-schema';
import dayjs from 'dayjs';

export const seedPrisma = new PrismaClient();

// === seed data config ===
export const SEED_DATA_START_DATE = dayjs('2000-10-01T00:00:00');
export const SEED_DATA_END_DATE = dayjs();

// === time const ===
export const TEN_SECONDS_MILISECOND = 10 * 1000;
export const TWO_MINUTES_MILISECOND = 2 * 60 * 1000;
export const THIRTY_MINUTES_MILISECOND = 30 * 60 * 1000;

// === user config ===
export const AUTO_USER = true;
export const AUTO_USER_LENGTH = 20;
