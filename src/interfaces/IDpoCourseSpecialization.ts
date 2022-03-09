import IDpoCourse from '@/interfaces/IDpoCourse';
import ISpecialization from '@/interfaces/ISpecialization';

export default interface IDpoCourseSpecialization {
  id?: string;
  specialization: ISpecialization;
  specializationId?: string;
  dpoCourse: IDpoCourse;
  dpoCourseId?: string;
}
