import DpoCourse from '@/classes/DpoCourse';
import Teacher from '@/classes/Teacher';
import ClassHelper from '@/services/ClassHelper';

export default class DpoCourseTeacher {
  id?: string;
  main = false;
  dpoCourse: DpoCourse = new DpoCourse();
  dpoCourseId?: string;
  teacher: Teacher = new Teacher();
  teacherId?: string;

  constructor(i?: DpoCourseTeacher) {
    ClassHelper.BuildClass(this, i);
  }
}
