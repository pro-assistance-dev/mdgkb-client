import Timetable from '@/classes/Timetable';
import BaseStore from '@/services/BaseStore';

class S extends BaseStore<Timetable> {
  constructor() {
    super(Timetable, 'timetable-patterns');
  }
}

const store: S = new S();
export default store;
