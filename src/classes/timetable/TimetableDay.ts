import ITimetableDay from '@/interfaces/timetables/ITimetableDay';
import IWeekday from '@/interfaces/timetables/IWeekday';
import Weekday from '@/classes/timetable/Weekday';

export default class TimetableDay implements ITimetableDay {
  id?: string;
  startTime: Date = new Date();
  endTime: Date = new Date();
  breakExist: boolean = false;
  breakStartTime: Date = new Date();
  breakEndTime: Date = new Date();
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
}
