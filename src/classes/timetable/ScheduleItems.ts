import IScheduleItem from '@/interfaces/timetables/IScheduleItem';
import TimetableDay from '@/classes/timetable/TimetableDay';

export default class ScheduleItem implements IScheduleItem {
  id?: string;
  name: string = '';
  startTime: string = '';
  endTime: string = '';

  constructor(i?: IScheduleItem) {
    if (!i) return;
    this.id = i.id;
    this.name = i.name;
    this.startTime = i.startTime;
    this.endTime = i.endTime;
  }

  static CreateStandartScheduleDay(): IScheduleItem[] {
    const items: IScheduleItem[] = [];
    for (let i = 9; i < 21; i++) {
      items.push(ScheduleItem.CreateStandartScheduleItem(i));
    }
    return items;
  }

  static CreateStandartScheduleItem(i: number): IScheduleItem {
    const item = new ScheduleItem();
    item.startTime = `${i}:00`;
    item.endTime = `${i + 1}:00`;
    return item;
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
}
