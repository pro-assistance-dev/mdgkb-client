import ResidencyCourse from '@/classes/ResidencyCourse';
import Specialization from '@/classes/Specialization';
import IResidencyCourse from '@/interfaces/IResidencyCourse';
import IResidencyCourseSpecialization from '@/interfaces/IResidencyCourseSpecialization';
import ISpecialization from '@/interfaces/ISpecialization';

export default class ResidencyCourseSpecialization implements IResidencyCourseSpecialization {
  id?: string;
  residencyCourse: IResidencyCourse = new ResidencyCourse();
  residencyCourseId?: string;
  specialization: ISpecialization = new Specialization();
  specializationId?: string;
  main = false;
  constructor(i?: IResidencyCourseSpecialization) {
    if (!i) {
      return;
    }
    this.id = i.id;
    this.main = i.main;
    if (i.specialization) {
      this.specialization = new Specialization(i.specialization);
    }
    this.specializationId = i.specializationId;
    if (i.residencyCourse) {
      this.residencyCourse = new ResidencyCourse(i.residencyCourse);
    }
    this.residencyCourseId = i.residencyCourseId;
  }
}
