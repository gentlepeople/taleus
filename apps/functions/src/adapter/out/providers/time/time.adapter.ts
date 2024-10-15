import { Injectable } from '@nestjs/common';
import dayjs, { Dayjs as DefaultDayjs, extend } from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import updateLocale from 'dayjs/plugin/updateLocale';
import utc from 'dayjs/plugin/utc';

import 'dayjs/locale/ko';
import 'dayjs/locale/en';

import { DEFAULT_LOCALE, DEFAULT_TIMEZONE } from './time.const';

import { TimePort } from '@/ports';

extend(utc);
// extend(isBetween);
extend(timezone);
// extend(duration);
// extend(weekOfYear);
// extend(dayOfYear);
// extend(localizedFormat);
extend(updateLocale);
// extend(advancedFormat);
// extend(isoWeek);

dayjs.updateLocale('ko', {
  ordinal: (n: any) => `${n}일`, // ordinal Function (number) => return number + output
  weekStart: 1,
  formats: {
    // abbreviated format options allowing localization
    LTS: 'A h:mm:ss',
    LT: 'A h:mm',
    L: 'MM/DD/YYYY',
    LL: 'MMMM D, YYYY',
    LLL: 'MMMM D, YYYY h:mm A',
    LLLL: 'dddd, MMMM D, YYYY h:mm A',
    // lowercase/short, optional formats for localization
    l: 'D/M/YYYY',
    ll: 'D MMM, YYYY',
    lll: 'D MMM, YYYY h:mm A',
    llll: 'ddd, MMM D, YYYY h:mm A',
  },
});
dayjs.updateLocale('en', {
  weekStart: 1,
  formats: {
    // abbreviated format options allowing localization
    LTS: 'h:mm:ss A',
    LT: 'h:mm A',
    L: 'MM/DD/YYYY',
    LL: 'MMMM D, YYYY',
    LLL: 'MMMM D, YYYY h:mm A',
    LLLL: 'dddd, MMMM D, YYYY h:mm A',
    // lowercase/short, optional formats for localization
    l: 'D/M/YYYY',
    ll: 'D MMM, YYYY',
    lll: 'D MMM, YYYY h:mm A',
    llll: 'ddd, MMM D, YYYY h:mm A',
  },
});

export type Dayjs = DefaultDayjs;

@Injectable()
export class TimeAdapter implements TimePort {
  private locale: string;
  private timezone: string;

  constructor() {
    this.locale = DEFAULT_LOCALE;
    this.timezone = DEFAULT_TIMEZONE;

    dayjs.updateLocale(this.locale, {});
    dayjs.tz.setDefault(this.timezone);
  }

  public dayjs(
    date?: dayjs.ConfigType,
    format?: dayjs.OptionType,
    locale?: string,
    strict?: boolean,
  ): Dayjs {
    return dayjs(date, format, locale || this.locale, strict).tz();
  }

  public get(
    date?: dayjs.ConfigType,
    format?: dayjs.OptionType,
    locale?: string,
    strict?: boolean,
  ): Date {
    return dayjs(date, format, locale || this.locale, strict)
      .tz()
      .toDate();
  }
}
