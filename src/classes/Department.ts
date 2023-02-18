import Division from '@/classes/Division';
import ClassHelper from '@/services/ClassHelper';

export default class Department {
  id?: string;
  name = '';
  doctorId?: string;
  headId?: string;
  isDivision = false;
  division?: Division = new Division();
  divisionId?: string;
  constructor(i?: Department) {
    ClassHelper.BuildClass(this, i);
  }
}
