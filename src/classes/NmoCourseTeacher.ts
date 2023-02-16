import NmoCourse from '@/classes/NmoCourse';
import Teacher from '@/classes/Teacher';
import ClassHelper from '@/services/ClassHelper';

export default class NmoCourseTeacher {
  id?: string;
  main = false;
  nmoCourse: NmoCourse = new NmoCourse();
  dpoCourseId?: string;
  teacher: Teacher = new Teacher();
  teacherId?: string;

  constructor(i?: NmoCourseTeacher) {
    ClassHelper.BuildClass(this, i);
  }
}
