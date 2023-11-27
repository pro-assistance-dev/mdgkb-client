import ClassHelper from '@/services/ClassHelper';

export default class Weekday {
  id?: string;
  name = '';
  shortName = '';
  number = 0;

  constructor(i?: Weekday) {
    ClassHelper.BuildClass(this, i);
  }

  isWeekend(): boolean {
    return this.number > 5;
  }

  isToday(): boolean {
    const nowDay = new Date().getDay();

    return this.number === nowDay;
  }
}
