import Doctor from '@/classes/Doctor';
import ClassHelper from '@/services/ClassHelper';

export default class EducationalManager {
  id?: string;
  doctorId?: string;
  doctor: Doctor = new Doctor();
  role = '';
  order = 0;

  constructor(i?: EducationalManager) {
    ClassHelper.BuildClass(this, i);
  }

  static GetClassName(): string {
    return 'educationalManager';
  }
}
