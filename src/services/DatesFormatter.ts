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

const locale = 'ru-RU';
export default abstract class DatesFormatter {
  locale = 'ru-RU';

  static Format(date?: Date, options?: CustomDateTimeFormatOptions): string {
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
    return Intl.DateTimeFormat(locale, opt).format(new Date(date));
  }

  static FromRuStr(value: string): Date {
    const parts = value.split('.');
    const date = new Date(`${parts[2]}-${parts[1]}-${parts[0]}`);
    return date;
  }
}
