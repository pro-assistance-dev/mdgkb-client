import PostgraduateCourse from '@/classes/PostgraduateCourse';
import Specialization from '@/classes/Specialization';
import ClassHelper from '@/services/ClassHelper';

export default class PostgraduateCourseSpecialization {
  id?: string;
  postgraduateCourse: PostgraduateCourse = new PostgraduateCourse();
  postgraduateCourseId?: string;
  main = false;
  @ClassHelper.GetClassConstructor(Specialization)
  specialization: Specialization = new Specialization();
  specializationId?: string;

  constructor(i?: PostgraduateCourseSpecialization) {
    ClassHelper.BuildClass(this, i);
  }

  static GetClassName(): string {
    return 'postgraduateCourseSpecialization';
  }
}
