import VisitsApplication from '@/classes/VisitsApplication';
import ClassHelper from '@/services/ClassHelper';

export default class Visit {
  id?: string;
  date?: Date;
  entered = false;
  exited = false;

  visitsApplication = new VisitsApplication();
  visitsApplicationId?: string;

  constructor(i?: Visit) {
    ClassHelper.BuildClass(this, i);
  }
}
