import IDepartment from '@/interfaces/IDepartment';

export default class Department implements IDepartment {
  id?: string;
  name = '';
  doctorId?: string;
  headId?: string;

  constructor(i?: IDepartment) {
    if (!i) {
      return;
    }
    this.id = i.id;
    this.name = i.name;
    this.headId = i.headId;
  }
}
