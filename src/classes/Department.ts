import Division from '@/classes/Division';
import IDepartment from '@/interfaces/IDepartment';
import IDivision from '@/interfaces/IDivision';

export default class Department implements IDepartment {
  id?: string;
  name = '';
  doctorId?: string;
  headId?: string;
  isDivision = false;
  division?: IDivision;
  divisionId?: string;
  constructor(i?: IDepartment) {
    if (!i) {
      return;
    }
    this.id = i.id;
    this.name = i.name;
    this.headId = i.headId;
    if (i.division) {
      this.division = new Division(i.division);
    }
    this.divisionId = i.divisionId;
    this.isDivision = i.isDivision;
  }
}
