import DatesFormatter from './DatesFormatter';
import Period from './Period';

// const SetDays = ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота', 'Воскресенье'];
// const SetDaysMobile = ['ПН', 'ВТ', 'СР', 'ЧТ', 'ПТ', 'СБ', 'ВС'];
// const SetShortDays = ['ВС', 'ПН', 'ВТ', 'СР', 'ЧТ', 'ПТ', 'СБ'];

interface IWithDate {
  date: Date;
}

export default abstract class Dates {
  static GetPeriod(start: Date, end: Date): string {
    return Period.Get(DatesFormatter.Format(start), DatesFormatter.Format(end));
  }
  static GetDateOrToday(item?: IWithDate): Date {
    return item ? item.date : new Date();
  }
  static InPeriod(date: Date, start: Date, end: Date): boolean {
    return Period.In(new Date(date), new Date(start), new Date(end));
  }
  static GetDatesFromPeriod(start: Date, end: Date): Date[] {
    const dates: Date[] = [new Date(start)];
    let curDate = start;
    while (curDate <= end) {
      curDate = Dates.AddDays(curDate, 1);
      dates.push(curDate);
    }
    return dates;
  }

  static AddDays(date: Date, days: number): Date {
    const res = new Date(date);
    res.setDate(res.getDate() + days);
    return res;
  }

  static Eq(d1: Date, d2: Date): boolean {
    return d1.getTime() === d2.getTime();
  }
}
