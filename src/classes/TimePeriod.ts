import ClassHelper from '@/services/ClassHelper';

import TimetableDay from './TimetableDay';

export default class TimePeriod {
  id?: string;
  startTime = '9:00';
  endTime = '18:00';

  constructor(i?: TimePeriod) {
    ClassHelper.BuildClass(this, i);
  }

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

  getPeriod(): string {
    return `${this.getTime(this.startTime)}-${this.getTime(this.endTime)}`;
  }
}
