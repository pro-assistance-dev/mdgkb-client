import ApplicationCar from '@/classes/ApplicationCar';
import Form from '@/classes/Form';
import IApplicationCar from '@/interfaces/IApplicationCar';
import IForm from '@/interfaces/IForm';
import IGate from '@/interfaces/IGate';

export default class Gate implements IGate {
  id?: string;
  name = '';
  applicationsCars: IApplicationCar[] = [];

  formPattern: IForm = new Form();
  formPatternId?: string;

  constructor(i?: IGate) {
    if (!i) {
      return;
    }
    this.id = i.id;
    this.name = i.name;
    this.formPatternId = i.formPatternId;
    if (i.applicationsCars) {
      this.applicationsCars = i.applicationsCars.map((i: IApplicationCar) => new ApplicationCar(i));
    }
    if (i.formPattern) {
      this.formPattern = new Form(i.formPattern);
    }
  }
}
