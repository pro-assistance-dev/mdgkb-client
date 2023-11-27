import Timetable from '@/classes/Timetable';
import ClassHelper from '@/services/ClassHelper';

export default class DietAge {
  id?: string;
  name = '';
  timetable: Timetable = new Timetable();
  timetableId?: string;

  constructor(i?: DietAge) {
    ClassHelper.BuildClass(this, i);
  }
}
