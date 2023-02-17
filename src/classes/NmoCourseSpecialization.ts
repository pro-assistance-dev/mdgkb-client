import NmoCourse from '@/classes/NmoCourse';
import Specialization from '@/classes/Specialization';
import ISpecialization from '@/interfaces/ISpecialization';
import ClassHelper from '@/services/ClassHelper';

export default class NmoCourseSpecialization {
  id?: string;
  nmoCourse: NmoCourse = new NmoCourse();
  dpoCourseId?: string;
  specialization: ISpecialization = new Specialization();
  specializationId?: string;

  constructor(i?: NmoCourseSpecialization) {
    ClassHelper.BuildClass(this, i);
  }
}
