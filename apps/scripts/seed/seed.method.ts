import { fakerKO, faker } from '@faker-js/faker';
import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
import { range } from 'lodash';
import sample from 'lodash/sample';

dayjs.extend(utc);
dayjs.extend(timezone);

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const generatedLog = (serviceName: string, rowCount: number, operation?: string) => {
  // eslint-disable-next-line no-console
  console.log(
    rowCount ? '\x1b[36m%s\x1b[0m' : '\x1b[33m%s\x1b[0m',
    `[${serviceName}] ${rowCount}rows ${operation ? operation : 'created'}`,
  );
};

export const sampleUUID = (): string => {
  return faker.string.uuid();
};

export const sampleItem = <T>(data: Record<string, T> | T[]): T => {
  return sample(Object.values(data)) as T;
};

export const sampleNumber = (min_number = 0, max_number = 10, step = 1): number => {
  return sample(range(min_number, max_number, step)) as number;
};

export const sampleName = (): string => {
  return fakerKO.commerce.productName();
};

export const sampleNames = (): string[] => {
  return Array.from({ length: sampleNumber() }).map(() => sampleName());
};

export const sampleSentence = (): string => {
  return fakerKO.lorem.sentence();
};

export const nullable = <T>(data: T): T | undefined => {
  return sampleBoolean() ? data : undefined;
};

export const sampleEmail = (): string => {
  return faker.internet.email({});
};

export const sampleImageUrl = (): string => {
  return faker.image.url();
};

export const sampleInternetUrl = (): string => {
  return faker.internet.url();
};

export const sampleSomeItems = <T>(data: Record<string, T> | T[]): T[] => {
  const values = Object.values(data);
  const result: T[] = [];

  while (result.length === 0) {
    for (const item of values) {
      if (sample([true, false])) {
        result.push(item);
      }
    }
  }

  return result;
};

export const sampleIntervalBetweenTimes = (from: dayjs.Dayjs, to: dayjs.Dayjs): dayjs.Dayjs => {
  const fromMillisecond = dayjs(from).valueOf();
  const toMillisecond = dayjs(to).valueOf();
  const max = toMillisecond - fromMillisecond;

  const dateOffset = Math.floor(Math.random() * max + 1);

  const randomDate = dayjs(fromMillisecond + dateOffset);

  return dayjs(randomDate);
};

export const samplePastTime = () => {
  return faker.date.past();
};

export const sampleAuditTimestamps = (
  withDeletedAt: Boolean = false,
): {
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
} => {
  const createdAt = dayjs(faker.date.past());
  const updatedAt = sampleIntervalBetweenTimes(createdAt, dayjs());
  const deletedAt = Math.random() < 0.1 ? dayjs(faker.date.past()).toDate() : undefined;
  return {
    createdAt: createdAt.toDate(),
    updatedAt: updatedAt.toDate(),
    ...(withDeletedAt && {
      deletedAt: deletedAt,
    }),
  };
};

export const sampleBoolean = (): boolean => {
  return sample([true, false]) as boolean;
};
