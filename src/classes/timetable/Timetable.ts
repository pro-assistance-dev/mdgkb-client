import TimetableDay from '@/classes/timetable/TimetableDay';
import ITimePeriod from '@/interfaces/ITimePeriod';
import ITimetable from '@/interfaces/timetables/ITimetable';
import ITimetableDay from '@/interfaces/timetables/ITimetableDay';
import IWeekday from '@/interfaces/timetables/IWeekday';

export default class Timetable implements ITimetable {
  id?: string;
  title?: string;
  timetableDays: ITimetableDay[] = [];
  timetableDaysForDelete: string[] = [];

  constructor(timetable?: ITimetable) {
    if (!timetable) {
      return;
    }
    this.id = timetable.id;
    this.title = timetable.title;
    if (timetable.timetableDays) {
      this.timetableDays = timetable.timetableDays.map((item: ITimetableDay) => new TimetableDay(item));
    }
  }
  static CreateStandartTimetable(weekdays: IWeekday[]): Timetable {
    const timetable = new Timetable();
    timetable.timetableDays = TimetableDay.CreateStandartWeek(weekdays);
    return timetable;
  }

  static ApplyTimetablePattern(pattern: ITimetable): ITimetable {
    const timetable = new Timetable(pattern);
    timetable.id = undefined;
    timetable.timetableDays.forEach((day: ITimetableDay) => {
      day.breakPeriods.forEach((period: ITimePeriod) => {
        period.id = undefined;
      });
      day.id = undefined;
    });
    return timetable;
  }

  getNowDay(): ITimetableDay {
    return this.timetableDays.find((timetableDay: ITimetableDay) => timetableDay.isNow()) ?? new TimetableDay();
  }

  isWorkTime(): boolean {
    const nowDay = this.getNowDay();
    const today = new Date();
    const time = today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();

    return nowDay.startTime < time && nowDay.endTime > time;
  }

  isAroundTheClock(): boolean {
    let aroundTheClock = true;
    this.timetableDays.forEach((day: ITimetableDay) => {
      if (!day.aroundTheClock) {
        aroundTheClock = false;
      }
    });
    return aroundTheClock;
  }
}
