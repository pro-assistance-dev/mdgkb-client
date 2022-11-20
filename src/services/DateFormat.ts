interface CustomDateTimeFormatOptions {
  localeMatcher?: string;
  weekday?: 'narrow' | 'short' | 'long';
  era?: string;
  year?: 'numeric' | '2-digit' | undefined;
  month?: 'numeric' | '2-digit' | 'narrow' | 'short' | 'long';
  day?: 'numeric' | '2-digit';
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
  setDay = ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота', 'Воскресенье'];

  constructor(locale?: string) {
    this.locale = locale ?? this.locale;
  }

  format(date?: Date, options?: CustomDateTimeFormatOptions): string {
    if (!date) {
      return '';
    }
    const opt: Intl.DateTimeFormatOptions = { year: 'numeric', month: '2-digit', day: '2-digit', hour: undefined, minute: undefined };
    if (options) {
      opt.year = options.year || options.year == undefined ? options.year : opt.year;
      opt.month = options.month ?? opt.month;
      opt.day = options.day ?? opt.day;
      opt.hour = options.hour ?? opt.hour;
      opt.minute = options.minute ?? opt.minute;
    }
    return Intl.DateTimeFormat(this.locale, opt).format(new Date(date));
  }

  getPeriod(start: Date, end: Date, options?: CustomDateTimeFormatOptions): string {
    return `${this.format(start, options)}-${this.format(end, options)}`;
  }
}
