import IVisit from '@/interfaces/IVisit';

import VisitsApplication from './VisitsApplication';

export default class Visit implements IVisit {
  id?: string;
  date?: Date;
  entered = false;
  exited = false;

  visitsApplication = new VisitsApplication();
  visitsApplicationId?: string;

  constructor(i?: IVisit) {
    if (!i) {
      return;
    }
    this.id = i.id;
    this.date = i.date;
    if (i.entered !== undefined) {
      this.entered = i.entered;
    }
    if (i.exited !== undefined) {
      this.exited = i.exited;
    }
    this.visitsApplicationId = i.visitsApplicationId;
    if (i.visitsApplication) {
      this.visitsApplication = new VisitsApplication(i.visitsApplication);
    }
  }
}
