import Weekday from '@/classes/timetable/Weekday';
import ITimetableDay from '@/interfaces/timetables/ITimetableDay';
import IWeekday from '@/interfaces/timetables/IWeekday';

export default class TimetableDay implements ITimetableDay {
  id?: string;
  isWeekend = false;
  startTime = '';
  endTime = '';
  breakExist = false;
  breakStartTime?: string;
  breakEndTime?: string;
  weekdayId?: string;
  customName = '';
  isCustom = false;
  weekday: IWeekday = new Weekday();

  constructor(i?: TimetableDay) {
    if (!i) return;
    this.id = i.id;
    this.isWeekend = i.isWeekend;
    this.startTime = i.startTime;
    this.endTime = i.endTime;
    this.breakExist = i.breakExist;
    this.breakStartTime = i.breakStartTime;
    this.breakEndTime = i.breakEndTime;
    this.weekdayId = i.weekdayId;
    this.isCustom = i.isCustom;
    this.customName = i.customName;
    if (i.weekday) this.weekday = new Weekday(i.weekday);
  }

  static CreateStandartWeek(weekdays: IWeekday[]): ITimetableDay[] {
    return weekdays.map((weekday: IWeekday) => this.CreateStandartTimetableDay(weekday));
  }

  static CreateStandartTimetableDay(weekday: IWeekday): ITimetableDay {
    const timetableDay = new TimetableDay();
    timetableDay.startTime = '9:00';
    timetableDay.endTime = '18:00';
    timetableDay.weekday = weekday;
    timetableDay.weekdayId = weekday.id;
    if (timetableDay.weekday.isWeekend()) timetableDay.isWeekend = true;
    return timetableDay;
  }

  static CreateCustomTimetableDay(): ITimetableDay {
    const timetableDay = new TimetableDay();
    timetableDay.isCustom = true;
    timetableDay.customName = 'Наименование';
    timetableDay.startTime = '9:00';
    timetableDay.endTime = '18:00';
    return timetableDay;
  }

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
    period = `${this.weekday.name}: ${period}`;
    if (this.weekday.isToday()) {
      const arrow = '⇽';
      period = `${period} ${arrow}`;
    }
    return period;
  }

  getPeriod(): string {
    return `${this.getTime(this.startTime)}-${this.getTime(this.endTime)}`;
  }
}
