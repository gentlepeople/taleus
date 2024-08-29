import { PrismaClient } from '@gentlepeople/taleus-schema';

export const DATABASE_REPOSITORY = Symbol('DATABASE_REPOSITORY');

export interface IDatabaseRepository extends PrismaClient {}
