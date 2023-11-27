import ScheduleItem from '@/classes/ScheduleItems';
import ClassHelper from '@/services/ClassHelper';

export default class Schedule {
  id?: string;
  name = '';
  @ClassHelper.GetClassConstructor(ScheduleItem)
  scheduleItems: ScheduleItem[] = [];
  scheduleItemsForDelete: string[] = [];

  constructor(i?: Schedule) {
    ClassHelper.BuildClass(this, i);
  }

  static CreateStandartSchedule(): Schedule {
    const item = new Schedule();
    item.name = 'Распорядок дня в отделении';
    item.scheduleItems = ScheduleItem.CreateStandartScheduleDay();
    return item;
  }
}
