import TimePeriod from '@/classes/TimePeriod';
import ScheduleItem from '@/classes/timetable/ScheduleItems';
import Weekday from '@/classes/timetable/Weekday';
import ITimePeriod from '@/interfaces/ITimePeriod';
import IScheduleItem from '@/interfaces/timetables/IScheduleItem';
import ITimetableDay from '@/interfaces/timetables/ITimetableDay';
import IWeekday from '@/interfaces/timetables/IWeekday';

export default class TimetableDay implements ITimetableDay {
  id?: string;
  isWeekend = false;
  startTime = '9:00';
  startTimeLimit = '0:00';
  endTime = '18:00';
  endTimeLimit = '23:59';
  breaksExists = false;
  weekdayId?: string;
  weekday: IWeekday = new Weekday();
  aroundTheClock = false;
  breakPeriods: ITimePeriod[] = [];
  breakPeriodsForDelete: string[] = [];
  scheduleItems: IScheduleItem[] = [];

  constructor(timetableDay?: TimetableDay) {
    if (!timetableDay) {
      return;
    }
    this.id = timetableDay.id;
    this.isWeekend = timetableDay.isWeekend;
    this.startTime = timetableDay.startTime;
    this.endTime = timetableDay.endTime;
    this.breaksExists = timetableDay.breaksExists;
    this.weekdayId = timetableDay.weekdayId;
    this.aroundTheClock = timetableDay.aroundTheClock;
    if (timetableDay.weekday) {
      this.weekday = new Weekday(timetableDay.weekday);
    }
    if (timetableDay.breakPeriods) {
      this.breakPeriods = timetableDay.breakPeriods.map((item: ITimePeriod) => new TimePeriod(item));
    }
    if (timetableDay.scheduleItems) {
      this.scheduleItems = timetableDay.scheduleItems.map((item: IScheduleItem) => new ScheduleItem(item));
    }
  }

  static CreateStandartWeek(weekdays: IWeekday[]): ITimetableDay[] {
    return weekdays.map((weekday: IWeekday) => this.CreateStandartTimetableDay(weekday));
  }

  static CreateStandartTimetableDay(weekday: IWeekday): ITimetableDay {
    const timetableDay = new TimetableDay();
    timetableDay.startTime = '9:00';
    timetableDay.startTimeLimit = '0:00';
    timetableDay.endTime = '18:00';
    timetableDay.endTimeLimit = '23:59';
    timetableDay.weekday = weekday;
    timetableDay.weekdayId = weekday.id;
    if (timetableDay.weekday.isWeekend()) timetableDay.isWeekend = true;
    return timetableDay;
  }

  // static CreateCustomTimetableDay(): ITimetableDay {
  //   const timetableDay = new TimetableDay();
  //   timetableDay.isCustom = true;
  //   timetableDay.customName = 'Наименование';
  //   timetableDay.startTime = '9:00';
  //   timetableDay.endTime = '18:00';
  //   return timetableDay;
  // }

  public getTime(dateString: string): string {
    if (!dateString) return '';
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
      const arrow = '⇽';
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
    const startTime = `${startHours + timeIntrvalMid}:00`;
    const endTime = `${startHours + timeIntrvalMid + 1}:00`;
    this.breakPeriods.push(new TimePeriod({ startTime, endTime }));
  }

  removeBreak(index: number): void {
    const id = this.breakPeriods[index].id;
    if (id) {
      this.breakPeriodsForDelete.push(id);
    }
    this.breakPeriods.splice(index, 1);
  }
}
