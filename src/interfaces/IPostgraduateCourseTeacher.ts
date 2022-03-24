import IPostgraduateCourse from '@/interfaces/IPostgraduateCourse';
import ITeacher from '@/interfaces/ITeacher';

export default interface IPostgraduateCourseTeacher {
  id?: string;
  main: boolean;
  teacher: ITeacher;
  teacherId?: string;
  postgraduateCourse: IPostgraduateCourse;
  postgraduateCourseId?: string;
}
