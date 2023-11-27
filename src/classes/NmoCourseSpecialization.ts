import NmoCourse from '@/classes/NmoCourse';
import Specialization from '@/classes/Specialization';
import ClassHelper from '@/services/ClassHelper';

export default class NmoCourseSpecialization {
  id?: string;
  nmoCourse: NmoCourse = new NmoCourse();
  dpoCourseId?: string;
  @ClassHelper.GetClassConstructor(Specialization)
  specialization: Specialization = new Specialization();
  specializationId?: string;

  constructor(i?: NmoCourseSpecialization) {
    ClassHelper.BuildClass(this, i);
  }
}
