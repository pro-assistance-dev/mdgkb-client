import ScheduleItem from '@/classes/ScheduleItems';
import ClassHelper from '@/services/ClassHelper';

export default class Dish {
  id?: string;
  name = '';
  weight = '';
  @ClassHelper.GetClassConstructor(ScheduleItem)
  scheduleItem = new ScheduleItem();
  scheduleItemId?: string;

  constructor(i?: Dish) {
    ClassHelper.BuildClass(this, i);
  }
}
