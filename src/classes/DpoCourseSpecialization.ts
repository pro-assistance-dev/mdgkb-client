import DpoCourse from '@/classes/DpoCourse';
import Specialization from '@/classes/Specialization';
import ISpecialization from '@/interfaces/ISpecialization';
import ClassHelper from '@/services/ClassHelper';

export default class DpoCourseSpecialization {
  id?: string;
  dpoCourse: DpoCourse = new DpoCourse();
  dpoCourseId?: string;
  specialization: ISpecialization = new Specialization();
  specializationId?: string;

  constructor(i?: DpoCourseSpecialization) {
    ClassHelper.BuildClass(this, i);
  }
}
