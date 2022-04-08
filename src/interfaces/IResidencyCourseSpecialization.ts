import IResidencyCourse from '@/interfaces/IResidencyCourse';
import ISpecialization from '@/interfaces/ISpecialization';

export default interface IResidencyCourseSpecialization {
  id?: string;
  main: boolean;
  specialization: ISpecialization;
  specializationId?: string;
  residencyCourse: IResidencyCourse;
  residencyCourseId?: string;
}
