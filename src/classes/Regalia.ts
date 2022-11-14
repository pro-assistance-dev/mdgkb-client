import IRegalia from '@/interfaces/IRegalia';

export default class Regalia implements IRegalia {
  id?: string;
  name = '';
  employeeId?: string;

  constructor(i?: IRegalia) {
    if (!i) {
      return;
    }
    this.id = i.id;
    this.name = i.name;
    this.employeeId = i.employeeId;
  }
}
