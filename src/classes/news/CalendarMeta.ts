import ICalendarMeta from '@/interfaces/news/ICalendarMeta';

export default class CalendarMeta implements ICalendarMeta {
  month?: number;
  year?: number;

  constructor(i?: ICalendarMeta) {
    if (!i) return;
    this.month = i.month;
    this.year = i.year;
  }
}
