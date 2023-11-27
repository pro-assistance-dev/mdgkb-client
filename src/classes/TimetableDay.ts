import ScheduleItem from '@/classes/ScheduleItems';
import TimePeriod from '@/classes/TimePeriod';
import Weekday from '@/classes/Weekday';
import ClassHelper from '@/services/ClassHelper';

export default class TimetableDay {
  id?: string;
  isWeekend = false;
  startTime = '9:00';
  startTimeLimit = '0:00';
  endTime = '18:00';
  endTimeLimit = '23:59';
  breaksExists = false;
  weekdayId?: string;
  @ClassHelper.GetClassConstructor(Weekday)
  weekday: Weekday = new Weekday();
  aroundTheClock = false;
  @ClassHelper.GetClassConstructor(TimePeriod)
  breakPeriods: TimePeriod[] = [];
  breakPeriodsForDelete: string[] = [];
  scheduleItems: ScheduleItem[] = [];

  constructor(i?: TimetableDay) {
    ClassHelper.BuildClass(this, i);
  }

  static CreateStandartWeek(weekdays: Weekday[]): TimetableDay[] {
    return weekdays.map((weekday: Weekday) => this.CreateStandartTimetableDay(weekday));
  }

  static CreateStandartTimetableDay(weekday: Weekday): TimetableDay {
    const timetableDay = new TimetableDay();
    timetableDay.startTime = '9:00';
    timetableDay.startTimeLimit = '0:00';
    timetableDay.endTime = '18:00';
    timetableDay.endTimeLimit = '23:59';
    timetableDay.weekday = weekday;
    timetableDay.weekdayId = weekday.id;
    if (timetableDay.weekday.isWeekend()) {
      timetableDay.isWeekend = true;
    }
    return timetableDay;
  }

  // static CreateCustomTimetableDay(): TimetableDay {
  //   const timetableDay = new TimetableDay();
  //   timetableDay.isCustom = true;
  //   timetableDay.customName = 'Наименование';
  //   timetableDay.startTime = '9:00';
  //   timetableDay.endTime = '18:00';
  //   return timetableDay;
  // }

  public getTime(dateString: string): string {
    if (!dateString) {
      return '';
    }
    const date = new Date(dateString);
    if (isNaN(date.getHours())) {
      const parts = dateString.split(':');
      return `${parts[0]}:${parts[1]}`;
    }
    return TimetableDay.GetTimeString(date);
  }

  static GetTimeString(date: Date): string {
    return `${date.getHours()}:${(date.getMinutes() < 10 ? '0' : '') + date.getMinutes()}`;
  }

  isNow(): boolean {
    const now = new Date().getHours() + ':' + new Date().getMinutes();
    return now > this.getTime(this.startTime) && now < this.getTime(this.endTime);
  }

  getPeriodWithName(): string {
    let period = this.getPeriod();
    period = `${this.isWeekend ? 'выходной' : period} `;
    period = `${this.weekday.shortName}: ${this.isWeekend ? 'выходной' : period} `;
    if (this.weekday.isToday()) {
      period = `${period}`;
    }
    return period;
  }

  getPeriod(separator?: string): string {
    if (separator === '-') {
      return `${this.getTime(this.startTime)}-${this.getTime(this.endTime)}`;
    }
    return `с ${this.getTime(this.startTime)} до ${this.getTime(this.endTime)}`;
  }

  getTimetable(): string {
    if (this.isWeekend) {
      return 'Выходной';
    }
    if (this.aroundTheClock) {
      return 'Круглосуточно';
    }
    return this.getPeriod();
  }

  showBreakSwitcher(): boolean {
    return !!(!this.isWeekend && this.startTime && this.endTime);
  }

  addBreak(): void {
    const startHours = Number(this.startTime.split(':')[0]);
    const endHours = Number(this.endTime.split(':')[0]);
    const timeIntrvalMid = Math.floor((endHours - startHours) / 2);
    const period = new TimePeriod();
    period.startTime = `${startHours + timeIntrvalMid}:00`;
    period.endTime = `${startHours + timeIntrvalMid + 1}:00`;
    this.breakPeriods.push(period);
  }

  removeBreak(index: number): void {
    const id = this.breakPeriods[index].id;
    if (id) {
      this.breakPeriodsForDelete.push(id);
    }
    this.breakPeriods.splice(index, 1);
  }
}
