import TimePeriod from '@/classes/TimePeriod';
import TimetableDay from '@/classes/TimetableDay';
import Weekday from '@/classes/Weekday';

export default class Timetable {
  id?: string;
  title?: string;
  timetableDays: TimetableDay[] = [];
  timetableDaysForDelete: string[] = [];

  constructor(i?: Timetable) {
    if (!i) {
      return;
    }
    this.id = i.id;
    this.title = i.title;
    if (i.timetableDays) {
      this.timetableDays = i.timetableDays.map((item: TimetableDay) => new TimetableDay(item));
    }
  }

  getOnlyWorkDays(): string[] {
    const workDays: string[] = [];
    this.timetableDays.forEach((day: TimetableDay) => {
      if (!day.isWeekend) {
        workDays.push(day.getPeriodWithName());
      }
    });
    return workDays;
  }

  static CreateStandartTimetable(weekdays: Weekday[]): Timetable {
    const timetable = new Timetable();
    timetable.timetableDays = TimetableDay.CreateStandartWeek(weekdays);
    return timetable;
  }

  static ApplyTimetablePattern(pattern: Timetable): Timetable {
    const timetable = new Timetable(pattern);
    timetable.id = undefined;
    timetable.timetableDays.forEach((day: TimetableDay) => {
      day.breakPeriods.forEach((period: TimePeriod) => {
        period.id = undefined;
      });
      day.id = undefined;
    });
    return timetable;
  }

  getNowDay(): TimetableDay {
    return this.timetableDays.find((timetableDay: TimetableDay) => timetableDay.isNow()) ?? new TimetableDay();
  }

  isWorkTime(): boolean {
    const nowDay = this.getNowDay();
    const today = new Date();
    const time = today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();

    return nowDay.startTime < time && nowDay.endTime > time;
  }

  isAroundTheClock(): boolean {
    let aroundTheClock = true;
    this.timetableDays.forEach((day: TimetableDay) => {
      if (!day.aroundTheClock) {
        aroundTheClock = false;
      }
    });
    return aroundTheClock;
  }

  getTodayWorkday(): TimetableDay {
    return this.timetableDays.find((timetableDay: TimetableDay) => timetableDay.weekday.isToday()) ?? new TimetableDay();
  }

  getTodayTimetable(): string {
    if (!this.id) {
      return 'Уточнить время работы: +7 (495) 959-88-00';
    }
    return this.getTodayWorkday().getTimetable();
  }

  getOnlyWorkdayObjects(): TimetableDay[] {
    return this.timetableDays.filter((day: TimetableDay) => !day.isWeekend);
  }
}
