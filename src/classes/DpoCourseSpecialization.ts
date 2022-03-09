import DpoCourse from '@/classes/DpoCourse';
import Specialization from '@/classes/Specialization';
import IDpoCourse from '@/interfaces/IDpoCourse';
import IDpoCourseSpecialization from '@/interfaces/IDpoCourseSpecialization';
import ISpecialization from '@/interfaces/ISpecialization';

export default class DpoCourseSpecialization implements IDpoCourseSpecialization {
  id?: string;
  dpoCourse: IDpoCourse = new DpoCourse();
  dpoCourseId?: string;
  specialization: ISpecialization = new Specialization();
  specializationId?: string;

  constructor(i?: IDpoCourseSpecialization) {
    if (!i) {
      return;
    }
    this.id = i.id;
    if (i.specialization) {
      this.specialization = new Specialization(i.specialization);
    }
    this.specializationId = i.specializationId;
    if (i.dpoCourse) {
      this.dpoCourse = new DpoCourse(i.dpoCourse);
    }
    this.dpoCourseId = i.dpoCourseId;
  }
}
