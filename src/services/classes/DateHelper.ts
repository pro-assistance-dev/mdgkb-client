interface IWithDate {
  date: Date;
}
export default abstract class DateHelper {
  static GetDateOrToday(item?: IWithDate): Date {
    return item ? item.date : new Date();
  }
  static InPeriod(date: Date, start: Date, end: Date): boolean {
    return new Date(date) >= new Date(start) && new Date(date) <= new Date(end);
  }
  static GetDatesFromPeriod(start: Date, end: Date): Date[] {
    const dates: Date[] = [new Date(start)];
    let curDate = start;
    while (curDate <= end) {
      curDate = DateHelper.AddDays(curDate, 1);
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
