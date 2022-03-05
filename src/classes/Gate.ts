import ApplicationCar from '@/classes/ApplicationCar';
import IApplicationCar from '@/interfaces/IApplicationCar';
import IGate from '@/interfaces/IGate';

export default class Gate implements IGate {
  id?: string;
  name = '';
  applicationsCars: IApplicationCar[] = [];

  constructor(i?: IGate) {
    if (!i) {
      return;
    }
    this.id = i.id;
    this.name = i.name;
    if (i.applicationsCars) {
      this.applicationsCars = i.applicationsCars.map((i: IApplicationCar) => new ApplicationCar(i));
    }
  }
}
