import IDpoCourse from '@/interfaces/IDpoCourse';
import IEmployee from '@/interfaces/IEmployee';

export default interface ITeacher {
  id?: string;
  employeeId?: string;
  employee: IEmployee;
  position: string;
  dpoCourses: IDpoCourse[];

  setEmployee: (employee: IEmployee) => void;
  resetEmployee: () => void;
}
