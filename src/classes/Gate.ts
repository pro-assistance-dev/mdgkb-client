import Form from '@/classes/Form';
import VisitsApplication from '@/classes/VisitsApplication';
import ClassHelper from '@/services/ClassHelper';

export default class Gate {
  id?: string;
  name = '';
  @ClassHelper.GetClassConstructor(VisitsApplication)
  visitsApplications: VisitsApplication[] = [];
  num = 0;
  formPattern: Form = new Form();
  formPatternId?: string;

  constructor(i?: Gate) {
    ClassHelper.BuildClass(this, i);
  }

  getBuildingNumber(): string {
    return 'main-enter';
  }

  getEntranceNumber(): string {
    return String(this.num);
  }
}
