import Employee from '@/classes/Employee';
import NmoCourse from '@/classes/NmoCourse';
import ClassHelper from '@/services/ClassHelper';

export default class Teacher {
  id?: string;
  employeeId?: string;
  employee: Employee = new Employee();
  position = '';
  @ClassHelper.GetClassConstructor(NmoCourse)
  dpoCourses: NmoCourse[] = [];

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

  static GetClassName(): string {
    return 'teacher';
  }
}
