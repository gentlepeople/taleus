import { PrismaClient } from '@gentlepeople/taleus-schema';

export const DATABASE_PORT = Symbol('DATABASE_PORT');

export interface DatabasePort extends PrismaClient {}
