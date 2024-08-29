/* eslint-disable no-console */

import { existsSync, readdirSync } from 'fs';
import path, { resolve } from 'path';

import { PrismaClient } from '@gentlepeople/taleus-schema';
import { Listr } from 'listr2';

import { color, DataMigration } from '.';

async function handler() {
  const db = new PrismaClient();
  const pendingDataMigrations = await getPendingDataMigrations(db);

  if (!pendingDataMigrations.length) {
    console.info(color.green(`\n${NO_PENDING_MIGRATIONS_MESSAGE}\n`));
    process.exitCode = 0;
    return;
  }

  const counters = { run: 0, skipped: 0, error: 0 };

  const dataMigrationTasks = pendingDataMigrations.map((dataMigration) => {
    const dataMigrationName = path.basename(dataMigration.path, '.js');

    return {
      title: dataMigrationName,
      skip() {
        if (counters.error > 0) {
          counters.skipped++;
          return true;
        } else {
          return false;
        }
      },
      async task() {
        try {
          const { startedAt, finishedAt } = await runDataMigration(db, dataMigration.path);
          counters.run++;
          await recordDataMigration(db, {
            version: dataMigration.version,
            name: dataMigrationName,
            started_at: startedAt,
            finished_at: finishedAt,
          });
        } catch (e) {
          counters.error++;
          console.error(color.error(`Error in data migration: ${(e as Error).message}`));
        }
      },
    };
  });

  const tasks = new Listr(dataMigrationTasks, {
    renderer: 'verbose',
  });

  try {
    await tasks.run();
    await db.$disconnect();

    console.log();
    reportDataMigrations(counters);
    console.log();

    if (counters.error) {
      process.exitCode = 1;
    }
  } catch (e) {
    process.exitCode = 1;
    await db.$disconnect();

    console.log();
    reportDataMigrations(counters);
    console.log();
  }
}

handler();

/**
 * Return the list of migrations that haven't run against the database yet
 */
async function getPendingDataMigrations(db: PrismaClient) {
  const dataMigrationsPath = path.join(resolve(__dirname), '../data-migration');

  if (!existsSync(dataMigrationsPath)) {
    return [];
  }

  const dataMigrations = readdirSync(dataMigrationsPath)
    // There may be a `.keep` file in the data migrations directory.
    .filter((dataMigrationFileName) =>
      ['js', '.ts'].some((extension) => dataMigrationFileName.endsWith(extension)),
    )
    .map((dataMigrationFileName) => {
      const [version] = dataMigrationFileName.split('-');

      return {
        version,
        path: path.join(dataMigrationsPath, dataMigrationFileName),
      };
    });

  const ranDataMigrations: DataMigration[] = await db.data_migrations.findMany({
    orderBy: { version: 'asc' },
  });
  const ranDataMigrationVersions = ranDataMigrations.map((dataMigration) =>
    dataMigration.version.toString(),
  );

  const pendingDataMigrations = dataMigrations
    .filter(({ version }) => {
      return !ranDataMigrationVersions.includes(version);
    })
    .sort(sortDataMigrationsByVersion);

  return pendingDataMigrations;
}

/**
 * Sorts migrations by date, oldest first
 */
function sortDataMigrationsByVersion(
  dataMigrationA: { version: string },
  dataMigrationB: { version: string },
) {
  const aVersion = parseInt(dataMigrationA.version);
  const bVersion = parseInt(dataMigrationB.version);

  if (aVersion > bVersion) {
    return 1;
  }
  if (aVersion < bVersion) {
    return -1;
  }
  return 0;
}

async function runDataMigration(db: PrismaClient, dataMigrationPath: string) {
  const dataMigration = require(dataMigrationPath);

  const startedAt = new Date();
  await dataMigration.default({ db });
  const finishedAt = new Date();

  return { startedAt, finishedAt };
}

export const NO_PENDING_MIGRATIONS_MESSAGE = 'No pending data migrations run, already up-to-date.';

/**
 * Adds data for completed migrations to the DB
 */
async function recordDataMigration(
  db: any,
  { version, name, started_at, finished_at }: DataMigration,
) {
  await db.data_migrations.create({
    data: { version, name, started_at, finished_at },
  });
}

/**
 * Output run status to the console
 */
function reportDataMigrations(counters: { run: number; skipped: number; error: number }) {
  if (counters.run) {
    console.info(color.green(`${counters.run} data migration(s) completed successfully.`));
  }
  if (counters.error) {
    console.error(color.error(`${counters.error} data migration(s) exited with errors.`));
  }
  if (counters.skipped) {
    console.warn(
      color.warning(`${counters.skipped} data migration(s) skipped due to previous error.`),
    );
  }
}
