import Teacher from '@/classes/Teacher';
import ITeacher from '@/interfaces/educationalOrganization/ITeacher';
import IDpoBaseCourse from '@/interfaces/IDpoBaseCourse';

export default class DpoBaseCourse implements IDpoBaseCourse {
  id?: string;
  name = '';
  description = '';
  hours = 0;
  listeners = 0;
  order = 0;
  cost = 0;
  start = new Date();
  teacher: ITeacher = new Teacher();
  teacherId?: string;

  constructor(i?: IDpoBaseCourse) {
    if (!i) {
      return;
    }
    this.id = i.id;
    this.name = i.name;
    this.description = i.description;
    this.hours = i.hours;
    this.listeners = i.listeners;
    this.order = i.order;
    this.cost = i.cost;
    this.start = i.start;
    if (i.teacher) {
      this.teacher = new Teacher(i.teacher);
    }
    this.teacherId = i.teacherId;
  }
}
