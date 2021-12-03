import ITimePeriod from '@/interfaces/ITimePeriod';

import TimetableDay from './timetable/TimetableDay';

export default class TimePeriod implements ITimePeriod {
  id?: string;
  startTime = '9:00';
  endTime = '18:00';

  constructor(timePeriod?: ITimePeriod) {
    if (!timePeriod) {
      return;
    }
    this.id = timePeriod.id;
    this.startTime = timePeriod.startTime;
    this.endTime = timePeriod.endTime;
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

  getPeriod(): string {
    return `${this.getTime(this.startTime)}-${this.getTime(this.endTime)}`;
  }
}
