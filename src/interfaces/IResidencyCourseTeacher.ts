import IResidencyCourse from '@/interfaces/IResidencyCourse';
import ITeacher from '@/interfaces/ITeacher';

export default interface IResidencyCourseTeacher {
  id?: string;
  main: boolean;
  teacher: ITeacher;
  teacherId?: string;
  residencyCourse: IResidencyCourse;
  residencyCourseId?: string;
}
