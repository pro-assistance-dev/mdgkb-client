import ITimetableDay from '@/interfaces/timetables/ITimetableDay';
import IWeekday from '@/interfaces/timetables/IWeekday';
import Weekday from '@/classes/timetable/Weekday';

export default class TimetableDay implements ITimetableDay {
  id?: string;
  startTime: Date = new Date();
  endTime: Date = new Date();
  breakExist: boolean = false;
  breakStartTime?: Date;
  breakEndTime?: Date;
  weekdayId?: string;
  weekday: IWeekday = new Weekday();

  constructor(i?: TimetableDay) {
    if (!i) {
      return;
    }
    this.id = i.id;
    this.startTime = i.startTime;
    this.endTime = i.endTime;
    this.breakExist = i.breakExist;
    this.breakStartTime = i.breakStartTime;
    this.breakEndTime = i.breakEndTime;
    this.weekdayId = i.weekdayId;
    if (i.weekday) this.weekday = new Weekday(i.weekday);
  }

  static CreateStandartWeek(weekdays: IWeekday[]): ITimetableDay[] {
    return weekdays.map((weekday: IWeekday) => this.CreateStandartTimetableDay(weekday));
  }

  static CreateStandartTimetableDay(weekday: IWeekday): ITimetableDay {
    const timetableDay = new TimetableDay();
    timetableDay.startTime = new Date('Fri, 26 Sep 2014 9:00:00');
    timetableDay.endTime = new Date('Fri, 26 Sep 2014 18:00:00 ');
    timetableDay.weekday = weekday;
    return timetableDay;
  }

  getTime(date: Date): string {
    return `${date.getHours()}:${(date.getMinutes() < 10 ? '0' : '') + date.getMinutes()}`;
  }
}
