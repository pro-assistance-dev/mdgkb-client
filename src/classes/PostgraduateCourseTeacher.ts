import PostgraduateCourse from '@/classes/PostgraduateCourse';
import Teacher from '@/classes/Teacher';
import ClassHelper from '@/services/ClassHelper';

export default class PostgraduateCourseTeacher {
  id?: string;
  main = false;
  postgraduateCourse: PostgraduateCourse = new PostgraduateCourse();
  postgraduateCourseId?: string;
  teacher: Teacher = new Teacher();
  teacherId?: string;

  constructor(i?: PostgraduateCourseTeacher) {
    ClassHelper.BuildClass(this, i);
  }
}
