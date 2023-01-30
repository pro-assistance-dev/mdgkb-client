import Employee from '@/classes/Employee';
import IRegalia from '@/interfaces/IRegalia';

export default class Regalia implements IRegalia {
  id?: string;
  name = '';
  employeeId?: string;
  employee?: Employee;
  constructor(i?: IRegalia) {
    if (!i) {
      return;
    }
    this.id = i.id;
    this.name = i.name;
    this.employeeId = i.employeeId;
  }
}
