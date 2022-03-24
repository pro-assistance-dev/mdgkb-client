import PostgraduateCourse from '@/classes/PostgraduateCourse';
import Specialization from '@/classes/Specialization';
import IPostgraduateCourse from '@/interfaces/IPostgraduateCourse';
import IPostgraduateCourseSpecialization from '@/interfaces/IPostgraduateCourseSpecialization';
import ISpecialization from '@/interfaces/ISpecialization';

export default class PostgraduateCourseSpecialization implements IPostgraduateCourseSpecialization {
  id?: string;
  postgraduateCourse: IPostgraduateCourse = new PostgraduateCourse();
  postgraduateCourseId?: string;
  specialization: ISpecialization = new Specialization();
  specializationId?: string;

  constructor(i?: IPostgraduateCourseSpecialization) {
    if (!i) {
      return;
    }
    this.id = i.id;
    if (i.specialization) {
      this.specialization = new Specialization(i.specialization);
    }
    this.specializationId = i.specializationId;
    if (i.postgraduateCourse) {
      this.postgraduateCourse = new PostgraduateCourse(i.postgraduateCourse);
    }
    this.postgraduateCourseId = i.postgraduateCourseId;
  }
}
