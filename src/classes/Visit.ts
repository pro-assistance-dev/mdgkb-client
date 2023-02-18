import IVisit from '@/interfaces/IVisit';
import ClassHelper from '@/services/ClassHelper';

import VisitsApplication from './VisitsApplication';

export default class Visit implements IVisit {
  id?: string;
  date?: Date;
  entered = false;
  exited = false;

  visitsApplication = new VisitsApplication();
  visitsApplicationId?: string;

  constructor(i?: IVisit) {
    ClassHelper.BuildClass(this, i);
  }
}
