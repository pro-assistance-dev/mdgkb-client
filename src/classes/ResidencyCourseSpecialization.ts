import ResidencyCourse from '@/classes/ResidencyCourse';
import Specialization from '@/classes/Specialization';
import ClassHelper from '@/services/ClassHelper';

export default class ResidencyCourseSpecialization {
  id?: string;
  residencyCourse: ResidencyCourse = new ResidencyCourse();
  residencyCourseId?: string;
  specialization: Specialization = new Specialization();
  specializationId?: string;
  main = false;
  constructor(i?: ResidencyCourseSpecialization) {
    ClassHelper.BuildClass(this, i);
  }
}
