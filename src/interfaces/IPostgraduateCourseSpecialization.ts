import IPostgraduateCourse from '@/interfaces/IPostgraduateCourse';
import ISpecialization from '@/interfaces/ISpecialization';

export default interface IPostgraduateCourseSpecialization {
  id?: string;
  specialization: ISpecialization;
  specializationId?: string;
  postgraduateCourse: IPostgraduateCourse;
  postgraduateCourseId?: string;
}
