const SetDays = ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота', 'Воскресенье'];
const SetDaysMobile = ['ПН', 'ВТ', 'СР', 'ЧТ', 'ПТ', 'СБ', 'ВС'];
const SetShortDays = ['ВС', 'ПН', 'ВТ', 'СР', 'ЧТ', 'ПТ', 'СБ'];

interface CustomDateTimeFormatOptions {
  localeMatcher?: string;
  weekday?: 'narrow' | 'short' | 'long';
  era?: string;
  year?: 'numeric' | '2-digit' | undefined;
  month?: 'numeric' | '2-digit' | 'narrow' | 'short' | 'long';
  day?: 'numeric' | '2-digit' | undefined;
  hour?: 'numeric' | '2-digit';
  minute?: 'numeric' | '2-digit';
  second?: string;
  timeZoneName?: string;
  formatMatcher?: string;
  hour12?: boolean;
  timeZone?: string;
}

export default class DateTimeFormat {
  locale = 'ru-RU';

  constructor(locale?: string) {
    this.locale = locale ?? this.locale;
  }

  format(date?: Date, options?: CustomDateTimeFormatOptions): string {
    if (!date) {
      return '';
    }
    const opt: Intl.DateTimeFormatOptions = { year: 'numeric', month: '2-digit', day: '2-digit', hour: undefined, minute: undefined };
    if (options) {
      opt.year = options.year || options.year === undefined ? options.year : opt.year;
      opt.month = options.month || options.month === undefined ? options.month : opt.month;
      opt.day = options.day || options.day === undefined ? options.day : opt.day;
      opt.hour = options.hour ?? opt.hour;
      opt.minute = options.minute ?? opt.minute;
    }
    return Intl.DateTimeFormat(this.locale, opt).format(new Date(date));
  }

  getPeriod(start: Date, end: Date, options?: CustomDateTimeFormatOptions): string {
    return `${this.format(start, options)}-${this.format(end, options)}`;
  }

  getShortDayName(date?: Date): string {
    if (!date) {
      return '';
    }
    return SetShortDays[date.getDay()];
  }

  getCurrentWeekPeriod(options?: CustomDateTimeFormatOptions): string {
    const now = new Date();
    const startOfWeek = new Date(now.getFullYear(), now.getMonth(), now.getDate() - now.getDay() + 1);
    const endOfWeek = new Date(now.getFullYear(), now.getMonth(), startOfWeek.getDate() + 7);
    return this.getPeriod(startOfWeek, endOfWeek, options ? options : { month: '2-digit', day: 'numeric', year: undefined });
  }

  getDurationInDay(time1: string, time2: string): number {
    const timeStart = new Date();
    const timeEnd = new Date();
    const valueStart = DateTimeFormat.SplitHourTime(time1);
    const valueEnd = DateTimeFormat.SplitHourTime(time2);

    timeStart.setHours(valueStart[0], valueStart[1], 0, 0);
    timeEnd.setHours(valueEnd[0], valueEnd[1], 0, 0);

    const diff = timeEnd.getTime() - timeStart.getTime();

    return diff / 1000 / 60; // millisecond
  }

  static HourTimeinMunutes(time: string): number {
    const parts = DateTimeFormat.SplitHourTime(time);
    return parts[0] * 60 + parts[1];
  }
  static SplitHourTime(time: string): number[] {
    const parts = time.split(':');
    return [Number(parts[0]), Number(parts[1])];
  }
  static AddMinutesToHM(hm: string, minutes: number): string {
    const d = new Date();
    const hmArr = DateTimeFormat.SplitHourTime(hm);
    d.setHours(hmArr[0], hmArr[1], 0, 0);
    const newD = new Date(d.getTime() + minutes * 60000);
    const h = newD.getHours();
    const m = newD.getMinutes();
    return `${h}:${m}`;
  }

  getMonthsDiff(dateFrom: Date, dateTo: Date): number {
    return dateTo.getMonth() - dateFrom.getMonth() + 12 * (dateTo.getFullYear() - dateFrom.getFullYear());
  }

  stringToDate(value: string): Date {
    const parts = value.split('.');
    const date = new Date(`${parts[2]}-${parts[1]}-${parts[0]}`);
    return date;
  }
}
