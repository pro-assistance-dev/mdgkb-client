import Teacher from '@/classes/Teacher';
import IDpoCourse from '@/interfaces/IDpoCourse';
import ITeacher from '@/interfaces/ITeacher';

export default class DpoCourse implements IDpoCourse {
  id?: string;
  name = '';
  description = '';
  hours = 0;
  listeners = 0;
  order = 0;
  start = new Date();
  teacher: ITeacher = new Teacher();
  teacherId?: string;

  constructor(i?: IDpoCourse) {
    if (!i) {
      return;
    }
    this.id = i.id;
    this.name = i.name;
    this.description = i.description;
    this.hours = i.hours;
    this.listeners = i.listeners;
    this.order = i.order;
    this.start = i.start;
    if (i.teacher) {
      this.teacher = new Teacher(i.teacher);
    }
    this.teacherId = i.teacherId;
  }
}
