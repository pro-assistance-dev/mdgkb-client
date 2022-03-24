import PostgraduateCourse from '@/classes/PostgraduateCourse';
import Teacher from '@/classes/Teacher';
import IPostgraduateCourse from '@/interfaces/IPostgraduateCourse';
import IPostgraduateCourseTeacher from '@/interfaces/IPostgraduateCourseTeacher';
import ITeacher from '@/interfaces/ITeacher';

export default class PostgraduateCourseTeacher implements IPostgraduateCourseTeacher {
  id?: string;
  main = false;
  postgraduateCourse: IPostgraduateCourse = new PostgraduateCourse();
  postgraduateCourseId?: string;
  teacher: ITeacher = new Teacher();
  teacherId?: string;

  constructor(i?: IPostgraduateCourseTeacher) {
    if (!i) {
      return;
    }
    this.id = i.id;
    this.main = i.main;
    if (i.teacher) {
      this.teacher = new Teacher(i.teacher);
    }
    this.teacherId = i.teacherId;
    if (i.postgraduateCourse) {
      this.postgraduateCourse = new PostgraduateCourse(i.postgraduateCourse);
    }
    this.postgraduateCourseId = i.postgraduateCourseId;
  }
}
