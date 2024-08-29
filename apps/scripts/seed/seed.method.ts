import { fakerKO, fakerEN, fakerJA, faker } from '@faker-js/faker';
import { Prisma } from '@gentlepeople/taleus-schema';
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

export const sample_item = <T>(data: Record<string, T> | T[]): T => {
  return sample(Object.values(data)) as T;
};

export const sample_number = (min_number = 0, max_number = 10, step = 1): number => {
  return sample(range(min_number, max_number, step)) as number;
};

export const sample_t_name = (): Prisma.InputJsonValue => {
  return {
    ko: fakerKO.commerce.productName(),
    en: fakerEN.commerce.productName(),
    ja: fakerJA.commerce.productName(),
  };
};

export const sample_name = (locale: 'ko' | 'en' | 'ja' = 'ko'): string => {
  switch (locale) {
    case 'ko':
      return fakerKO.commerce.productName();
    case 'en':
      return fakerEN.commerce.productName();
    case 'ja':
      return fakerJA.commerce.productName();
    default:
      return fakerKO.commerce.productName();
  }
};

export const sample_names = (locale: 'ko' | 'en' | 'ja' = 'ko'): string[] => {
  return Array.from({ length: sample_number() }).map(() => sample_name(locale));
};

export const sample_t_sentence = (): Prisma.InputJsonValue => {
  return {
    ko: fakerKO.lorem.sentence(),
    en: fakerEN.lorem.sentence(),
    ja: fakerJA.lorem.sentence(),
  };
};

export const nullable = <T>(data: T): T | undefined => {
  return sample_boolean() ? data : undefined;
};

export const sample_image_url = (): string => {
  return faker.image.url();
};

export const sample_internet_url = (): string => {
  return faker.internet.url();
};

export const sample_some_items = <T>(data: Record<string, T> | T[]): T[] => {
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

export const sample_interval_between_times = (from: dayjs.Dayjs, to: dayjs.Dayjs): dayjs.Dayjs => {
  const fromMillisecond = dayjs(from).valueOf();
  const toMillisecond = dayjs(to).valueOf();
  const max = toMillisecond - fromMillisecond;

  const dateOffset = Math.floor(Math.random() * max + 1);

  const randomDate = dayjs(fromMillisecond + dateOffset);

  return dayjs(randomDate);
};

export const sample_past_time = () => {
  return faker.date.past();
};

export const sample_created_and_updated_at = (): { created_at: Date; updated_at: Date } => {
  const createdAt = dayjs(faker.date.past());
  const updatedAt = sample_interval_between_times(createdAt, dayjs());
  return {
    created_at: createdAt.toDate(),
    updated_at: updatedAt.toDate(),
  };
};

export const sample_boolean = (): boolean => {
  return sample([true, false]) as boolean;
};
