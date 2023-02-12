import DpoCourse from '@/classes/DpoCourse';
import Employee from '@/classes/Employee';
import ClassHelper from '@/services/ClassHelper';

export default class Teacher {
  id?: string;
  employeeId?: string;
  employee: Employee = new Employee();
  position = '';
  @ClassHelper.GetClassConstructorForArray(DpoCourse)
  dpoCourses: DpoCourse[] = [];

  fullName?: string;
  isMale?: string;

  constructor(i?: Teacher) {
    ClassHelper.BuildClass(this, i);
  }

  setEmployee(employee: Employee): void {
    this.employee = new Employee(employee);
    this.employeeId = employee.id;
  }

  resetEmployee(): void {
    this.employee = new Employee();
    this.employeeId = undefined;
  }
}
