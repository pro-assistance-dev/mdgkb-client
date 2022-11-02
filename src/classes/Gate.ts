import Form from '@/classes/Form';
import IForm from '@/interfaces/IForm';
import IGate from '@/interfaces/IGate';
import IVisitsApplication from '@/interfaces/IVisitsApplication';

import VisitsApplication from './VisitsApplication';

export default class Gate implements IGate {
  id?: string;
  name = '';
  visitsApplications: IVisitsApplication[] = [];
  num = 0;
  formPattern: IForm = new Form();
  formPatternId?: string;

  constructor(i?: IGate) {
    if (!i) {
      return;
    }
    this.id = i.id;
    this.name = i.name;
    this.num = i.num;
    this.formPatternId = i.formPatternId;
    if (i.visitsApplications) {
      this.visitsApplications = i.visitsApplications.map((i: IVisitsApplication) => new VisitsApplication(i));
    }
    if (i.formPattern) {
      this.formPattern = new Form(i.formPattern);
    }
  }

  getBuildingNumber(): string {
    return 'main-enter';
  }

  getEntranceNumber(): string {
    return String(this.num);
  }
}
