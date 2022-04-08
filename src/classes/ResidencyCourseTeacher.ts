import ResidencyCourse from '@/classes/ResidencyCourse';
import Teacher from '@/classes/Teacher';
import IResidencyCourse from '@/interfaces/IResidencyCourse';
import IResidencyCourseTeacher from '@/interfaces/IResidencyCourseTeacher';
import ITeacher from '@/interfaces/ITeacher';

export default class ResidencyCourseTeacher implements IResidencyCourseTeacher {
  id?: string;
  main = false;
  residencyCourse: IResidencyCourse = new ResidencyCourse();
  residencyCourseId?: string;
  teacher: ITeacher = new Teacher();
  teacherId?: string;

  constructor(i?: IResidencyCourseTeacher) {
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
