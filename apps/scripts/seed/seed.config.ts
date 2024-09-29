import { PrismaClient } from '@gentlepeople/taleus-schema';
import dayjs from 'dayjs';

export const seedPrisma = new PrismaClient();

// === seed data config ===
export const SEED_DATA_START_DATE = dayjs('2000-10-01T00:00:00');
export const SEED_DATA_END_DATE = dayjs();

// === time const ===
export const TEN_SECONDS_MILLISECOND = 10 * 1000;
export const TWO_MINUTES_MILLISECOND = 2 * 60 * 1000;
export const THIRTY_MINUTES_MILLISECOND = 30 * 60 * 1000;

// === user config ===
export const AUTO_USER = true;
export const AUTO_USER_LENGTH = 20;

// === mission config ===
export const AUTO_MISSION = true;
export const AUTO_MISSION_LENGTH = 20;
export const ONBOARDING_MISSION_ID = 1;

// === question config ===
export const AUTO_QUESTION = true;
export const AUTO_QUESTION_LENGTH = 3;

// === couple config ===
export const AUTO_COUPLE = true;

// === coupleMission config ===
export const AUTO_COUPLE_MISSION = true;
export const AUTO_COUPLE_MISSION_LENGTH = 100;

// === response config ===
export const AUTO_RESPONSE = true;
export const AUTO_RESPONSE_LENGTH = 1000;
