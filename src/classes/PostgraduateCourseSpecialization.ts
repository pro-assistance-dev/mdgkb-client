import PostgraduateCourse from '@/classes/PostgraduateCourse';
import Specialization from '@/classes/Specialization';
import ISpecialization from '@/interfaces/ISpecialization';

export default class PostgraduateCourseSpecialization {
  id?: string;
  postgraduateCourse: PostgraduateCourse = new PostgraduateCourse();
  postgraduateCourseId?: string;
  main = false;
  specialization: ISpecialization = new Specialization();
  specializationId?: string;

  constructor(i?: PostgraduateCourseSpecialization) {
    if (!i) {
      return;
    }
    this.id = i.id;
    this.main = i.main;
    if (i.specialization) {
      this.specialization = new Specialization(i.specialization);
    }
    this.specializationId = i.specializationId;
    if (i.postgraduateCourse) {
      this.postgraduateCourse = new PostgraduateCourse(i.postgraduateCourse);
    }
    this.postgraduateCourseId = i.postgraduateCourseId;
  }

  static GetClassName(): string {
    return 'postgraduateCourseSpecialization';
  }
}
