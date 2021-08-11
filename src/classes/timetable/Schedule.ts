import TimetableDay from '@/classes/timetable/TimetableDay';
import ITimetable from '@/interfaces/timetables/ITimetable';
import ITimetableDay from '@/interfaces/timetables/ITimetableDay';
import IWeekday from '@/interfaces/timetables/IWeekday';
import ISchedule from '@/interfaces/timetables/ISchedule';
import IScheduleItem from '@/interfaces/timetables/IScheduleItem';
import ScheduleItem from '@/classes/timetable/ScheduleItems';

export default class Schedule implements ISchedule {
  id?: string;
  name: string = '';
  scheduleItems: IScheduleItem[] = [];
  scheduleItemsForDelete: string[] = [];

  constructor(i?: ISchedule) {
    if (!i) return;
    this.id = i.id;
    this.name = i.name;
    if (i.scheduleItems) this.scheduleItems = i.scheduleItems.map((item: IScheduleItem) => new ScheduleItem(item));
  }

  static CreateStandartSchedule(): ISchedule {
    const item = new Schedule();
    item.name = 'Распорядок дня в отделении';
    item.scheduleItems = ScheduleItem.CreateStandartScheduleDay();
    return item;
  }
}
