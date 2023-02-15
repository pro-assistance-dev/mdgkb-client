import Employee from '@/classes/Employee';
import ClassHelper from '@/services/ClassHelper';

export default class EducationalAcademic {
  id?: string;
  employeeId?: string;
  employee: Employee = new Employee();
  order = 0;
  fullName?: string;
  constructor(i?: EducationalAcademic) {
    ClassHelper.BuildClass(this, i);
  }
}
