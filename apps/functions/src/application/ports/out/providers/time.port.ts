import { Dayjs } from 'dayjs';

export const TIME_PORT = Symbol('TIME_PORT');

export interface TimePort {
  get(
    date?: string | number | Date,
    format?: { locale?: string; format?: string; utc?: boolean } | string | string[],
    locale?: string,
    strict?: boolean,
  ): Date;
  dayjs(
    date?: string | number | Date,
    format?: { locale?: string; format?: string; utc?: boolean } | string | string[],
    locale?: string,
    strict?: boolean,
  ): Dayjs;
}
