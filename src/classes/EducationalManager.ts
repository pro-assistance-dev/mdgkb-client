import Doctor from '@/classes/Doctor';
import IDoctor from '@/interfaces/IDoctor';
import ClassHelper from '@/services/ClassHelper';

export default class EducationalManager {
  id?: string;
  doctorId?: string;
  doctor: IDoctor = new Doctor();
  role = '';
  managerOrder = 0;

  constructor(i?: EducationalManager) {
    ClassHelper.BuildClass(this, i);
  }
}
