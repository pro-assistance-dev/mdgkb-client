import Year from '@/classes/Year';
import ICalendar from '@/interfaces/ICalendar';
import IYear from '@/interfaces/IYear';

export default class Calendar implements ICalendar {
  years: IYear[] = [];

  static Init(): ICalendar {
    const calendar = new Calendar();
    calendar.years.push(Year.Init());
    return calendar;
  }

  getActiveYear(): IYear {
    const year = this.years.find((i: IYear) => i.active);
    return year ?? new Year();
  }
}
