import Form from '@/classes/Form';
import IGate from '@/interfaces/IGate';

import VisitsApplication from './VisitsApplication';

export default class Gate implements IGate {
  id?: string;
  name = '';
  visitsApplications: VisitsApplication[] = [];
  num = 0;
  formPattern: Form = new Form();
  formPatternId?: string;

  constructor(i?: Gate) {
    if (!i) {
      return;
    }
    this.id = i.id;
    this.name = i.name;
    this.num = i.num;
    this.formPatternId = i.formPatternId;
    if (i.visitsApplications) {
      this.visitsApplications = i.visitsApplications.map((i: VisitsApplication) => new VisitsApplication(i));
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
