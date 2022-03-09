import DpoCourse from '@/classes/DpoCourse';
import Teacher from '@/classes/Teacher';
import IDpoCourse from '@/interfaces/IDpoCourse';
import IDpoCourseTeacher from '@/interfaces/IDpoCourseTeacher';
import ITeacher from '@/interfaces/ITeacher';

export default class DpoCourseTeacher implements IDpoCourseTeacher {
  id?: string;
  main = false;
  dpoCourse: IDpoCourse = new DpoCourse();
  dpoCourseId?: string;
  teacher: ITeacher = new Teacher();
  teacherId?: string;

  constructor(i?: IDpoCourseTeacher) {
    if (!i) {
      return;
    }
    this.id = i.id;
    this.main = i.main;
    if (i.teacher) {
      this.teacher = new Teacher(i.teacher);
    }
    this.teacherId = i.teacherId;
    if (i.dpoCourse) {
      this.dpoCourse = new DpoCourse(i.dpoCourse);
    }
    this.dpoCourseId = i.dpoCourseId;
  }
}
