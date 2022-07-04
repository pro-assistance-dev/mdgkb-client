import IVisit from '@/interfaces/IVisit';

import ApplicationCar from './ApplicationCar';

export default class Visit implements IVisit {
  id?: string;
  date?: Date;
  entered = false;
  exited = false;

  applicationCar = new ApplicationCar();
  applicationCarId?: string;

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
    this.applicationCarId = i.applicationCarId;
    if (i.applicationCar) {
      this.applicationCar = new ApplicationCar(i.applicationCar);
    }
  }
}
