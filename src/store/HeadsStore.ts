import Head from '@/classes/Head';
import Timetable from '@/classes/Timetable';
import BaseStore from '@/services/BaseStore';

class S extends BaseStore<Head> {
  constructor() {
    super(Head, 'heads');
  }
  MainDoctor(): Head {
    const main = this.items.find((head: Head) => head.isMain);
    if (main) {
      return main;
    }
    return new Head();
  }
  Timetable(): Timetable {
    return this.item.timetable;
  }
}

const store: S = new S();
export default store;
