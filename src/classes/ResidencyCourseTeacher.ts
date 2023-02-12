import ResidencyCourse from '@/classes/ResidencyCourse';
import Teacher from '@/classes/Teacher';

export default class ResidencyCourseTeacher {
  id?: string;
  main = false;
  residencyCourse: ResidencyCourse = new ResidencyCourse();
  residencyCourseId?: string;
  teacher: Teacher = new Teacher();
  teacherId?: string;

  constructor(i?: ResidencyCourseTeacher) {
    if (!i) {
      return;
    }
    this.id = i.id;
    this.main = i.main;
    if (i.teacher) {
      this.teacher = new Teacher(i.teacher);
    }
    this.teacherId = i.teacherId;
    if (i.residencyCourse) {
      this.residencyCourse = new ResidencyCourse(i.residencyCourse);
    }
    this.residencyCourseId = i.residencyCourseId;
  }
}
