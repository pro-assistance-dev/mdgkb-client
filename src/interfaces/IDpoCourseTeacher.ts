import IDpoCourse from '@/interfaces/IDpoCourse';
import ITeacher from '@/interfaces/ITeacher';

export default interface IDpoCourseTeacher {
  id?: string;
  main: boolean;
  teacher: ITeacher;
  teacherId?: string;
  dpoCourse: IDpoCourse;
  dpoCourseId?: string;
}
