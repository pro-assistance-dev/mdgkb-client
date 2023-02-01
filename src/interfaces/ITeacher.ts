import Employee from '@/classes/Employee';
import IDpoCourse from '@/interfaces/IDpoCourse';

export default interface ITeacher {
  id?: string;
  employeeId?: string;
  employee: Employee;
  position: string;
  dpoCourses: IDpoCourse[];

  setEmployee: (employee: Employee) => void;
  resetEmployee: () => void;
}
