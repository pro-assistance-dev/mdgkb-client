import Timetable from '@/classes/timetable/Timetable';
import IDietAge from '@/interfaces/IDietAge';
import ITimetable from '@/interfaces/timetables/ITimetable';

export default class DietAge implements IDietAge {
  id?: string;
  name = '';
  timetable: ITimetable = new Timetable();
  timetableId?: string;

  constructor(i?: IDietAge) {
    if (!i) {
      return;
    }
    this.id = i.id;
    this.name = i.name;
    if (i.timetable) {
      this.timetable = new Timetable(i.timetable);
    }
    this.timetableId = i.timetableId;
  }
}
