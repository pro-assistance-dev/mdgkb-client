import Timetable from '@/classes/Timetable';
import Weekday from '@/classes/Weekday';
import BaseStore from '@/services/BaseStore';

class S extends BaseStore<Timetable> {
  private readonly weekdays: Weekday[] = reactive([]);

  constructor() {
    super(Timetable, 'timetables');
  }
  Weekdays(): Weekday[] {
    return this.weekdays;
  }
  SetAllWeekdays(items: Weekday[]) {
    if (!items) {
      return;
    }
    Arrays.Refill(
      this.weekdays,
      items.map((i: Weekday) => new Weekday(i))
    );
  }
}

const store: S = new S();
export default store;
