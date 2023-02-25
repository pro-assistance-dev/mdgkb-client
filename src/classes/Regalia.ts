import Employee from '@/classes/Employee';
import ClassHelper from '@/services/ClassHelper';

export default class Regalia {
  id?: string;
  name = '';
  employeeId?: string;
  employee?: Employee;
  constructor(i?: Regalia) {
    ClassHelper.BuildClass(this, i);
  }
}
