import ScheduleItem from '@/classes/timetable/ScheduleItems';
import IDish from '@/interfaces/IDish';

export default class Dish implements IDish {
  id?: string;
  name = '';
  weight = '';
  scheduleItem = new ScheduleItem();
  scheduleItemId?: string;

  constructor(i?: IDish) {
    if (!i) {
      return;
    }
    this.id = i.id;
    this.name = i.name;
    this.weight = i.weight;
    if (i.scheduleItem) {
      this.scheduleItem = new ScheduleItem();
    }
    this.scheduleItemId = i.scheduleItemId;
  }
}
