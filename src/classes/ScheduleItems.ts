import Dish from '@/classes/Dish';
import TimetableDay from '@/classes/TimetableDay';
import ClassHelper from '@/services/ClassHelper';

export default class ScheduleItem {
  id?: string;
  name = '';
  startTime = '';
  endTime = '';
  dishes: Dish[] = [];
  constructor(i?: ScheduleItem) {
    ClassHelper.BuildClass(this, i);
  }

  static CreateStandartScheduleDay(): ScheduleItem[] {
    const items: ScheduleItem[] = [];
    for (let i = 9; i < 21; i++) {
      items.push(ScheduleItem.CreateStandartScheduleItem(i));
    }
    return items;
  }

  static CreateStandartScheduleItem(i: number): ScheduleItem {
    const item = new ScheduleItem();
    item.startTime = `${i}:00`;
    item.endTime = `${i + 1}:00`;
    return item;
  }

  isNow(): boolean {
    const now = new Date().getHours() + ':' + new Date().getMinutes();
    return now > this.getTime(this.startTime) && now < this.getTime(this.endTime);
  }

  getPeriodWithName(): string {
    let period = this.getPeriod();
    if (this.name) {
      period = `${period}: ${this.name}`;
    }
    if (this.isNow()) {
      const arrow = '⇽';
      period = `${period} ${arrow}`;
    }
    return period;
  }

  getPeriod(): string {
    const s = this.getTime(this.startTime);
    const e = this.getTime(this.endTime);
    if (!e) {
      return s;
    }
    if (!s) {
      return e;
    }
    if (!s && !e) {
      return '';
    }
    return `${s}-${e}`;
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
}
