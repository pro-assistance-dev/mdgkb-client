import DpoCourse from '@/classes/DpoCourse';
import Employee from '@/classes/Employee';
import IDpoCourse from '@/interfaces/IDpoCourse';
import ITeacher from '@/interfaces/ITeacher';

export default class Teacher implements ITeacher {
  id?: string;
  employeeId?: string;
  employee: Employee = new Employee();
  position = '';
  dpoCourses: IDpoCourse[] = [];

  constructor(i?: ITeacher) {
    if (!i) {
      return;
    }
    this.id = i.id;
    this.employeeId = i.employeeId;
    this.position = i.position;
    if (i.employee) {
      this.employee = new Employee(i.employee);
    }
    if (i.dpoCourses) {
      this.dpoCourses = i.dpoCourses.map((item: IDpoCourse) => new DpoCourse(item));
    }
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
